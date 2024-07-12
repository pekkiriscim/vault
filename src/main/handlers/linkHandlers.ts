import { ipcMain } from 'electron'

import getLinks from '@main/utils/getLinks'

ipcMain.handle('get-links', async () => {
  try {
    const links = await getLinks()

    return links
  } catch (error) {
    throw new Error('Failed to get links.')
  }
})
