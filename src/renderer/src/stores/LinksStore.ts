import { create } from 'zustand'

interface LinksState {
  links: Link[]
  getLinks: () => Promise<void>
}

const useLinksStore = create<LinksState>((set) => ({
  links: [],
  getLinks: async (): Promise<void> => {
    try {
      const links: Link[] = await window.electron.ipcRenderer.invoke('get-links')

      set({ links: links })
    } catch (error) {
      throw new Error('Failed to get links.')
    }
  }
}))

export default useLinksStore
