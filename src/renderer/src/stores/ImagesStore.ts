import { create } from 'zustand'

import useVaultStore from '@renderer/stores/VaultStore'

interface ImagesState {
  images: Image[]
  getImages: () => Promise<void>
  addImage: () => Promise<void>
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
  addImage: async (): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('add-image', useVaultStore.getState().path)

      await get().getImages()
    } catch (error) {
      throw new Error('Failed to add image.')
    }
  }
}))

export default useImagesStore
