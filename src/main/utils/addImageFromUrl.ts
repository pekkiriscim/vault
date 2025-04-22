import fs from 'fs'
import path from 'path'

import databaseManager from '@main/database/DatabaseManager'

const addImageFromUrl = async (url: string, folderId?: number | null): Promise<Image> => {
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

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Failed to fetch image from URL')
    }

    const contentType = response.headers.get('content-type') || ''

    let fileExtension = '.png'

    if (contentType.includes('jpeg') || contentType.includes('jpg')) {
      fileExtension = '.jpg'
    } else if (contentType.includes('png')) {
      fileExtension = '.png'
    } else if (contentType.includes('gif')) {
      fileExtension = '.gif'
    } else if (contentType.includes('webp')) {
      fileExtension = '.webp'
    }

    const imageFileName = `${formattedDate}${fileExtension}`
    const imageDestinationPath = path.join(imagesFolderPath, imageFileName)

    const arrayBuffer = await response.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    await fs.promises.writeFile(imageDestinationPath, buffer)

    const newImage = await Image.create({
      fileName: imageFileName,
      folderId: folderId ?? null,
      createdAt: currentDate.getTime()
    })

    return newImage
  } catch (error) {
    throw new Error('Failed to add image from url.')
  }
}

export default addImageFromUrl
