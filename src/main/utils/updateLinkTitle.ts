import databaseManager from '@main/database/DatabaseManager'

const updateLinkTitle = async (linkId: number, newTitle: string | null): Promise<void> => {
  try {
    const { Link } = databaseManager.models

    if (!Link) {
      throw new Error('Link model is not initialized.')
    }

    await Link.update(
      { title: newTitle, updatedAt: Date.now() },
      {
        where: {
          id: linkId
        }
      }
    )
  } catch (error) {
    throw new Error('Failed to update link title.')
  }
}

export default updateLinkTitle
