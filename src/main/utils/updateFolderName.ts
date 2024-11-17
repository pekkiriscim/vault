import databaseManager from '@main/database/DatabaseManager'

const updateFolderName = async (folderId: number, newName: string): Promise<void> => {
  try {
    const { Folder } = databaseManager.models

    if (!Folder) {
      throw new Error('Folder model is not initialized.')
    }

    await Folder.update(
      { name: newName, updatedAt: Date.now() },
      {
        where: {
          id: folderId
        }
      }
    )
  } catch (error) {
    throw new Error('Failed to update folder name.')
  }
}

export default updateFolderName
