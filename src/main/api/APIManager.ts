import { Hono } from 'hono'
import { serve, ServerType } from '@hono/node-server'

import type { BrowserWindow } from 'electron'

import addLink from '@main/utils/addLink'
import getMetadata from '@main/utils/getMetadata'

class APIManager {
  private server: ServerType | null = null

  private app: Hono = new Hono()

  private mainWindow: BrowserWindow | null = null

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
  }

  public start(port: number = 3000): void {
    if (!this.mainWindow) {
      throw new Error('APIManager not initialized. Call initialize() first.')
    }

    this.server = serve({
      fetch: this.app.fetch,
      port
    })

    console.log(`API Server running on port ${port}`)
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
