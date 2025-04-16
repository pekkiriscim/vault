import fs from 'fs'
import path from 'path'

import envPaths from 'env-paths'

import { Hono } from 'hono'
import { serve, ServerType } from '@hono/node-server'

import type { BrowserWindow } from 'electron'

import addLink from '@main/utils/addLink'
import addNote from '@main/utils/addNote'
import getFolders from '@main/utils/getFolders'
import getMetadata from '@main/utils/getMetadata'
import addImageFromBase64 from '@main/utils/addImageFromBase64'

class APIManager {
  private server: ServerType | null = null

  private app: Hono = new Hono()

  private mainWindow: BrowserWindow | null = null

  private configPath: string

  private defaultPort = 8001

  private currentPort: number

  constructor() {
    const paths = envPaths('vault', { suffix: '' })

    this.configPath = path.join(paths.data, 'config.json')

    this.currentPort = this.loadPort()
  }

  private loadPort(): number {
    try {
      if (!fs.existsSync(this.configPath)) {
        fs.mkdirSync(path.dirname(this.configPath), { recursive: true })

        fs.writeFileSync(this.configPath, JSON.stringify({ apiPort: this.defaultPort }))

        return this.defaultPort
      }

      const data = fs.readFileSync(this.configPath, 'utf-8')

      const config = JSON.parse(data)

      return config.apiPort || this.defaultPort
    } catch (error) {
      console.error('Failed to load port config:', error)

      return this.defaultPort
    }
  }

  private async savePort(port: number): Promise<void> {
    try {
      await fs.promises.writeFile(this.configPath, JSON.stringify({ apiPort: port }))
    } catch (error) {
      throw new Error('Failed to save port configuration.')
    }
  }

  public getPort(): number {
    return this.currentPort
  }

  public async updatePort(newPort: number): Promise<void> {
    if (newPort < 1024 || newPort > 65535) {
      throw new Error('Invalid port number. Port must be between 1024 and 65535.')
    }

    if (this.server) {
      this.stop()
    }

    await this.savePort(newPort)

    this.currentPort = newPort

    this.start()
  }

  initialize(window: BrowserWindow): void {
    this.mainWindow = window

    this.setupRoutes()
  }

  private setupRoutes(): void {
    this.app.get('/', (c) => c.text('Vault API Server Running'))

    this.app.post('/links', async (c) => {
      try {
        const body = await c.req.json()

        const newLink = await addLink(body)

        await getMetadata(newLink)

        return c.json({ success: true, data: newLink })
      } catch (error) {
        return c.json({ success: false, error: 'Failed to add link' }, 500)
      }
    })

    this.app.get('/folders', async (c) => {
      try {
        const folders = await getFolders()

        return c.json({ success: true, data: folders })
      } catch (error) {
        return c.json({ success: false, error: 'Failed to fetch folders' }, 500)
      }
    })

    this.app.post('/notes', async (c) => {
      try {
        const body = await c.req.json()

        const newNote = await addNote(body)

        return c.json({ success: true, data: newNote })
      } catch (error) {
        return c.json({ success: false, error: 'Failed to add note' }, 500)
      }
    })

    this.app.post('/images', async (c) => {
      try {
        const body = await c.req.json()

        const newImage = await addImageFromBase64(body.base64Data, body.folderId)

        return c.json({ success: true, data: newImage })
      } catch (error) {
        return c.json({ success: false, error: 'Failed to add image' }, 500)
      }
    })

    this.app.get('/config/port', (c) => {
      return c.json({ port: this.currentPort })
    })

    this.app.put('/config/port', async (c) => {
      try {
        const { port } = await c.req.json()

        if (typeof port !== 'number' || port < 1024 || port > 65535) {
          return c.json({ success: false, error: 'Invalid port number' }, 400)
        }

        await this.updatePort(port)

        return c.json({ success: true, port })
      } catch (error) {
        return c.json({ success: false, error: 'Failed to update port' }, 500)
      }
    })
  }

  public start(): void {
    if (!this.mainWindow) {
      throw new Error('APIManager not initialized. Call initialize() first.')
    }

    this.server = serve({
      fetch: this.app.fetch,
      port: this.currentPort
    })

    console.log(`API Server running on port ${this.currentPort}`)
  }

  public stop(): void {
    if (this.server) {
      this.server.close()

      this.server = null
    }
  }
}

const apiManager = new APIManager()

export default apiManager
