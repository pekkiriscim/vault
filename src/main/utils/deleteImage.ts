import fs from 'fs'
import path from 'path'

import databaseManager from '@main/database/DatabaseManager'

const deleteImage = async (vaultPath: string, imageId: number): Promise<void> => {
  try {
    const { Image } = databaseManager.models

    if (!Image) {
      throw new Error('Image model is not initialized.')
    }

    const image = await Image.findByPk(imageId)

    if (!image) {
      throw new Error('Image not found in the database.')
    }

    const imagesFolderPath = path.join(vaultPath, 'images')
    const imageFilePath = path.join(imagesFolderPath, image.fileName)

    await fs.promises.unlink(imageFilePath)

    await image.destroy()
  } catch (error) {
    throw new Error('Failed to delete image.')
  }
}

export default deleteImage
