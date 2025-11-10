'use client'

import { useState, useRef, useEffect, KeyboardEvent, forwardRef, useImperativeHandle } from 'react'
import { TerminalLine, ContentView } from '@/types/terminal'
import { processCommand, getPrompt, completeInput, getAutocompleteSuggestions } from '@/utils/commandProcessor'
import styles from './TerminalEmulator.module.scss'

interface TerminalEmulatorProps {
  onContentChange: (view: ContentView) => void
}

export interface TerminalEmulatorHandle {
  navigateToPath: (path: string, view?: ContentView) => void
}

const TerminalEmulator = forwardRef<TerminalEmulatorHandle, TerminalEmulatorProps>(
  ({ onContentChange }, ref) => {
    const [lines, setLines] = useState<TerminalLine[]>([
      {
        id: '0',
        type: 'output',
        content: 'Bienvenido al Portfolio Terminal v1.0.0'
      },
      {
        id: '1',
        type: 'output',
        content: 'Escribe "help" para ver los comandos disponibles.'
      },
      {
        id: '2',
        type: 'output',
        content: ''
      }
    ])
    const [currentInput, setCurrentInput] = useState('')
    const [commandHistory, setCommandHistory] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [currentPath, setCurrentPath] = useState('~')

    const inputRef = useRef<HTMLInputElement>(null)
    const terminalEndRef = useRef<HTMLDivElement>(null)

    // Expose navigateToPath method to parent component
    useImperativeHandle(ref, () => ({
      navigateToPath: (path: string, view?: ContentView) => {
        setCurrentPath(path)
        if (view) {
          onContentChange(view)
        }
      }
    }), [onContentChange])

    useEffect(() => {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [lines])

    useEffect(() => {
      inputRef.current?.focus()
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentInput(e.target.value)
      setHistoryIndex(-1)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      // Ctrl+C - Cancel current input
      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault()
        if (currentInput) {
          const newLines: TerminalLine[] = [
            ...lines,
            {
              id: Date.now().toString(),
              type: 'command',
              content: `${getPrompt(currentPath)} ${currentInput}^C`
            }
          ]
          setLines(newLines)
          setCurrentInput('')
          setHistoryIndex(-1)
        }
        return
      }

      // Ctrl+L - Clear screen
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault()
        setLines([])
        setCurrentInput('')
        setHistoryIndex(-1)
        return
      }

      // Ctrl+U - Clear line
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault()
        setCurrentInput('')
        setHistoryIndex(-1)
        return
      }

      // Ctrl+A - Move to beginning
      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault()
        if (inputRef.current) {
          inputRef.current.setSelectionRange(0, 0)
        }
        return
      }

      // Ctrl+E - Move to end
      if (e.ctrlKey && e.key === 'e') {
        e.preventDefault()
        if (inputRef.current) {
          const len = currentInput.length
          inputRef.current.setSelectionRange(len, len)
        }
        return
      }

      // Tab - Autocomplete
      if (e.key === 'Tab') {
        e.preventDefault()
        const suggestions = getAutocompleteSuggestions(currentInput, currentPath)

        if (suggestions.length === 0) {
          return
        }

        if (suggestions.length === 1) {
          const completed = completeInput(currentInput, currentPath)
          setCurrentInput(completed)
        } else {
          // Show suggestions
          const newLines: TerminalLine[] = [
            ...lines,
            {
              id: Date.now().toString(),
              type: 'command',
              content: `${getPrompt(currentPath)} ${currentInput}`
            },
            {
              id: `${Date.now()}-suggestions`,
              type: 'output',
              content: suggestions.join('  ')
            }
          ]
          setLines(newLines)
        }
        return
      }

      if (e.key === 'Enter') {
        e.preventDefault()
        executeCommand(currentInput)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (commandHistory.length > 0) {
          const newIndex = historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1)
          setHistoryIndex(newIndex)
          setCurrentInput(commandHistory[newIndex])
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (historyIndex !== -1) {
          const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1)
          if (newIndex === commandHistory.length - 1 && historyIndex === newIndex) {
            setHistoryIndex(-1)
            setCurrentInput('')
          } else {
            setHistoryIndex(newIndex)
            setCurrentInput(commandHistory[newIndex])
          }
        }
      }
    }

    const executeCommand = (command: string) => {
      const trimmedCommand = command.trim()

      // Add command to history
      if (trimmedCommand) {
        setCommandHistory(prev => [...prev, trimmedCommand])
      }

      // Add command line to terminal
      const newLines: TerminalLine[] = [
        ...lines,
        {
          id: Date.now().toString(),
          type: 'command',
          content: `${getPrompt(currentPath)} ${command}`
        }
      ]

      // Process command
      if (trimmedCommand.toLowerCase() === 'clear') {
        setLines([])
        setCurrentInput('')
        return
      }

      const result = processCommand(trimmedCommand, currentPath)

      // Update current path if changed
      if (result.newPath !== undefined) {
        setCurrentPath(result.newPath)
      }

      // Add output lines
      const outputLines: TerminalLine[] = result.output.map((line, index) => ({
        id: `${Date.now()}-${index}`,
        type: result.error ? 'error' : 'output',
        content: line
      }))

      setLines([...newLines, ...outputLines])

      // Change content view if needed
      if (result.contentView) {
        onContentChange(result.contentView)
      }

      setCurrentInput('')
      setHistoryIndex(-1)
    }

    const handleTerminalClick = () => {
      inputRef.current?.focus()
    }

    return (
      <div className={styles.terminal} onClick={handleTerminalClick}>
        <div className={styles.header}>
          <div className={styles.buttons}>
            <span className={styles.close}></span>
            <span className={styles.minimize}></span>
            <span className={styles.maximize}></span>
          </div>
          <div className={styles.title}>ismaellopez@portfolio: {currentPath}</div>
        </div>

        <div className={styles.content}>
          {lines.map((line) => (
            <div
              key={line.id}
              className={`${styles.line} ${
                line.type === 'error' ? styles.error :
                line.type === 'command' ? styles.command :
                styles.output
              }`}
              dangerouslySetInnerHTML={{ __html: line.content }}
            />
          ))}

          <div className={styles.inputLine}>
            <span
              className={styles.prompt}
              dangerouslySetInnerHTML={{ __html: getPrompt(currentPath) }}
            />
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={styles.input}
              spellCheck={false}
              autoComplete="off"
            />
          </div>

          <div ref={terminalEndRef} />
        </div>
      </div>
    )
  }
)

TerminalEmulator.displayName = 'TerminalEmulator'

export default TerminalEmulator
