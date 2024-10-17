import { ipcMain } from 'electron'

import getFolders from '@main/utils/getFolders'

ipcMain.handle('get-folders', async () => {
  try {
    const folders = await getFolders()

    return folders
  } catch (error) {
    throw new Error('Failed to get folders.')
  }
})
