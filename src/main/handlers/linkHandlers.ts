import { ipcMain } from 'electron'

import getLinks from '@main/utils/getLinks'
import deleteLink from '@main/utils/deleteLink'
import updateLinkFolder from '@main/utils/updateLinkFolder'

ipcMain.handle('get-links', async () => {
  try {
    const links = await getLinks()

    return links
  } catch (error) {
    throw new Error('Failed to get links.')
  }
})

ipcMain.handle('delete-link', async (_event, id) => {
  try {
    await deleteLink(id)
  } catch (error) {
    throw new Error('Failed to delete link.')
  }
})

ipcMain.handle('update-link-folder', async (_event, linkId: number, folderId: number | null) => {
  try {
    await updateLinkFolder(linkId, folderId)
  } catch (error) {
    throw new Error('Failed to update link folder.')
  }
})
