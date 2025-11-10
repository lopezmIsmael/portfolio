export interface GitHubFile {
  name: string
  path: string
  type: 'file' | 'dir'
  size?: number
  download_url?: string
  url: string
}

export interface GitHubContent {
  name: string
  path: string
  content?: string
  type: 'file' | 'dir'
}

class GitHubService {
  private baseUrl = 'https://api.github.com'
  private token?: string // Optional: para aumentar rate limit

  constructor(token?: string) {
    this.token = token
  }

  private async fetch<T>(url: string): Promise<T> {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json'
    }

    if (this.token) {
      headers['Authorization'] = `token ${this.token}`
    }

    const response = await fetch(url, { headers })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get repository contents at a specific path
   */
  async getRepoContents(owner: string, repo: string, path: string = ''): Promise<GitHubFile[]> {
    const url = `${this.baseUrl}/repos/${owner}/${repo}/contents/${path}`
    return this.fetch<GitHubFile[]>(url)
  }

  /**
   * Get file content (decoded from base64)
   */
  async getFileContent(owner: string, repo: string, path: string): Promise<string> {
    const url = `${this.baseUrl}/repos/${owner}/${repo}/contents/${path}`
    const response = await this.fetch<GitHubContent>(url)

    if (response.type !== 'file' || !response.content) {
      throw new Error('Not a file or content not available')
    }

    // GitHub returns content in base64
    // Use proper UTF-8 decoding to handle emojis and special characters
    const base64Content = response.content.replace(/\n/g, '')

    // Decode base64 to binary string
    const binaryString = atob(base64Content)

    // Convert binary string to UTF-8
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    // Decode as UTF-8
    const decoder = new TextDecoder('utf-8')
    return decoder.decode(bytes)
  }

  /**
   * Get README.md content
   */
  async getReadme(owner: string, repo: string): Promise<string> {
    try {
      return await this.getFileContent(owner, repo, 'README.md')
    } catch (error) {
      // Try with lowercase
      try {
        return await this.getFileContent(owner, repo, 'readme.md')
      } catch {
        throw new Error('README.md not found')
      }
    }
  }

  /**
   * Get repository info
   */
  async getRepoInfo(owner: string, repo: string) {
    const url = `${this.baseUrl}/repos/${owner}/${repo}`
    return this.fetch<any>(url)
  }
}

// Singleton instance
export const githubService = new GitHubService()

// For authenticated requests (higher rate limit)
export const createGitHubService = (token: string) => new GitHubService(token)
