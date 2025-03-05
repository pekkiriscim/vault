import 'highlight.js/styles/github.css'

import { useState, useEffect } from 'react'

import { Check } from 'lucide-react'

import { common, createLowlight } from 'lowlight'

import { useClickAway } from '@uidotdev/usehooks'

import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { EditorContent, Extension, useEditor, Editor } from '@tiptap/react'

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

const lowlight = createLowlight(common)

const NoteCard = ({ note }: { note: Note }): JSX.Element => {
  const { folders } = useFoldersStore()
  const { deleteNote, updateNoteFolder, updateNoteContent } = useNotesStore()

  const [isEditingNote, setIsEditingNote] = useState(false)

  const editorRef = useClickAway<HTMLDivElement>(() => {
    setIsEditingNote(false)
  })

  const handleUpdateNoteContent = async (editor: Editor): Promise<void> => {
    try {
      await updateNoteContent(note.id, editor.getHTML())

      setIsEditingNote(false)
    } catch (error) {
      throw new Error('Failed to update note content.')
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        code: {
          HTMLAttributes: {
            class:
              'px-1 py-0.5 rounded bg-zinc-100 border border-zinc-300 before:content-none after:content-none box-decoration-clone'
          }
        }
      }),
      Placeholder.configure({ placeholder: 'Add a link, text, or image...' }),
      Extension.create({
        addKeyboardShortcuts: () => ({
          Enter: ({ editor }): true => {
            handleUpdateNoteContent(editor)

            return true
          },
          'Shift-Enter': ({ editor }): boolean =>
            editor.commands.first(({ commands }) => [
              (): boolean => commands.newlineInCode(),
              (): boolean => commands.splitListItem('listItem'),
              (): boolean => commands.createParagraphNear(),
              (): boolean => commands.liftEmptyBlock(),
              (): boolean => commands.splitBlock()
            ])
        })
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: { class: 'hljs rounded-lg border border-zinc-200' }
      }),
      Highlight.configure({
        HTMLAttributes: { class: 'px-1 py-0.5 rounded bg-yellow-100 box-decoration-clone' }
      })
    ],
    content: note.content,
    editorProps: {
      attributes: {
        class: 'px-3 py-6 outline-none prose prose-sm max-w-none prose-zinc'
      }
    },
    editable: isEditingNote
  })

  useEffect(() => {
    if (!isEditingNote) {
      editor?.commands.setContent(note.content)
    }
  }, [isEditingNote, note.content, editor])

  const handleDeleteNote = (): void => {
    deleteNote(note.id)
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>): Promise<void> => {
    if (e.key === 'Escape') {
      editor?.commands.setContent(note.content)

      setIsEditingNote(false)
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <EditorContent ref={editorRef} editor={editor} onKeyDown={handleKeyDown} />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>copy</ContextMenuItem>
        <ContextMenuItem onClick={() => setIsEditingNote(true)}>edit</ContextMenuItem>
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
