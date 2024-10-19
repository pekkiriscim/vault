import { create } from 'zustand'

interface LinksState {
  links: Link[]
  getLinks: () => Promise<void>
  deleteLink: (id: number) => Promise<void>
  updateLinkFolder: (linkId: number, folderId: number | null) => Promise<void>
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
  }
}))

export default useLinksStore
