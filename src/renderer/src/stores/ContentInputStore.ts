import { create } from 'zustand'

import { Editor } from '@tiptap/react'

import isUrl from '@renderer/utils/isUrl'

import useLinksStore from '@renderer/stores/LinksStore'
import useNotesStore from '@renderer/stores/NotesStore'

interface ContentInputState {
  contentHTML: string
  contentText: string
  setContent: (contentHTML: string, contentText: string) => void
  handleAddContent: (editor: Editor) => Promise<void>
}

const useContentInputStore = create<ContentInputState>((set, get) => ({
  contentHTML: '',
  contentText: '',
  setContent: (contentHTML: string, contentText: string): void => set({ contentHTML, contentText }),
  handleAddContent: async (editor): Promise<void> => {
    try {
      if (isUrl(get().contentText)) {
        await useLinksStore.getState().addLink()
      } else {
        await useNotesStore.getState().addNote()
      }

      set({ contentHTML: '', contentText: '' })

      editor.commands.setContent(get().contentHTML)
    } catch (error) {
      throw new Error('Failed to add content.')
    }
  }
}))

export default useContentInputStore
