import { ipcMain } from 'electron'

import addImage from '@main/utils/addImage'
import getImages from '@main/utils/getImages'
import openImage from '@main/utils/openImage'
import copyImage from '@main/utils/copyImage'
import deleteImage from '@main/utils/deleteImage'
import updateImageFolder from '@main/utils/updateImageFolder'
import addImageFromClipboard from '@main/utils/addImageFromClipboard'

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

ipcMain.handle('update-image-folder', async (_event, imageId: number, folderId: number | null) => {
  try {
    await updateImageFolder(imageId, folderId)
  } catch (error) {
    throw new Error('Failed to update image folder.')
  }
})

ipcMain.handle('add-image-from-clipboard', async (_event, vaultPath: string, folderId: number) => {
  try {
    const newImage = await addImageFromClipboard(vaultPath, folderId)

    return newImage
  } catch (error) {
    throw new Error('Failed to add image.')
  }
})

ipcMain.handle('open-image', async (_event, image: Image) => {
  try {
    await openImage(image)
  } catch (error) {
    throw new Error('Failed to open image.')
  }
})

ipcMain.handle('copy-image', async (_event, image: Image) => {
  try {
    await copyImage(image)
  } catch (error) {
    throw new Error('Failed to copy image.')
  }
})
