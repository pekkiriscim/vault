import 'highlight.js/styles/github.css'

import { Image } from 'lucide-react'

import { useParams } from 'react-router-dom'

import { common, createLowlight } from 'lowlight'

import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, Extension, useEditor } from '@tiptap/react'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

import { Button } from '@renderer/components/button'

import useImagesStore from '@renderer/stores/ImagesStore'
import useContentInputStore from '@renderer/stores/ContentInputStore'

const lowlight = createLowlight(common)

const ContentInput = (): JSX.Element => {
  const { folderId } = useParams<{ folderId: string }>()

  const { addImage, addImageFromClipboard } = useImagesStore()
  const { contentHTML, contentText, setContent, handleAddContent } = useContentInputStore()

  const handlePaste = async (event: ClipboardEvent): Promise<void> => {
    const items = event.clipboardData?.items

    if (!items) return

    for (const item of items) {
      if (item.type.startsWith('image/')) {
        event.preventDefault()

        await addImageFromClipboard(folderId ? parseInt(folderId) : undefined)

        return
      }
    }
  }

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Placeholder.configure({ placeholder: 'Add a link, text, or image...' }),
        Extension.create({
          addKeyboardShortcuts: () => ({
            Enter: ({ editor }): true => {
              handleAddContent(editor, folderId ? parseInt(folderId) : undefined)

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
        })
      ],
      content: contentHTML,
      onUpdate: ({ editor }) => {
        setContent(editor.getHTML(), editor.getText())
      },
      editorProps: {
        attributes: {
          class: 'px-3 py-2 text-sm text-zinc-900 outline-none prose prose-sm max-w-none prose-zinc'
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
          onClick={() => addImage(folderId ? parseInt(folderId) : undefined)}
        >
          <Image className="size-5 text-zinc-600" />
        </Button>
      )}
    </div>
  )
}

export default ContentInput
