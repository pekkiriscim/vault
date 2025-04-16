import fs from 'fs'
import path from 'path'

import databaseManager from '@main/database/DatabaseManager'

const addImageFromBase64 = async (base64Data: string, folderId?: number | null): Promise<Image> => {
  try {
    const { Image } = databaseManager.models

    const currentVault = databaseManager.getCurrentVault()

    if (!Image) {
      throw new Error('Image model is not initialized.')
    }

    if (!currentVault) {
      throw new Error('No vault is currently open.')
    }

    const currentDate = new Date()

    const year = currentDate.getFullYear().toString()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDate.getDate().toString().padStart(2, '0')
    const hour = currentDate.getHours().toString().padStart(2, '0')
    const minute = currentDate.getMinutes().toString().padStart(2, '0')
    const second = currentDate.getSeconds().toString().padStart(2, '0')

    const formattedDate = year + month + day + hour + minute + second

    const imagesFolderPath = path.join(currentVault.path, 'images')
    await fs.promises.mkdir(imagesFolderPath, { recursive: true })

    const matches = base64Data.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/)

    if (!matches) {
      throw new Error('Invalid base64 image data')
    }

    const mimeType = matches[1]
    const fileExt = `.${mimeType}`
    const imageData = matches[2]

    const imageFileName = `${formattedDate}${fileExt}`
    const imageDestinationPath = path.join(imagesFolderPath, imageFileName)

    const buffer = Buffer.from(imageData, 'base64')

    await fs.promises.writeFile(imageDestinationPath, new Uint8Array(buffer))

    const newImage = await Image.create({
      fileName: imageFileName,
      folderId: folderId ?? null,
      createdAt: currentDate.getTime()
    })

    return newImage
  } catch (error) {
    throw new Error('Failed to add image from base64 image data.')
  }
}

export default addImageFromBase64
