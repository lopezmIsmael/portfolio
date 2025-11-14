export interface DirectoryStructure {
  files: string[]
  subdirs: string[]
  description?: string
}

export const FILE_SYSTEM: Record<string, DirectoryStructure> = {
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
} as const

export const DIRECTORIES = ['portfolio', 'blog', 'contact'] as const
export const FILES = ['resume.pdf'] as const
