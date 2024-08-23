import { create } from 'zustand'

interface ContentInputState {
  contentHTML: string
  contentText: string
  setContent: (contentHTML: string, contentText: string) => void
}

const useContentInputStore = create<ContentInputState>((set) => ({
  contentHTML: '',
  contentText: '',
  setContent: (contentHTML: string, contentText: string): void => set({ contentHTML, contentText })
}))

export default useContentInputStore
