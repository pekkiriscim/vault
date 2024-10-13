import { create } from 'zustand'

import useLinksStore from '@renderer/stores/LinksStore'
import useNotesStore from '@renderer/stores/NotesStore'
import useImagesStore from '@renderer/stores/ImagesStore'

interface AllItemsState {
  allItems: AllItems[]
  updateAllItems: () => void
}

const useAllItemsStore = create<AllItemsState>((set) => ({
  allItems: [],
  updateAllItems: (): void => {
    const links = useLinksStore.getState().links
    const notes = useNotesStore.getState().notes
    const images = useImagesStore.getState().images

    const allItems = [...links, ...notes, ...images].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    set({ allItems: allItems })
  }
}))

export default useAllItemsStore
