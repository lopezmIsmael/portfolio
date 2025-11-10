'use client'

import { useState, useRef } from 'react'
import TerminalEmulator, { TerminalEmulatorHandle } from '@/components/TerminalEmulator/TerminalEmulator'
import ContentPanel from '@/components/ContentPanel/ContentPanel'
import { ContentView } from '@/types/terminal'
import styles from './AppLayout.module.scss'

export default function AppLayout() {
  const [contentView, setContentView] = useState<ContentView>('welcome')
  const terminalRef = useRef<TerminalEmulatorHandle>(null)

  const handleNavigate = (view: ContentView) => {
    setContentView(view)

    // Sync terminal path with navigation
    const pathMap: Record<ContentView, string> = {
      'welcome': '~',
      'portfolio': '~/portfolio',
      'blog': '~/blog',
      'contact': '~/contact',
      'resume': '~'
    }

    const path = pathMap[view]
    if (path && terminalRef.current) {
      terminalRef.current.navigateToPath(path, view)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.terminal}>
        <TerminalEmulator ref={terminalRef} onContentChange={setContentView} />
      </div>
      <div className={styles.content}>
        <ContentPanel view={contentView} onNavigate={handleNavigate} />
      </div>
    </div>
  )
}
