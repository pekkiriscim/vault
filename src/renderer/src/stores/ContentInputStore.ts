import { create } from 'zustand'

import { Editor } from '@tiptap/react'

import isUrl from '@renderer/utils/isUrl'

import useLinksStore from '@renderer/stores/LinksStore'
import useNotesStore from '@renderer/stores/NotesStore'

interface ContentInputState {
  contentHTML: string
  contentText: string
  setContent: (contentHTML: string, contentText: string) => void
  handleAddContent: (editor: Editor, folderId?: number) => Promise<void>
}

const useContentInputStore = create<ContentInputState>((set, get) => ({
  contentHTML: '',
  contentText: '',
  setContent: (contentHTML: string, contentText: string): void => set({ contentHTML, contentText }),
  handleAddContent: async (editor: Editor, folderId?: number): Promise<void> => {
    const contentText = get().contentText.trim()

    if (!contentText) return

    try {
      if (isUrl(contentText)) {
        await useLinksStore.getState().addLink(folderId)
      } else {
        await useNotesStore.getState().addNote(folderId)
      }

      editor.commands.setContent('')

      set({ contentHTML: '', contentText: '' })
    } catch (error) {
      throw new Error('Failed to add content.')
    }
  }
}))

export default useContentInputStore
