import { CommandResult, ContentView } from '@/types/terminal'
import { PROJECTS } from '@/data/projects'

const AVAILABLE_COMMANDS = [
  'help      - Muestra la lista de comandos disponibles',
  'ls        - Lista los directorios y archivos principales',
  'cd <dir>  - Navega a una sección (about, portfolio, blog, contact)',
  'pwd       - Muestra el directorio actual',
  'whoami    - Muestra información del usuario (igual que about)',
  'clear     - Limpia el historial de la terminal',
  'cat <file> - Muestra el contenido de un archivo'
]

const DIRECTORIES = ['portfolio', 'blog', 'contact']
const FILES = ['resume.pdf']

interface DirectoryStructure {
  [key: string]: {
    files: string[]
    subdirs: string[]
    description?: string
  }
}

const FILE_SYSTEM: DirectoryStructure = {
  '~': {
    files: ['resume.pdf', 'README.md'],
    subdirs: ['portfolio', 'blog', 'contact'],
    description: 'Directorio principal'
  },
  '~/portfolio': {
    files: ['projects.json', 'README.md'],
    subdirs: [],
    description: 'Proyectos realizados'
  },
  '~/blog': {
    files: ['articles.json', 'README.md'],
    subdirs: [],
    description: 'Artículos y publicaciones'
  },
  '~/contact': {
    files: ['info.txt', 'contact.json'],
    subdirs: [],
    description: 'Información de contacto'
  }
}

const FILE_CONTENTS: { [key: string]: string[] } = {
  '~/README.md': [
    '# Portfolio Terminal',
    '',
    'Bienvenido a mi portfolio interactivo basado en terminal.',
    '',
    '## Navegación',
    '- Usa `ls` para ver archivos y directorios',
    '- Usa `cd <directorio>` para navegar',
    '- Usa `cat <archivo>` para ver contenidos',
    '- Usa `help` para ver todos los comandos',
    '',
    '## Secciones',
    '- **about**: Información personal y habilidades',
    '- **portfolio**: Proyectos realizados',
    '- **blog**: Artículos y publicaciones',
    '- **contact**: Información de contacto'
  ],
  '~/about/bio.txt': [
    'Desarrollador Full Stack apasionado por crear experiencias web innovadoras.',
    '',
    'Me especializo en tecnologías modernas como React, Next.js, TypeScript,',
    'y disfruto construyendo interfaces de usuario interactivas y accesibles.',
    '',
    'Siempre estoy aprendiendo nuevas tecnologías y mejorando mis habilidades',
    'para crear soluciones eficientes y escalables.'
  ],
  '~/about/skills.json': [
    '{',
    '  "frontend": [',
    '    "React",',
    '    "Next.js",',
    '    "TypeScript",',
    '    "SCSS",',
    '    "Tailwind CSS"',
    '  ],',
    '  "backend": [',
    '    "Node.js",',
    '    "Express",',
    '    "Python",',
    '    "Django"',
    '  ],',
    '  "tools": [',
    '    "Git",',
    '    "Docker",',
    '    "VS Code",',
    '    "Figma"',
    '  ]',
    '}'
  ],
  '~/about/README.md': [
    '# Sobre mí',
    '',
    'Desarrollador con pasión por la tecnología y la innovación.',
    '',
    '## Habilidades principales',
    '- Desarrollo Frontend con React y Next.js',
    '- Desarrollo Backend con Node.js',
    '- Diseño de interfaces de usuario',
    '- Arquitectura de aplicaciones web',
    '',
    'Usa `cat bio.txt` para leer mi biografía.',
    'Usa `cat skills.json` para ver mis habilidades técnicas.'
  ],
  '~/portfolio/projects.json': [
    '{',
    '  "projects": [',
    '    {',
    '      "name": "Portfolio Terminal",',
    '      "description": "Portfolio interactivo con interfaz de terminal",',
    '      "tech": ["Next.js", "TypeScript", "SCSS"]',
    '    },',
    '    {',
    '      "name": "E-commerce Platform",',
    '      "description": "Plataforma de comercio electrónico completa",',
    '      "tech": ["React", "Node.js", "MongoDB"]',
    '    },',
    '    {',
    '      "name": "Task Manager",',
    '      "description": "Aplicación de gestión de tareas",',
    '      "tech": ["React", "TypeScript", "Firebase"]',
    '    }',
    '  ]',
    '}'
  ],
  '~/portfolio/README.md': [
    '# Portfolio',
    '',
    'Aquí encontrarás una selección de mis proyectos más destacados.',
    '',
    '## Proyectos',
    '- Portfolio Terminal: Este mismo proyecto',
    '- E-commerce Platform: Plataforma de comercio electrónico',
    '- Task Manager: Aplicación de gestión de tareas',
    '',
    'Usa `cat projects.json` para ver los detalles de cada proyecto.'
  ],
  '~/blog/articles.json': [
    '{',
    '  "articles": [',
    '    {',
    '      "title": "Construyendo un portfolio con Next.js",',
    '      "date": "2024-03-15",',
    '      "summary": "Cómo crear un portfolio interactivo usando Next.js"',
    '    },',
    '    {',
    '      "title": "TypeScript en aplicaciones React",',
    '      "date": "2024-02-28",',
    '      "summary": "Ventajas de usar TypeScript en proyectos React"',
    '    },',
    '    {',
    '      "title": "CSS Modules vs Tailwind",',
    '      "date": "2024-01-20",',
    '      "summary": "Comparación entre CSS Modules y Tailwind CSS"',
    '    }',
    '  ]',
    '}'
  ],
  '~/blog/README.md': [
    '# Blog',
    '',
    'Artículos y publicaciones sobre desarrollo web y tecnología.',
    '',
    '## Últimas publicaciones',
    '- Construyendo un portfolio con Next.js',
    '- TypeScript en aplicaciones React',
    '- CSS Modules vs Tailwind',
    '',
    'Usa `cat articles.json` para ver todos los artículos.'
  ],
  '~/contact/info.txt': [
    'Información de Contacto',
    '=====================',
    '',
    'Email: tu.email@example.com',
    'LinkedIn: linkedin.com/in/tu-perfil',
    'GitHub: github.com/tu-usuario',
    'Twitter: @tu_usuario',
    '',
    'Disponible para proyectos freelance y oportunidades laborales.',
    '',
    'Usa `cat contact.json` para ver la información en formato JSON.'
  ],
  '~/contact/contact.json': [
    '{',
    '  "email": "tu.email@example.com",',
    '  "social": {',
    '    "linkedin": "linkedin.com/in/tu-perfil",',
    '    "github": "github.com/tu-usuario",',
    '    "twitter": "@tu_usuario"',
    '  },',
    '  "availability": "Disponible para proyectos freelance",',
    '  "location": "España"',
    '}'
  ]
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
          '  Ctrl+L      - Limpia la pantalla',
          '  Ctrl+C      - Cancela el comando actual',
          '  Tab         - Autocompleta comandos y rutas',
          '  ↑/↓         - Navega por el historial'
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

      // Check if directory exists
      if (FILE_SYSTEM[targetPath]) {
        const dirName = targetPath.replace('~/', '')
        const contentView = DIRECTORIES.includes(dirName) ? dirName as ContentView : undefined

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
  const promptUser = `<span style="color: var(--success);">ismaellopez@portfolio</span>`
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
