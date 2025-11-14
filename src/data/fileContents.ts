import { TERMINAL_CONFIG } from './generated/terminal'

function convertToLines(content: string): string[] {
  return content.split('\n')
}

export const FILE_CONTENTS: Record<string, string[]> = Object.entries(
  TERMINAL_CONFIG.file_contents as Record<string, string>
).reduce((acc, [key, value]) => {
  acc[key] = convertToLines(value)
  return acc
}, {} as Record<string, string[]>)
