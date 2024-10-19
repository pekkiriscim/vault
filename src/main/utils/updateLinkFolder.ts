import databaseManager from '@main/database/DatabaseManager'

const updateLinkFolder = async (linkId: number, folderId: number | null): Promise<void> => {
  try {
    const { Link } = databaseManager.models

    if (!Link) {
      throw new Error('Link model is not initialized.')
    }

    await Link.update(
      { folderId: folderId },
      {
        where: {
          id: linkId
        }
      }
    )
  } catch (error) {
    throw new Error('Failed to update link folder.')
  }
}

export default updateLinkFolder
