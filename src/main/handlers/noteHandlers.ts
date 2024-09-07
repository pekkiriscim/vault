import { ipcMain } from 'electron'

import addNote from '@main/utils/addNote'
import getNotes from '@main/utils/getNotes'
import deleteNote from '@main/utils/deleteNote'

ipcMain.handle('get-notes', async () => {
  try {
    const notes = await getNotes()

    return notes
  } catch (error) {
    throw new Error('Failed to get notes.')
  }
})

ipcMain.handle('add-note', async (_event, noteData) => {
  try {
    const newNote = await addNote(noteData)

    return newNote
  } catch (error) {
    throw new Error('Failed to add note.')
  }
})

ipcMain.handle('delete-note', async (_event, id) => {
  try {
    await deleteNote(id)
  } catch (error) {
    throw new Error('Failed to delete note.')
  }
})
