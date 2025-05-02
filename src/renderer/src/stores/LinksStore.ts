import { create } from 'zustand'

import useContentInputStore from '@renderer/stores/ContentInputStore'

interface LinksState {
  links: Link[]
  getLinks: () => Promise<void>
  addLink: (folderId?: number, url?: string) => Promise<void>
  deleteLink: (id: number) => Promise<void>
  updateLinkFolder: (linkId: number, folderId: number | null) => Promise<void>
  updateLinkTitle: (linkId: number, newTitle: string | null) => Promise<void>
  getMetadata: (link: Link) => Promise<void>
  updateLinkPin: (linkId: number, isPinned: boolean) => Promise<void>
  importBookmarks: () => Promise<void>
  exportBookmarks: () => Promise<void>
}

const useLinksStore = create<LinksState>((set, get) => ({
  links: [],
  getLinks: async (): Promise<void> => {
    try {
      const links: Link[] = await window.electron.ipcRenderer.invoke('get-links')

      set({ links: links })
    } catch (error) {
      throw new Error('Failed to get links.')
    }
  },
  addLink: async (folderId?: number, url?: string): Promise<void> => {
    try {
      const newLink = await window.electron.ipcRenderer.invoke('add-link', {
        url: url || useContentInputStore.getState().contentText,
        folderId: folderId || null
      })

      await get().getLinks()

      get().getMetadata(newLink)
    } catch (error) {
      throw new Error('Failed to add link.')
    }
  },
  deleteLink: async (id: number): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('delete-link', id)

      await get().getLinks()
    } catch (error) {
      throw new Error('Failed to delete link.')
    }
  },
  updateLinkFolder: async (linkId: number, folderId: number | null): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('update-link-folder', linkId, folderId)

      await get().getLinks()
    } catch (error) {
      throw new Error('Failed to update link folder.')
    }
  },
  updateLinkTitle: async (linkId, newTitle): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('update-link-title', linkId, newTitle)

      await get().getLinks()
    } catch (error) {
      throw new Error('Failed to update link title.')
    }
  },
  getMetadata: async (link): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('get-metadata', link)

      get().getLinks()
    } catch (error) {
      throw new Error('Failed to get metadata.')
    }
  },
  updateLinkPin: async (linkId: number, isPinned: boolean): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('update-link-pin', linkId, isPinned)

      await get().getLinks()
    } catch (error) {
      throw new Error('Failed to update link pin status.')
    }
  },
  importBookmarks: async (): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('import-bookmarks')

      await get().getLinks()
    } catch (error) {
      throw new Error('Failed to import bookmarks.')
    }
  },
  exportBookmarks: async (): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('export-bookmarks')
    } catch (error) {
      throw new Error('Failed to export bookmarks.')
    }
  }
}))

export default useLinksStore
