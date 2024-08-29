import { NoteModel } from '@main/models/NoteModel'

import databaseManager from '@main/database/DatabaseManager'

const getNotes = async (): Promise<NoteModel[]> => {
  try {
    const { Note } = databaseManager.models

    if (!Note) {
      throw new Error('Note model is not initialized.')
    }

    const notes = await Note.findAll({ raw: true, order: [['createdAt', 'DESC']] })

    return notes
  } catch (error) {
    throw new Error('Failed to fetch notes.')
  }
}

export default getNotes
