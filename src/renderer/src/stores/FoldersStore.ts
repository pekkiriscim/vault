import { create } from 'zustand'

interface FoldersState {
  folders: Folder[]
  isAddingFolder: boolean
  getFolders: () => Promise<void>
  addFolder: (folderProps: AddFolderProps) => Promise<void>
  deleteFolder: (folderId: number) => Promise<void>
  updateFolderName: (folderId: number, newName: string) => Promise<void>
  setIsAddingFolder: (value: boolean) => void
}

const useFoldersStore = create<FoldersState>((set, get) => ({
  folders: [],
  isAddingFolder: false,
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
  },
  deleteFolder: async (folderId): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('delete-folder', folderId)

      await get().getFolders()
    } catch (error) {
      throw new Error('Failed to delete folder.')
    }
  },
  updateFolderName: async (folderId, newName): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('update-folder-name', folderId, newName)

      await get().getFolders()
    } catch (error) {
      throw new Error('Failed to update folder name.')
    }
  },
  setIsAddingFolder: (value): void => set({ isAddingFolder: value })
}))

export default useFoldersStore
