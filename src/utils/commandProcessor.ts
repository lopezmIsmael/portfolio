import { CommandResult, ContentView } from '@/types/terminal'
import { PROJECTS } from '@/data/projects'
import { AVAILABLE_COMMANDS, KEYBOARD_SHORTCUTS } from '@/constants/commands'
import { FILE_SYSTEM } from '@/constants/fileSystem'
import { FILE_CONTENTS } from '@/data/fileContents'
import { TERMINAL_CONFIG } from '@/data/generated/terminal'

function isValidContentView(view: string): view is ContentView {
  const validViews: ContentView[] = ['welcome', 'about', 'portfolio', 'blog', 'contact', 'resume']
  return validViews.includes(view as ContentView)
}

export function processCommand(command: string, currentPath: string = '~'): CommandResult {
  const trimmedCommand = command.trim()
  const [cmd, ...args] = trimmedCommand.split(' ')

  switch (cmd.toLowerCase()) {
    case 'help':
      return {
        output: [
          'Comandos disponibles:',
          '',
          ...AVAILABLE_COMMANDS,
          '',
          'Escribe un comando para comenzar.',
          '',
          'Atajos de teclado:',
          ...KEYBOARD_SHORTCUTS
        ]
      }

    case 'pwd':
      return {
        output: [currentPath]
      }

    case 'whoami':
      return {
        output: [
          '<br>',
          '<span style="color: var(--primary); font-weight: bold;">👤 Sobre Mí</span>',
          '--------------------------------------------------',
          'Soy un Ingeniero Informático apasionado por el desarrollo de software y la creación de soluciones innovadoras. Me especializo en desarrollo web full-stack y disfruto trabajando con tecnologías modernas.',
          '<br>',
          '<span style="color: var(--primary); font-weight: bold;">🛠️ Habilidades Técnicas</span>',
          '--------------------------------------------------',
          '- <span style="color: var(--secondary);">Frontend:</span> React / Next.js, TypeScript, SCSS',
          '- <span style="color: var(--secondary);">Backend:</span> Node.js, Python, APIs RESTful',
          '- <span style="color: var(--secondary);">Herramientas:</span> Git, Docker, Linux, VS Code',
          '<br>',
          '<span style="color: var(--primary); font-weight: bold;">📞 Contacto</span>',
          '--------------------------------------------------',
          '- <span style="color: var(--secondary);">Email:</span> example@example.com',
          '- <span style="color: var(--secondary);">LinkedIn:</span> linkedin.com/in/example',
          '- <span style="color: var(--secondary);">GitHub:</span> github.com/example',
          '<br>',
        ],
        contentView: 'about'
      }

    case 'ls':
      const currentDir = FILE_SYSTEM[currentPath]
      if (!currentDir) {
        return {
          output: [`ls: no se puede acceder a '${currentPath}': No existe el archivo o el directorio`],
          error: true
        }
      }

      const lsOutput: string[] = []

      // Special handling for ~/portfolio to show projects
      if (currentPath === '~/portfolio') {
        lsOutput.push('<br>')
        lsOutput.push('<span style="color: var(--primary); font-weight: bold;">📁 Proyectos Disponibles</span>')
        lsOutput.push('<span style="color: var(--secondary);">──────────────────────────────────</span>')

        PROJECTS.forEach(project => {
          const typeIcon = project.type === 'github' ? '🌐' : '🔒'
          const typeName = project.type === 'github' ? 'GitHub' : 'Privado'
          const techStack = project.tech.join(', ')

          lsOutput.push('<br>')
          lsOutput.push(`<span style="color: var(--primary); font-weight: bold;">${typeIcon} ${project.name}</span>`)
          lsOutput.push(`<span style="color: var(--foreground);">   ${project.description}</span>`)
          lsOutput.push(`<span style="color: var(--secondary);">   📚 Tech: ${techStack}</span>`)
          lsOutput.push(`<span style="color: var(--comment);">   💼 Tipo: ${typeName}</span>`)
        })

        lsOutput.push('<br>')
        lsOutput.push('<span style="color: var(--warning);">💡 Usa la interfaz gráfica para explorar los proyectos</span>')
        lsOutput.push('<br>')

        return {
          output: lsOutput
        }
      }

      // Add subdirectories with folder icon
      currentDir.subdirs.forEach(dir => {
        lsOutput.push(`<span class="folder"><i class="fa fa-folder"></i> ${dir}/</span>`)
      })

      // Add files with appropriate icon and color class
      currentDir.files.forEach(file => {
        let icon = 'fa-file-alt'
        let fileClass = 'file'

        if (file.endsWith('.pdf')) {
          icon = 'fa-file-pdf'
          fileClass = 'file-pdf'
        } else if (file.endsWith('.json')) {
          icon = 'fa-file-code'
          fileClass = 'file-json'
        } else if (file.endsWith('.txt')) {
          icon = 'fa-file-alt'
          fileClass = 'file-txt'
        } else if (file.endsWith('.md')) {
          icon = 'fa-file-markdown'
          fileClass = 'file-md'
        }

        lsOutput.push(`<span class="${fileClass}"><i class="fa ${icon}"></i> ${file}</span>`)
      })

      return {
        output: lsOutput.length > 0 ? lsOutput : ['']
      }

    case 'cd':
      if (args.length === 0) {
        return {
          output: [''],
          newPath: '~',
          contentView: 'welcome'
        }
      }

      const target = args[0].toLowerCase()

      if (target === '~' || target === '~/') {
        return {
          output: [''],
          newPath: '~',
          contentView: 'welcome'
        }
      }

      if (target === '..' || target === '../') {
        if (currentPath === '~') {
          return {
            output: [''],
            newPath: '~'
          }
        }
        return {
          output: [''],
          newPath: '~',
          contentView: 'welcome'
        }
      }

      if (target === '.') {
        return {
          output: [''],
          newPath: currentPath
        }
      }

      // Handle absolute paths like ~/about
      let targetPath = target
      if (target.startsWith('~/')) {
        targetPath = target
      } else if (currentPath === '~') {
        targetPath = `~/${target}`
      } else {
        targetPath = `${currentPath}/${target}`
      }

      // Check if target is a file
      const currentDirData = FILE_SYSTEM[currentPath]
      if (currentDirData && currentDirData.files.includes(target)) {
        return {
          output: [`cd: ${target}: No es un directorio`],
          error: true
        }
      }

      if (target === 'about') {
        return {
          output: [`cd: about: No es un directorio`],
          error: true
        }
      }

      if (FILE_SYSTEM[targetPath]) {
        const dirName = targetPath.replace('~/', '')
        const contentView: ContentView | undefined = isValidContentView(dirName) ? dirName : undefined

        return {
          output: [''],
          newPath: targetPath,
          contentView
        }
      }

      return {
        output: [`cd: ${target}: No existe el archivo o el directorio`],
        error: true
      }

    case 'clear':
      return {
        output: []
      }

    case 'cat':
      if (args.length === 0) {
        return {
          output: ['cat: falta el operando'],
          error: true
        }
      }

      const filename = args[0]

      // Check if file is binary (PDF)
      if (filename.endsWith('.pdf')) {
        return {
          output: [`cat: ${filename}: no se puede leer archivo binario`],
          error: true
        }
      }

      // Check if file exists in current directory
      const currentDirForCat = FILE_SYSTEM[currentPath]
      if (!currentDirForCat || !currentDirForCat.files.includes(filename)) {
        return {
          output: [`cat: ${filename}: No existe el archivo o el directorio`],
          error: true
        }
      }

      // Build the full file path
      const filePath = `${currentPath}/${filename}`

      // Get file contents
      const contents = FILE_CONTENTS[filePath]
      if (!contents) {
        return {
          output: [`cat: ${filename}: el archivo está vacío o no tiene contenido disponible`],
          error: false
        }
      }

      return {
        output: contents
      }

    case '':
      return {
        output: ['']
      }

    default:
      return {
        output: [`bash: ${cmd}: comando no encontrado`],
        error: true
      }
  }
}

export function getPrompt(currentPath: string = '~'): string {
  const promptUser = `<span style="color: var(--success);">${TERMINAL_CONFIG.terminal.user}@${TERMINAL_CONFIG.terminal.host}</span>`
  const promptPath = `<span style="color: var(--primary);">${currentPath}</span>`
  return `${promptUser}:${promptPath}$`
}

export function getAvailableCommands(): string[] {
  return ['help', 'ls', 'cd', 'pwd', 'whoami', 'clear', 'cat']
}

export function getAutocompleteSuggestions(input: string, currentPath: string): string[] {
  const trimmedInput = input.trim()
  const parts = trimmedInput.split(' ')

  // If no input or just whitespace, return all commands
  if (trimmedInput === '') {
    return getAvailableCommands()
  }

  // If it's a single word, try to autocomplete commands
  if (parts.length === 1) {
    const commands = getAvailableCommands()
    const matches = commands.filter(cmd => cmd.startsWith(parts[0].toLowerCase()))
    return matches
  }

  // If it's a cd command, autocomplete directories
  if (parts[0].toLowerCase() === 'cd' && parts.length === 2) {
    const currentDir = FILE_SYSTEM[currentPath]
    if (currentDir) {
      const prefix = parts[1].toLowerCase()
      const matches = currentDir.subdirs.filter(dir => dir.toLowerCase().startsWith(prefix))

      // Also suggest .. and ~
      const specialDirs = ['..', '~'].filter(dir => dir.startsWith(prefix))

      return [...specialDirs, ...matches]
    }
  }

  // If it's a cat command, autocomplete files
  if (parts[0].toLowerCase() === 'cat' && parts.length === 2) {
    const currentDir = FILE_SYSTEM[currentPath]
    if (currentDir) {
      const prefix = parts[1].toLowerCase()
      const matches = currentDir.files.filter(file => file.toLowerCase().startsWith(prefix))
      return matches
    }
  }

  return []
}

export function completeInput(input: string, currentPath: string): string {
  const suggestions = getAutocompleteSuggestions(input, currentPath)

  if (suggestions.length === 0) {
    return input
  }

  if (suggestions.length === 1) {
    const trimmedInput = input.trim()
    const parts = trimmedInput.split(' ')

    if (parts.length === 1) {
      return suggestions[0] + ' '
    } else {
      parts[parts.length - 1] = suggestions[0]
      return parts.join(' ') + ' '
    }
  }

  // If multiple matches, return the input unchanged
  // (we'll show the suggestions to the user)
  return input
}
