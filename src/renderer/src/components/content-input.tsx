import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'

import { Image } from 'lucide-react'

import { Button } from '@renderer/components/button'

const ContentInput = (): JSX.Element => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Add a link, text, or image...' })
    ],
    editorProps: { attributes: { class: 'px-3 py-2 text-sm text-zinc-900 outline-none' } }
  })

  return (
    <div className="w-full max-w-3xl relative mx-auto px-6 pt-10">
      <EditorContent editor={editor} />
      <Button variant="tertiary" size="icon" className="absolute right-9 top-11">
        <Image className="size-5 text-zinc-600" />
      </Button>
    </div>
  )
}

export default ContentInput
