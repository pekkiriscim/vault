import path from 'path'

import { shell } from 'electron'

import databaseManager from '@main/database/DatabaseManager'

const openImage = async (image: Image): Promise<void> => {
  try {
    const currentVault = databaseManager.getCurrentVault()

    if (!currentVault) {
      throw new Error('No vault is currently open.')
    }

    const imagePath = path.join(currentVault.path, 'images', image.fileName)

    await shell.openPath(imagePath)
  } catch (error) {
    throw new Error('Failed to open image.')
  }
}

export default openImage
