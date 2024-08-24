import { NoteModel } from '@main/models/NoteModel'

import databaseManager from '@main/database/DatabaseManager'

interface NoteData {
  content: string
  folderId?: number | null
  createdAt?: number
  updatedAt?: number
}

const addNote = async (noteData: NoteData): Promise<NoteModel> => {
  try {
    const { Note } = databaseManager.models

    if (!Note) {
      throw new Error('Note model is not initialized.')
    }

    const currentTime = Date.now()

    const newNote = await Note.create({
      content: noteData.content,
      folderId: noteData.folderId ?? null,
      createdAt: noteData.createdAt || currentTime,
      updatedAt: noteData.updatedAt || currentTime
    })

    return newNote
  } catch (error) {
    throw new Error('Failed to add note.')
  }
}

export default addNote
