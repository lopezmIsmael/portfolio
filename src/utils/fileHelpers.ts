import React from 'react'
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
import { FaFilePdf, FaFileImage, FaFileAlt } from 'react-icons/fa'
import { FILE_EXTENSIONS } from '@/constants/icons'

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ''
}

export function getFileIcon(filename: string): React.ReactElement {
  const ext = getFileExtension(filename)

  if (FILE_EXTENSIONS.JAVASCRIPT.includes(ext as any)) {
    const Icon = ext === 'jsx' ? SiReact : SiJavascript
    const color = ext === 'jsx' ? '#61dafb' : '#f7df1e'
    return React.createElement(Icon, { style: { color } })
  }

  if (FILE_EXTENSIONS.TYPESCRIPT.includes(ext as any)) {
    const Icon = ext === 'tsx' ? SiReact : SiTypescript
    const color = ext === 'tsx' ? '#61dafb' : '#3178c6'
    return React.createElement(Icon, { style: { color } })
  }

  if (FILE_EXTENSIONS.PYTHON.includes(ext as any)) {
    return React.createElement(SiPython, { style: { color: '#3776ab' } })
  }

  if (FILE_EXTENSIONS.MARKUP.includes(ext as any)) {
    return React.createElement(SiHtml5, { style: { color: '#e34f26' } })
  }

  if (FILE_EXTENSIONS.STYLESHEET.includes(ext as any)) {
    return React.createElement(SiCss3, { style: { color: '#1572b6' } })
  }

  if (FILE_EXTENSIONS.DATA.includes(ext as any)) {
    return React.createElement(SiJson, { style: { color: '#f1fa8c' } })
  }

  if (FILE_EXTENSIONS.MARKDOWN.includes(ext as any)) {
    return React.createElement(SiMarkdown, { style: { color: '#ffffff' } })
  }

  if (FILE_EXTENSIONS.DOCUMENT.includes(ext as any)) {
    return React.createElement(FaFilePdf, { style: { color: '#f40f02' } })
  }

  if (FILE_EXTENSIONS.IMAGE.includes(ext as any)) {
    return React.createElement(FaFileImage, { style: { color: '#50fa7b' } })
  }

  return React.createElement(FaFileAlt, { style: { color: '#8b949e' } })
}

export function getLanguageFromFilename(filename: string): string {
  const ext = getFileExtension(filename)

  const languageMap: Record<string, string> = {
    js: 'javascript',
    jsx: 'jsx',
    ts: 'typescript',
    tsx: 'tsx',
    py: 'python',
    html: 'html',
    css: 'css',
    scss: 'scss',
    sass: 'sass',
    json: 'json',
    md: 'markdown',
    yml: 'yaml',
    yaml: 'yaml',
    sh: 'bash',
    java: 'java',
    c: 'c',
    cpp: 'cpp',
    cs: 'csharp',
    go: 'go',
    rs: 'rust',
    php: 'php',
    rb: 'ruby',
    sql: 'sql',
    xml: 'xml'
  }

  return languageMap[ext] || 'text'
}
