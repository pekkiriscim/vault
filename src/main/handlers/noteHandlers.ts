import { ipcMain } from 'electron'

import addNote from '@main/utils/addNote'
import getNotes from '@main/utils/getNotes'
import deleteNote from '@main/utils/deleteNote'
import updateNoteFolder from '@main/utils/updateNoteFolder'
import updateNoteContent from '@main/utils/updateNoteContent'

ipcMain.handle('get-notes', async () => {
  try {
    const notes = await getNotes()

    return notes
  } catch (error) {
    throw new Error('Failed to get notes.')
  }
})

ipcMain.handle('add-note', async (_event, noteProps) => {
  try {
    const newNote = await addNote(noteProps)

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

ipcMain.handle('update-note-folder', async (_event, noteId: number, folderId: number | null) => {
  try {
    await updateNoteFolder(noteId, folderId)
  } catch (error) {
    throw new Error('Failed to update note folder.')
  }
})

ipcMain.handle('update-note-content', async (_event, noteId: number, newContent: string) => {
  try {
    await updateNoteContent(noteId, newContent)
  } catch (error) {
    throw new Error('Failed to update note content.')
  }
})
