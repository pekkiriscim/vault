import { ipcMain } from 'electron'

import getNotes from '@main/utils/getNotes'

ipcMain.handle('get-notes', async () => {
  try {
    const notes = await getNotes()

    return notes
  } catch (error) {
    throw new Error('Failed to get notes.')
  }
})
