import { ipcMain } from 'electron'

import addImage from '@main/utils/addImage'
import getImages from '@main/utils/getImages'
import deleteImage from '@main/utils/deleteImage'

ipcMain.handle('get-images', async () => {
  try {
    const images = await getImages()

    return images
  } catch (error) {
    throw new Error('Failed to get images.')
  }
})

ipcMain.handle('add-image', async (_event, vaultPath: string, folderId: number) => {
  try {
    const newImage = await addImage(vaultPath, folderId)

    return newImage
  } catch (error) {
    throw new Error('Failed to add image.')
  }
})

ipcMain.handle('delete-image', async (_event, vaultPath: string, imageId: number) => {
  try {
    await deleteImage(vaultPath, imageId)
  } catch (error) {
    throw new Error('Failed to delete image.')
  }
})
