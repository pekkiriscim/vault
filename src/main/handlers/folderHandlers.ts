import { ipcMain } from 'electron'

import addFolder from '@main/utils/addFolder'
import getFolders from '@main/utils/getFolders'
import deleteFolder from '@main/utils/deleteFolder'
import updateFolderName from '@main/utils/updateFolderName'

ipcMain.handle('get-folders', async () => {
  try {
    const folders = await getFolders()

    return folders
  } catch (error) {
    throw new Error('Failed to get folders.')
  }
})

ipcMain.handle('add-folder', async (_event, folderProps) => {
  try {
    const newFolder = await addFolder(folderProps)

    return newFolder
  } catch (error) {
    throw new Error('Failed to add folder.')
  }
})

ipcMain.handle('delete-folder', async (_event, folderId) => {
  try {
    await deleteFolder(folderId)
  } catch (error) {
    throw new Error('Failed to delete folder.')
  }
})

ipcMain.handle('update-folder-name', async (_event, folderId: number, newName: string) => {
  try {
    await updateFolderName(folderId, newName)
  } catch (error) {
    throw new Error('Failed to update folder name.')
  }
})
