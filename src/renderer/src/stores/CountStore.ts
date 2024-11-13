import { create } from 'zustand'

import useFoldersStore from '@renderer/stores/FoldersStore'
import useAllItemsStore from '@renderer/stores/AllItemsStore'

interface CountState {
  allItemsCount: number
  linksCount: number
  notesCount: number
  imagesCount: number
  folderItemCounts: { [folderId: number]: number }
  updateCounts: () => void
}

const useCountStore = create<CountState>((set) => ({
  allItemsCount: 0,
  linksCount: 0,
  notesCount: 0,
  imagesCount: 0,
  folderItemCounts: {},
  updateCounts: (): void => {
    const allItems = useAllItemsStore.getState().allItems
    const folders = useFoldersStore.getState().folders

    const allItemsCount = allItems.length
    const linksCount = allItems.filter((item) => 'url' in item).length
    const notesCount = allItems.filter((item) => 'content' in item).length
    const imagesCount = allItems.filter((item) => 'fileName' in item).length

    const folderItemCounts: { [folderId: number]: number } = {}

    folders.forEach((folder) => {
      folderItemCounts[folder.id] = allItems.filter((item) => item.folderId === folder.id).length
    })

    set({
      allItemsCount,
      linksCount,
      notesCount,
      imagesCount,
      folderItemCounts
    })
  }
}))

useAllItemsStore.subscribe(useCountStore.getState().updateCounts)
useFoldersStore.subscribe(useCountStore.getState().updateCounts)

export default useCountStore
