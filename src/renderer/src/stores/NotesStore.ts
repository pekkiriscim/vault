import { create } from 'zustand'

import useContentInputStore from '@renderer/stores/ContentInputStore'

interface NotesState {
  notes: Note[]
  getNotes: () => Promise<void>
  addNote: () => Promise<void>
  deleteNote: (id: number) => Promise<void>
}

const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  getNotes: async (): Promise<void> => {
    try {
      const notes: Note[] = await window.electron.ipcRenderer.invoke('get-notes')

      set({ notes: notes })
    } catch (error) {
      throw new Error('Failed to get notes.')
    }
  },
  addNote: async (): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('add-note', {
        content: useContentInputStore.getState().contentHTML
      })

      await get().getNotes()
    } catch (error) {
      throw new Error('Failed to add note.')
    }
  },
  deleteNote: async (id: number): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('delete-note', id)

      await get().getNotes()
    } catch (error) {
      throw new Error('Failed to delete note.')
    }
  }
}))

export default useNotesStore
