import databaseManager from '@main/database/DatabaseManager'

const deleteNote = async (id: number): Promise<void> => {
  try {
    const { Note } = databaseManager.models

    if (!Note) {
      throw new Error('Note model is not initialized.')
    }

    await Note.destroy({ where: { id } })
  } catch (error) {
    throw new Error('Failed to delete note.')
  }
}

export default deleteNote
