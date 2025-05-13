import 'highlight.js/styles/github.css'

import { useState, useEffect } from 'react'

import { toast } from 'sonner'
import { Check } from 'lucide-react'
import { useClickAway } from '@uidotdev/usehooks'
import { common, createLowlight } from 'lowlight'

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
    if (isEditingNote) {
      editor?.commands.setContent(note.content)

      setIsEditingNote(false)
    }
  })

  const handleUpdateNoteContent = async (editor: Editor): Promise<void> => {
    try {
      const content = editor.getHTML()

      if (!content || content.trim().length === 0) {
        toast.error('Note content cannot be empty')
        return
      }

      if (content.trim() === note.content) {
        setIsEditingNote(false)
        return
      }

      await updateNoteContent(note.id, content.trim())

      setIsEditingNote(false)

      toast.success('Note updated successfully')
    } catch (error) {
      toast.error('Unable to update note')

      editor.commands.setContent(note.content)

      setIsEditingNote(false)
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

  const handleDeleteNote = async (): Promise<void> => {
    try {
      await deleteNote(note.id)

      toast.success('Note deleted successfully')
    } catch (error) {
      toast.error('Unable to delete note')
    }
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>): Promise<void> => {
    if (e.key === 'Escape') {
      editor?.commands.setContent(note.content)

      setIsEditingNote(false)
    }
  }

  const handleCopyNote = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(editor?.getText() || note.content)

      toast.success('Note copied to clipboard')
    } catch (error) {
      toast.error('Unable to copy note')
    }
  }

  const handleUpdateNoteFolder = async (folderId: number | null): Promise<void> => {
    try {
      await updateNoteFolder(note.id, folderId)

      toast.success('Note moved successfully')
    } catch (error) {
      toast.error('Unable to move note')
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <EditorContent ref={editorRef} editor={editor} onKeyDown={handleKeyDown} />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleCopyNote}>copy note</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => setIsEditingNote(true)}>edit note</ContextMenuItem>
        {folders.length > 0 && (
          <>
            <ContextMenuSub>
              <ContextMenuSubTrigger>move to folder</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ScrollArea className="max-h-64 flex flex-col">
                  {folders.map((folder) => (
                    <ContextMenuItem
                      key={folder.id}
                      onClick={() =>
                        handleUpdateNoteFolder(folder.id === note.folderId ? null : folder.id)
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
          </>
        )}
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleDeleteNote}>delete note</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default NoteCard
