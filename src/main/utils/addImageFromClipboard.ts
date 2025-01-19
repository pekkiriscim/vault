import fs from 'fs'
import path from 'path'

import { clipboard } from 'electron'

import databaseManager from '@main/database/DatabaseManager'

const addImageFromClipboard = async (vaultPath: string, folderId: number): Promise<Image> => {
  try {
    const { Image } = databaseManager.models

    if (!Image) {
      throw new Error('Image model is not initialized.')
    }

    const image = clipboard.readImage()

    if (image.isEmpty()) {
      throw new Error('No image in clipboard.')
    }

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

    const imageFileName = `${formattedDate}.png`
    const imageDestinationPath = path.join(imagesFolderPath, imageFileName)

    fs.writeFileSync(imageDestinationPath, image.toPNG())

    const newImage = await Image.create({
      fileName: imageFileName,
      folderId,
      createdAt: currentDate.getTime()
    })

    return newImage
  } catch (error) {
    throw new Error('Failed to add image from clipboard.')
  }
}

export default addImageFromClipboard
