export interface TerminalLine {
  id: string
  type: 'command' | 'output' | 'error'
  content: string
}

export type ContentView = 'welcome' | 'about' | 'portfolio' | 'blog' | 'contact' | 'resume'

export interface CommandResult {
  output: string[]
  contentView?: ContentView
  error?: boolean
  newPath?: string
}
