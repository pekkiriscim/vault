import { create } from 'zustand'

interface NotesState {
  notes: Note[]
  getNotes: () => Promise<void>
}

const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  getNotes: async (): Promise<void> => {
    try {
      const notes: Note[] = await window.electron.ipcRenderer.invoke('get-notes')

      set({ notes: notes })
    } catch (error) {
      throw new Error('Failed to get notes.')
    }
  }
}))

export default useNotesStore
