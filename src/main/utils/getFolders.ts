import { FolderModel } from '@main/models/FolderModel'

import databaseManager from '@main/database/DatabaseManager'

const getFolders = async (): Promise<FolderModel[]> => {
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
