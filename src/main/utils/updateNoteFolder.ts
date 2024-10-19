import databaseManager from '@main/database/DatabaseManager'

const updateNoteFolder = async (noteId: number, folderId: number | null): Promise<void> => {
  try {
    const { Note } = databaseManager.models

    if (!Note) {
      throw new Error('Note model is not initialized.')
    }

    await Note.update(
      { folderId: folderId },
      {
        where: {
          id: noteId
        }
      }
    )
  } catch (error) {
    throw new Error('Failed to update note folder.')
  }
}

export default updateNoteFolder
