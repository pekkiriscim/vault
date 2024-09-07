import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, Extension, useEditor } from '@tiptap/react'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator
} from '@renderer/components/context-menu'

import useNotesStore from '@renderer/stores/NotesStore'

const NoteCard = ({ note }: { note: Note }): JSX.Element => {
  const { deleteNote } = useNotesStore()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Add a link, text, or image...' }),
      Extension.create({
        addKeyboardShortcuts: () => ({
          Enter: (): true => {
            return true
          }
        })
      })
    ],
    content: note.content,
    editorProps: {
      attributes: {
        class: 'px-3 py-6 text-sm text-zinc-900 outline-none prose prose-sm max-w-none prose-zinc'
      }
    },
    editable: false
  })

  const handleDeleteNote = (): void => {
    deleteNote(note.id)
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <EditorContent editor={editor} />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>copy</ContextMenuItem>
        <ContextMenuItem>edit</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleDeleteNote}>delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default NoteCard
