import { Check } from 'lucide-react'

import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, Extension, useEditor } from '@tiptap/react'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent
} from '@renderer/components/context-menu'
import { ScrollArea } from '@renderer/components/scroll-area'

import useNotesStore from '@renderer/stores/NotesStore'
import useFoldersStore from '@renderer/stores/FoldersStore'

const NoteCard = ({ note }: { note: Note }): JSX.Element => {
  const { folders } = useFoldersStore()
  const { deleteNote, updateNoteFolder } = useNotesStore()

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
        <ContextMenuSub>
          <ContextMenuSubTrigger>move</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ScrollArea className="max-h-64 flex flex-col">
              {folders.map((folder) => (
                <ContextMenuItem
                  key={folder.id}
                  onClick={async () =>
                    await updateNoteFolder(note.id, folder.id === note.folderId ? null : folder.id)
                  }
                >
                  {folder.name}
                  {folder.id === note.folderId && (
                    <Check className="size-4 ml-auto text-zinc-500" />
                  )}
                </ContextMenuItem>
              ))}
            </ScrollArea>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleDeleteNote}>delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default NoteCard
