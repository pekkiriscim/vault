import databaseManager from '@main/database/DatabaseManager'

const addFolder = async (folderProps: AddFolderProps): Promise<Folder> => {
  try {
    const { Folder } = databaseManager.models

    if (!Folder) {
      throw new Error('Folder model is not initialized.')
    }

    const currentTime = Date.now()

    const newFolder = await Folder.create({
      name: folderProps.name,
      createdAt: folderProps.createdAt || currentTime,
      updatedAt: folderProps.updatedAt || currentTime
    })

    return newFolder
  } catch (error) {
    throw new Error('Failed to add folder.')
  }
}

export default addFolder
