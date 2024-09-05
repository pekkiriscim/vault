import { useEffect } from 'react'

import NoteCard from '@renderer/components/note-card'

import useNotesStore from '@renderer/stores/NotesStore'

const NotesPage = (): JSX.Element => {
  const { notes, getNotes } = useNotesStore()

  useEffect(() => {
    getNotes()
  }, [])

  return (
    <div className="w-full h-full max-w-3xl mx-auto px-6 pb-10 pt-8 flex flex-col gap-y-1">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  )
}

export default NotesPage
