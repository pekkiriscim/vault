import fs from 'fs'
import path from 'path'

import { dialog } from 'electron'

import { ImageModel } from '@main/models/ImageModel'

import databaseManager from '@main/database/DatabaseManager'

const addImage = async (vaultPath: string, folderId: number): Promise<ImageModel> => {
  try {
    const { Image } = databaseManager.models

    if (!Image) {
      throw new Error('Image model is not initialized.')
    }

    const { canceled, filePaths } = await dialog.showOpenDialog({
      filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'] }],
      properties: ['openFile']
    })

    if (canceled || filePaths.length === 0) {
      throw new Error('No image selected.')
    }

    const selectedImagePath = filePaths[0]

    const currentDate = new Date()

    const year = currentDate.getFullYear().toString()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDate.getDate().toString().padStart(2, '0')
    const hour = currentDate.getHours().toString().padStart(2, '0')
    const minute = currentDate.getMinutes().toString().padStart(2, '0')
    const second = currentDate.getSeconds().toString().padStart(2, '0')

    const formattedDate = year + month + day + hour + minute + second

    const imagesFolderPath = path.join(vaultPath, 'images')
    await fs.promises.mkdir(imagesFolderPath, { recursive: true })

    const imageFileName = formattedDate + path.extname(selectedImagePath)
    const imageDestinationPath = path.join(imagesFolderPath, imageFileName)

    await fs.promises.copyFile(selectedImagePath, imageDestinationPath)

    const newImage = await Image.create({
      fileName: imageFileName,
      folderId,
      createdAt: currentDate.getTime()
    })

    return newImage
  } catch (error) {
    throw new Error('Failed to add image.')
  }
}

export default addImage
