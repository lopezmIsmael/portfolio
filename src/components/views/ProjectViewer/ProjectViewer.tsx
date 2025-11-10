'use client'

import { useState, useEffect } from 'react'
import { FaFolder, FaFile, FaArrowLeft, FaGithub, FaLock } from 'react-icons/fa'
import { ProjectConfig, LOCAL_PROJECT_FILES } from '@/data/projects'
import { githubService, GitHubFile } from '@/services/github'
import styles from './ProjectViewer.module.scss'

interface ProjectViewerProps {
  project: ProjectConfig
  onBack: () => void
}

export default function ProjectViewer({ project, onBack }: ProjectViewerProps) {
  const [currentPath, setCurrentPath] = useState('')
  const [files, setFiles] = useState<GitHubFile[]>([])
  const [fileContent, setFileContent] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [readme, setReadme] = useState<string>('')

  useEffect(() => {
    loadProjectContents()
  }, [project, currentPath])

  const loadProjectContents = async () => {
    setLoading(true)
    setError('')

    try {
      if (project.type === 'github' && project.source) {
        const [owner, repo] = project.source.split('/')

        if (!currentPath && !selectedFile) {
          // Load README first
          try {
            const readmeContent = await githubService.getReadme(owner, repo)
            setReadme(readmeContent)
          } catch (err) {
            console.log('README not found')
          }
        }

        const contents = await githubService.getRepoContents(owner, repo, currentPath)
        setFiles(contents)
      } else if (project.type === 'local') {
        // Load local project files
        const localFiles = LOCAL_PROJECT_FILES[project.id]
        if (!localFiles) {
          setError('No hay archivos disponibles para este proyecto privado')
          return
        }

        if (!currentPath && !selectedFile) {
          // Show README if available
          if (localFiles['README.md']) {
            setReadme(localFiles['README.md'])
          }
        }

        // Convert local files to file structure
        const fileList: GitHubFile[] = Object.keys(localFiles).map(path => ({
          name: path.split('/').pop() || path,
          path: path,
          type: 'file' as const,
          url: '',
          download_url: ''
        }))

        setFiles(fileList)
      }
    } catch (err: any) {
      setError(err.message || 'Error al cargar los archivos del proyecto')
    } finally {
      setLoading(false)
    }
  }

  const handleFileClick = async (file: GitHubFile) => {
    if (file.type === 'dir') {
      setCurrentPath(file.path)
      setSelectedFile('')
      setFileContent('')
      setReadme('')
    } else {
      setLoading(true)
      setSelectedFile(file.path)
      setReadme('')

      try {
        let content = ''

        if (project.type === 'github' && project.source) {
          const [owner, repo] = project.source.split('/')
          content = await githubService.getFileContent(owner, repo, file.path)
        } else if (project.type === 'local') {
          const localFiles = LOCAL_PROJECT_FILES[project.id]
          content = localFiles[file.path] || 'Contenido no disponible'
        }

        setFileContent(content)
      } catch (err: any) {
        setError(`Error al cargar el archivo: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleBackNavigation = () => {
    if (selectedFile) {
      // Go back to file list
      setSelectedFile('')
      setFileContent('')
      loadProjectContents()
    } else if (currentPath) {
      // Go back one directory
      const pathParts = currentPath.split('/')
      pathParts.pop()
      setCurrentPath(pathParts.join('/'))
    } else {
      // Go back to projects list
      onBack()
    }
  }

  const renderBreadcrumb = () => {
    const parts = currentPath ? currentPath.split('/') : []

    return (
      <div className={styles.breadcrumb}>
        <span onClick={() => { setCurrentPath(''); setSelectedFile(''); setFileContent(''); }}>
          {project.name}
        </span>
        {parts.map((part, index) => (
          <span key={index}>
            <span className={styles.separator}>/</span>
            <span onClick={() => {
              const newPath = parts.slice(0, index + 1).join('/')
              setCurrentPath(newPath)
              setSelectedFile('')
              setFileContent('')
            }}>
              {part}
            </span>
          </span>
        ))}
        {selectedFile && (
          <>
            <span className={styles.separator}>/</span>
            <span className={styles.current}>{selectedFile.split('/').pop()}</span>
          </>
        )}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handleBackNavigation} className={styles.backButton}>
          <FaArrowLeft /> Volver
        </button>
        <div className={styles.projectInfo}>
          <h2>{project.name}</h2>
          <div className={styles.badges}>
            {project.type === 'github' ? (
              <span className={styles.badge}>
                <FaGithub /> GitHub
              </span>
            ) : (
              <span className={`${styles.badge} ${styles.private}`}>
                <FaLock /> Privado
              </span>
            )}
            {project.tech.map(tech => (
              <span key={tech} className={styles.techBadge}>{tech}</span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {renderBreadcrumb()}

        {loading && <div className={styles.loading}>Cargando...</div>}
        {error && <div className={styles.error}>{error}</div>}

        {!loading && !error && (
          <>
            {readme && !selectedFile && (
              <div className={styles.readme}>
                <h3>README.md</h3>
                <pre>{readme}</pre>
              </div>
            )}

            {fileContent && selectedFile && (
              <div className={styles.fileContent}>
                <h3>{selectedFile.split('/').pop()}</h3>
                <pre><code>{fileContent}</code></pre>
              </div>
            )}

            {!selectedFile && (
              <div className={styles.fileList}>
                <h3>Archivos</h3>
                <div className={styles.files}>
                  {files.map(file => (
                    <div
                      key={file.path}
                      className={styles.fileItem}
                      onClick={() => handleFileClick(file)}
                    >
                      {file.type === 'dir' ? <FaFolder /> : <FaFile />}
                      <span>{file.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
