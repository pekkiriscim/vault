import databaseManager from '@main/database/DatabaseManager'

const addNote = async (noteProps: AddNoteProps): Promise<Note> => {
  try {
    const { Note } = databaseManager.models

    if (!Note) {
      throw new Error('Note model is not initialized.')
    }

    const currentTime = Date.now()

    const newNote = await Note.create({
      content: noteProps.content,
      folderId: noteProps.folderId ?? null,
      createdAt: noteProps.createdAt || currentTime,
      updatedAt: noteProps.updatedAt || currentTime
    })

    return newNote
  } catch (error) {
    throw new Error('Failed to add note.')
  }
}

export default addNote
