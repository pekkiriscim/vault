import { create } from 'zustand'

import useContentInputStore from '@renderer/stores/ContentInputStore'

interface NotesState {
  notes: Note[]
  getNotes: () => Promise<void>
  addNote: (folderId?: number) => Promise<void>
  deleteNote: (id: number) => Promise<void>
  updateNoteFolder: (noteId: number, folderId: number | null) => Promise<void>
  updateNoteContent: (noteId: number, newContent: string) => Promise<void>
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
  addNote: async (folderId?: number): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('add-note', {
        content: useContentInputStore.getState().contentHTML,
        folderId: folderId || null
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
  },
  updateNoteFolder: async (noteId: number, folderId: number | null): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('update-note-folder', noteId, folderId)

      await get().getNotes()
    } catch (error) {
      throw new Error('Failed to update note folder.')
    }
  },
  updateNoteContent: async (noteId: number, newContent: string): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('update-note-content', noteId, newContent)

      await get().getNotes()
    } catch (error) {
      throw new Error('Failed to update note content.')
    }
  }
}))

export default useNotesStore
