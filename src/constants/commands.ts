export const AVAILABLE_COMMANDS = [
  'help      - Muestra la lista de comandos disponibles',
  'ls        - Lista los directorios y archivos principales',
  'cd <dir>  - Navega a una sección (about, portfolio, blog, contact)',
  'pwd       - Muestra el directorio actual',
  'whoami    - Muestra información del usuario (igual que about)',
  'clear     - Limpia el historial de la terminal',
  'cat <file> - Muestra el contenido de un archivo'
] as const

export const COMMAND_NAMES = ['help', 'ls', 'cd', 'pwd', 'whoami', 'clear', 'cat'] as const

export const KEYBOARD_SHORTCUTS = [
  '  Ctrl+L      - Limpia la pantalla',
  '  Ctrl+C      - Cancela el comando actual',
  '  Tab         - Autocompleta comandos y rutas',
  '  ↑/↓         - Navega por el historial'
] as const
