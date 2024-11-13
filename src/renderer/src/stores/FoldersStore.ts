import { create } from 'zustand'

interface FoldersState {
  folders: Folder[]
  getFolders: () => Promise<void>
  addFolder: (folderProps: AddFolderProps) => Promise<void>
}

const useFoldersStore = create<FoldersState>((set, get) => ({
  folders: [],
  getFolders: async (): Promise<void> => {
    try {
      const folders: Folder[] = await window.electron.ipcRenderer.invoke('get-folders')

      set({ folders: folders })
    } catch (error) {
      throw new Error('Failed to get folders.')
    }
  },
  addFolder: async (folderProps): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('add-folder', folderProps)

      await get().getFolders()
    } catch (error) {
      throw new Error('Failed to add folder.')
    }
  }
}))

export default useFoldersStore
