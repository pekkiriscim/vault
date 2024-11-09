import databaseManager from '@main/database/DatabaseManager'

const getImages = async (): Promise<Image[]> => {
  try {
    const { Image } = databaseManager.models

    if (!Image) {
      throw new Error('Image model is not initialized.')
    }

    const images = await Image.findAll({ raw: true, order: [['createdAt', 'DESC']] })

    return images
  } catch (error) {
    throw new Error('Failed to fetch images.')
  }
}

export default getImages
