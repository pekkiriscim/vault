import databaseManager from '@main/database/DatabaseManager'

const updateImageFolder = async (imageId: number, folderId: number | null): Promise<void> => {
  try {
    const { Image } = databaseManager.models

    if (!Image) {
      throw new Error('Image model is not initialized.')
    }

    await Image.update(
      { folderId: folderId },
      {
        where: {
          id: imageId
        }
      }
    )
  } catch (error) {
    throw new Error('Failed to update image folder.')
  }
}

export default updateImageFolder
