import databaseManager from '@main/database/DatabaseManager'

const deleteLink = async (id: number): Promise<void> => {
  try {
    const { Link } = databaseManager.models

    if (!Link) {
      throw new Error('Link model is not initialized.')
    }

    await Link.destroy({ where: { id } })
  } catch (error) {
    throw new Error('Failed to delete link.')
  }
}

export default deleteLink
