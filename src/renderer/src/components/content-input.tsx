import 'highlight.js/styles/github.css'

import { toast } from 'sonner'

import { Image } from 'lucide-react'

import { useParams } from 'react-router-dom'

import { common, createLowlight } from 'lowlight'

import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { EditorContent, Extension, useEditor, Editor } from '@tiptap/react'

import { Button } from '@renderer/components/button'

import useImagesStore from '@renderer/stores/ImagesStore'
import useContentInputStore from '@renderer/stores/ContentInputStore'

const lowlight = createLowlight(common)

const ContentInput = (): JSX.Element => {
  const { folderId } = useParams<{ folderId: string }>()

  const { addImage, addImageFromClipboard } = useImagesStore()
  const { contentHTML, contentText, setContent, handleAddContent } = useContentInputStore()

  const handlePaste = async (event: ClipboardEvent): Promise<void> => {
    try {
      const items = event.clipboardData?.items

      if (!items) return

      for (const item of items) {
        if (item.type.startsWith('image/')) {
          event.preventDefault()

          await addImageFromClipboard(folderId ? parseInt(folderId) : undefined)

          toast.success('Image added successfully')

          return
        }
      }
    } catch (error) {
      toast.error('Unable to add image from clipboard')
    }
  }

  const handleAddImage = async (): Promise<void> => {
    try {
      await addImage(folderId ? parseInt(folderId) : undefined)

      toast.success('Image added successfully')
    } catch (error) {
      toast.error('Unable to add image')
    }
  }

  const handleEnterPress = async (editor: Editor): Promise<boolean> => {
    try {
      const content = editor.getText().trim()

      if (!content || content.length === 0) {
        toast.error('Please enter some content')

        return true
      }

      await handleAddContent(editor, folderId ? parseInt(folderId) : undefined)

      toast.success('Content added successfully')

      return true
    } catch (error) {
      toast.error('Unable to add content')
      return true
    }
  }

  const editor = useEditor(
    {
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
              handleEnterPress(editor)
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
      content: contentHTML,
      onUpdate: ({ editor }) => {
        setContent(editor.getHTML(), editor.getText())
      },
      editorProps: {
        attributes: {
          class: 'px-3 py-2 outline-none prose prose-sm max-w-none prose-zinc'
        },
        handlePaste: (_view, event) => {
          handlePaste(event)

          return false
        }
      }
    },
    [folderId]
  )

  return (
    <div className="w-full max-w-3xl relative mx-auto px-6 pt-10">
      <EditorContent editor={editor} />
      {!contentText && (
        <Button
          variant="tertiary"
          size="icon"
          className="absolute right-9 top-11"
          onClick={handleAddImage}
        >
          <Image className="size-5 text-zinc-600" />
        </Button>
      )}
    </div>
  )
}

export default ContentInput
