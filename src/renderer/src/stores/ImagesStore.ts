import { create } from 'zustand'

import useVaultStore from '@renderer/stores/VaultStore'

interface ImagesState {
  images: Image[]
  getImages: () => Promise<void>
  addImage: (folderId?: number) => Promise<void>
  deleteImage: (id: number) => Promise<void>
  updateImageFolder: (imageId: number, folderId: number | null) => Promise<void>
  addImageFromClipboard: (folderId?: number) => Promise<void>
  openImage: (image: Image) => Promise<void>
  copyImage: (image: Image) => Promise<void>
}

const useImagesStore = create<ImagesState>((set, get) => ({
  images: [],
  getImages: async (): Promise<void> => {
    try {
      const images: Image[] = await window.electron.ipcRenderer.invoke('get-images')

      set({ images: images })
    } catch (error) {
      throw new Error('Failed to get images.')
    }
  },
  addImage: async (folderId?: number): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('add-image', useVaultStore.getState().path, folderId)

      await get().getImages()
    } catch (error) {
      throw new Error('Failed to add image.')
    }
  },
  deleteImage: async (id: number): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('delete-image', useVaultStore.getState().path, id)

      await get().getImages()
    } catch (error) {
      throw new Error('Failed to delete image.')
    }
  },
  updateImageFolder: async (imageId: number, folderId: number | null): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('update-image-folder', imageId, folderId)

      await get().getImages()
    } catch (error) {
      throw new Error('Failed to update image folder.')
    }
  },
  addImageFromClipboard: async (folderId?: number): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke(
        'add-image-from-clipboard',
        useVaultStore.getState().path,
        folderId
      )

      await get().getImages()
    } catch (error) {
      throw new Error('Failed to add image from clipboard.')
    }
  },
  openImage: async (image: Image): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('open-image', image)
    } catch (error) {
      throw new Error('Failed to open image.')
    }
  },
  copyImage: async (image: Image): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('copy-image', image)
    } catch (error) {
      throw new Error('Failed to copy image.')
    }
  }
}))

export default useImagesStore
