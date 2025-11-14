import { PROJECTS_CONFIG } from './generated/projects'

export interface ProjectConfig {
  id: string
  name: string
  description: string
  tech: string[]
  type: 'github' | 'local'
  source?: string
  featured?: boolean
}

export const PROJECTS: ProjectConfig[] = PROJECTS_CONFIG.projects as any

export const LOCAL_PROJECT_FILES: Record<string, Record<string, string>> =
  Object.entries(PROJECTS_CONFIG.local_projects as Record<string, any>).reduce((acc, [key, value]) => {
    acc[key] = value.files || {}
    return acc
  }, {} as Record<string, Record<string, string>>)
