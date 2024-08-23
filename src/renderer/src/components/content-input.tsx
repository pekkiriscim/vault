import { Image } from 'lucide-react'

import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'

import { Button } from '@renderer/components/button'

import useContentInputStore from '@renderer/stores/ContentInputStore'

const ContentInput = (): JSX.Element => {
  const { contentHTML, contentText, setContent } = useContentInputStore()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Add a link, text, or image...' })
    ],
    content: contentHTML,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML(), editor.getText())
    },
    editorProps: { attributes: { class: 'px-3 py-2 text-sm text-zinc-900 outline-none' } }
  })

  return (
    <div className="w-full max-w-3xl relative mx-auto px-6 pt-10">
      <EditorContent editor={editor} />
      {!contentText && (
        <Button variant="tertiary" size="icon" className="absolute right-9 top-11">
          <Image className="size-5 text-zinc-600" />
        </Button>
      )}
    </div>
  )
}

export default ContentInput
