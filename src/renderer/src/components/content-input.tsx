import { Image } from 'lucide-react'

import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, Extension, useEditor } from '@tiptap/react'

import { Button } from '@renderer/components/button'

import useImagesStore from '@renderer/stores/ImagesStore'
import useContentInputStore from '@renderer/stores/ContentInputStore'

const ContentInput = (): JSX.Element => {
  const { addImage } = useImagesStore()
  const { contentHTML, contentText, setContent, handleAddContent } = useContentInputStore()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Add a link, text, or image...' }),
      Extension.create({
        addKeyboardShortcuts: () => ({
          Enter: ({ editor }): true => {
            handleAddContent(editor)

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
      })
    ],
    content: contentHTML,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML(), editor.getText())
    },
    editorProps: {
      attributes: {
        class: 'px-3 py-2 text-sm text-zinc-900 outline-none prose prose-sm max-w-none prose-zinc'
      }
    }
  })

  return (
    <div className="w-full max-w-3xl relative mx-auto px-6 pt-10">
      <EditorContent editor={editor} />
      {!contentText && (
        <Button
          variant="tertiary"
          size="icon"
          className="absolute right-9 top-11"
          onClick={addImage}
        >
          <Image className="size-5 text-zinc-600" />
        </Button>
      )}
    </div>
  )
}

export default ContentInput
