import databaseManager from '@main/database/DatabaseManager'

const getFolders = async (): Promise<Folder[]> => {
  try {
    const { Folder } = databaseManager.models

    if (!Folder) {
      throw new Error('Folder model is not initialized.')
    }

    const folders = await Folder.findAll({ raw: true, order: [['createdAt', 'DESC']] })

    return folders
  } catch (error) {
    throw new Error('Failed to fetch folders.')
  }
}

export default getFolders
