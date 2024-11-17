import databaseManager from '@main/database/DatabaseManager'

const updateNoteContent = async (noteId: number, newContent: string): Promise<void> => {
  try {
    const { Note } = databaseManager.models

    if (!Note) {
      throw new Error('Note model is not initialized.')
    }

    await Note.update(
      { content: newContent, updatedAt: Date.now() },
      {
        where: {
          id: noteId
        }
      }
    )
  } catch (error) {
    throw new Error('Failed to update note content.')
  }
}

export default updateNoteContent
