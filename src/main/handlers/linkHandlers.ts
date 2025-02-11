import { ipcMain } from 'electron'

import addLink from '@main/utils/addLink'
import getLinks from '@main/utils/getLinks'
import deleteLink from '@main/utils/deleteLink'
import getMetadata from '@main/utils/getMetadata'
import updateLinkPin from '@main/utils/updateLinkPin'
import updateLinkTitle from '@main/utils/updateLinkTitle'
import importBookmarks from '@main/utils/importBookmarks'
import exportBookmarks from '@main/utils/exportBookmarks'
import updateLinkFolder from '@main/utils/updateLinkFolder'

ipcMain.handle('get-links', async () => {
  try {
    const links = await getLinks()

    return links
  } catch (error) {
    throw new Error('Failed to get links.')
  }
})

ipcMain.handle('add-link', async (_event, linkProps) => {
  try {
    const newLink = await addLink(linkProps)

    return newLink
  } catch (error) {
    throw new Error('Failed to add link.')
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

ipcMain.handle('update-link-title', async (_event, linkId: number, newTitle: string | null) => {
  try {
    await updateLinkTitle(linkId, newTitle)
  } catch (error) {
    throw new Error('Failed to update link title.')
  }
})

ipcMain.handle('get-metadata', async (_event, link: Link) => {
  try {
    await getMetadata(link)
  } catch (error) {
    throw new Error('Failed to get metadata.')
  }
})

ipcMain.handle('update-link-pin', async (_event, linkId: number, isPinned: boolean) => {
  try {
    await updateLinkPin(linkId, isPinned)
  } catch (error) {
    throw new Error('Failed to update link pin status.')
  }
})

ipcMain.handle('import-bookmarks', async () => {
  try {
    await importBookmarks()
  } catch (error) {
    throw new Error('Failed to import bookmarks.')
  }
})

ipcMain.handle('export-bookmarks', async () => {
  try {
    await exportBookmarks()
  } catch (error) {
    throw new Error('Failed to export bookmarks.')
  }
})
