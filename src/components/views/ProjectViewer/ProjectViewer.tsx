'use client'

import { useState, useEffect } from 'react'
import {
  FaFolder,
  FaArrowLeft,
  FaGithub,
  FaLock,
  FaFilePdf,
  FaFileImage,
  FaFileAlt
} from 'react-icons/fa'
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiPython,
  SiHtml5,
  SiCss3,
  SiJson,
  SiMarkdown
} from 'react-icons/si'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase()

    switch (ext) {
      case 'js':
        return <SiJavascript style={{ color: '#f7df1e' }} />
      case 'jsx':
        return <SiReact style={{ color: '#61dafb' }} />
      case 'ts':
        return <SiTypescript style={{ color: '#3178c6' }} />
      case 'tsx':
        return <SiReact style={{ color: '#61dafb' }} />
      case 'py':
        return <SiPython style={{ color: '#3776ab' }} />
      case 'html':
        return <SiHtml5 style={{ color: '#e34f26' }} />
      case 'css':
      case 'scss':
      case 'sass':
        return <SiCss3 style={{ color: '#1572b6' }} />
      case 'json':
        return <SiJson style={{ color: '#f1fa8c' }} />
      case 'md':
        return <SiMarkdown style={{ color: '#ffffff' }} />
      case 'pdf':
        return <FaFilePdf style={{ color: '#f40f02' }} />
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'svg':
        return <FaFileImage style={{ color: '#50fa7b' }} />
      default:
        return <FaFileAlt style={{ color: '#8b949e' }} />
    }
  }

  const getLanguageFromFilename = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase()

    const languageMap: Record<string, string> = {
      'js': 'javascript',
      'jsx': 'jsx',
      'ts': 'typescript',
      'tsx': 'tsx',
      'py': 'python',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'sass': 'sass',
      'json': 'json',
      'md': 'markdown',
      'yml': 'yaml',
      'yaml': 'yaml',
      'sh': 'bash',
      'java': 'java',
      'c': 'c',
      'cpp': 'cpp',
      'cs': 'csharp',
      'go': 'go',
      'rs': 'rust',
      'php': 'php',
      'rb': 'ruby',
      'sql': 'sql',
      'xml': 'xml'
    }

    return languageMap[ext || ''] || 'text'
  }

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
                <div className={styles.markdownContent}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {readme}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {fileContent && selectedFile && (
              <div className={styles.fileContent}>
                <h3>{selectedFile.split('/').pop()}</h3>
                {getLanguageFromFilename(selectedFile) === 'markdown' ? (
                  <div className={styles.markdownContent}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {fileContent}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <SyntaxHighlighter
                    language={getLanguageFromFilename(selectedFile)}
                    style={vscDarkPlus}
                    showLineNumbers
                    customStyle={{
                      margin: 0,
                      borderRadius: 0,
                      background: '#0d1117',
                      fontSize: '14px',
                      lineHeight: '1.6'
                    }}
                  >
                    {fileContent}
                  </SyntaxHighlighter>
                )}
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
                      {file.type === 'dir' ? (
                        <FaFolder style={{ color: '#58a6ff', fontSize: '24px' }} />
                      ) : (
                        <div style={{ fontSize: '24px' }}>{getFileIcon(file.name)}</div>
                      )}
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
