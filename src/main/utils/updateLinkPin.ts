import databaseManager from '@main/database/DatabaseManager'

const updateLinkPin = async (linkId: number, isPinned: boolean): Promise<void> => {
  try {
    const { Link } = databaseManager.models

    if (!Link) {
      throw new Error('Link model is not initialized.')
    }

    await Link.update(
      { isPinned: isPinned, updatedAt: Date.now() },
      {
        where: {
          id: linkId
        }
      }
    )
  } catch (error) {
    throw new Error('Failed to update link pin status.')
  }
}

export default updateLinkPin
