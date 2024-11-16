import databaseManager from '@main/database/DatabaseManager'

const deleteFolder = async (id: number): Promise<void> => {
  try {
    const { Folder, Link, Note, Image } = databaseManager.models

    if (!Folder) {
      throw new Error('Folder model is not initialized.')
    }

    if (!Link || !Note || !Image) {
      throw new Error('Associated models are not initialized.')
    }

    await Promise.all([
      Link.update({ folderId: null }, { where: { folderId: id } }),
      Note.update({ folderId: null }, { where: { folderId: id } }),
      Image.update({ folderId: null }, { where: { folderId: id } })
    ])

    const deletedCount = await Folder.destroy({ where: { id } })

    if (deletedCount === 0) {
      throw new Error('Folder not found or already deleted.')
    }
  } catch (error) {
    throw new Error('Failed to delete folder.')
  }
}

export default deleteFolder
