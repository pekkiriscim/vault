import { useEffect, memo } from 'react'

import { Virtuoso } from 'react-virtuoso'

import { useOutletContext } from 'react-router-dom'

import NoteCard from '@renderer/components/note-card'

import useNotesStore from '@renderer/stores/NotesStore'

const NotesPage = (): JSX.Element => {
  const { notes, getNotes } = useNotesStore()

  const scrollParent = useOutletContext<HTMLDivElement | null>()

  useEffect(() => {
    getNotes()
  }, [])

  return (
    <div className="w-full h-full max-w-3xl mx-auto px-6 pb-10 pt-8 flex flex-col">
      <Virtuoso
        data={notes}
        itemContent={(_index, note) => <NoteCard key={note.id} note={note} />}
        customScrollParent={scrollParent || undefined}
        className="virtualized-notes-container w-full"
      />
    </div>
  )
}

export default memo(NotesPage)
