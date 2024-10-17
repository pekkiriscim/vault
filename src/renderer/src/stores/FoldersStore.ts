import { create } from 'zustand'

interface FoldersState {
  folders: Folder[]
  getFolders: () => Promise<void>
}

const useFoldersStore = create<FoldersState>((set) => ({
  folders: [],
  getFolders: async (): Promise<void> => {
    try {
      const folders: Folder[] = await window.electron.ipcRenderer.invoke('get-folders')

      set({ folders: folders })
    } catch (error) {
      throw new Error('Failed to get folders.')
    }
  }
}))

export default useFoldersStore
