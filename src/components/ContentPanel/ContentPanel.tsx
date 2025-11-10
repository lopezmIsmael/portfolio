'use client'

import { ContentView } from '@/types/terminal'
import { FaFolder, FaFileAlt, FaFilePdf, FaChevronRight } from 'react-icons/fa'
import { IoHome } from 'react-icons/io5'
import PortfolioView from '@/components/views/PortfolioView/PortfolioView'
import styles from './ContentPanel.module.scss'

interface ContentPanelProps {
  view: ContentView
  onNavigate?: (view: ContentView) => void
}

export default function ContentPanel({ view, onNavigate }: ContentPanelProps) {
  const renderBreadcrumb = () => {
    const paths = {
      'welcome': ['Home'],
      'portfolio': ['Home', 'Portfolio'],
      'blog': ['Home', 'Blog'],
      'contact': ['Home', 'Contact'],
      'resume': ['Home', 'Resume.pdf']
    }

    const currentPath = paths[view] || ['Home']

    return (
      <div className={styles.breadcrumb}>
        {currentPath.map((item, index) => (
          <span
            key={index}
            onClick={index === 0 ? () => onNavigate?.('welcome') : undefined}
          >
            {index === 0 ? <IoHome size={14} /> : item}
            {index < currentPath.length - 1 && <FaChevronRight size={10} className={styles.separator} />}
          </span>
        ))}
      </div>
    )
  }

  const renderContent = () => {
    switch (view) {
      case 'about':
        return (
          <div className={styles.documentView}>
            <div className={styles.placeholder}>
              <h2>About Me</h2>
              <p>Information coming soon...</p>
            </div>
          </div>
        )

      case 'portfolio':
        return <PortfolioView />

      case 'blog':
        return (
          <div className={styles.placeholder}>
            <h2>Blog</h2>
            <p>Articles coming soon...</p>
          </div>
        )

      case 'contact':
        return (
          <div className={styles.placeholder}>
            <h2>Contact</h2>
            <p>Contact information coming soon...</p>
          </div>
        )

      case 'resume':
        return (
          <div className={styles.placeholder}>
            <h2>Resume</h2>
            <p>Resume viewer coming soon...</p>
          </div>
        )

      case 'welcome':
      default:
        return (
          <>
            <div className={styles.welcome}>
              <h1>My Portfolio</h1>
              <p className={styles.subtitle}>Software Engineer & Developer</p>
            </div>

            <div className={styles.fileExplorer}>
              <div
                className={`${styles.fileItem} ${styles.folder}`}
                onClick={() => onNavigate?.('portfolio')}
              >
                <FaFolder />
                <span>Portfolio</span>
              </div>

              <div
                className={`${styles.fileItem} ${styles.folder}`}
                onClick={() => onNavigate?.('blog')}
              >
                <FaFolder />
                <span>Blog</span>
              </div>

              <div
                className={`${styles.fileItem} ${styles.folder}`}
                onClick={() => onNavigate?.('contact')}
              >
                <FaFolder />
                <span>Contact</span>
              </div>

              <div
                className={`${styles.fileItem} ${styles.file}`}
                onClick={() => onNavigate?.('resume')}
              >
                <FaFilePdf />
                <span>Resume.pdf</span>
              </div>

              <div
                className={`${styles.fileItem} ${styles.file}`}
              >
                <FaFileAlt />
                <span>README.md</span>
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {renderBreadcrumb()}
      </div>
      <div className={styles.content}>
        {renderContent()}
      </div>
    </div>
  )
}
