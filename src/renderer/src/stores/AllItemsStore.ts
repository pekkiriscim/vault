import { create } from 'zustand'

import useLinksStore from '@renderer/stores/LinksStore'
import useNotesStore from '@renderer/stores/NotesStore'
import useImagesStore from '@renderer/stores/ImagesStore'

interface AllItemsState {
  allItems: AllItems[]
  fetchAllItems: () => Promise<void>
  updateAllItems: () => void
}

const useAllItemsStore = create<AllItemsState>((set, get) => ({
  allItems: [],
  fetchAllItems: async (): Promise<void> => {
    try {
      await Promise.all([
        useLinksStore.getState().getLinks(),
        useNotesStore.getState().getNotes(),
        useImagesStore.getState().getImages()
      ])

      get().updateAllItems()
    } catch (error) {
      throw new Error('Failed to fetch all items.')
    }
  },
  updateAllItems: (): void => {
    const links = useLinksStore.getState().links
    const notes = useNotesStore.getState().notes
    const images = useImagesStore.getState().images

    const combinedItems = [...links, ...notes, ...images].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    set({ allItems: combinedItems })
  }
}))

useLinksStore.subscribe(useAllItemsStore.getState().updateAllItems)
useNotesStore.subscribe(useAllItemsStore.getState().updateAllItems)
useImagesStore.subscribe(useAllItemsStore.getState().updateAllItems)

export default useAllItemsStore
