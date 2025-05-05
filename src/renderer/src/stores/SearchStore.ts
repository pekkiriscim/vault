import { create } from 'zustand'

import Fuse from 'fuse.js'

import useLinksStore from '@renderer/stores/LinksStore'
import useNotesStore from '@renderer/stores/NotesStore'

interface SearchState {
  query: string
  results: AllItems[]
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  search: () => void
}

const fuseOptions = {
  keys: ['title', 'content', 'url'],
  threshold: 0.3,
  ignoreLocation: true,
  useExtendedSearch: true,
  findAllMatches: true
}

let fuse = new Fuse<Link | Note>([], fuseOptions)

const useSearchStore = create<SearchState>((set, get) => ({
  query: '',
  results: [],
  handleQueryChange: (e): void => set({ query: e.target.value }),
  search: (): void => {
    const links = useLinksStore.getState().links
    const notes = useNotesStore.getState().notes

    fuse = new Fuse([...links, ...notes], fuseOptions)

    const query = get().query
    const results = fuse.search(query).map((result) => result.item)

    set({ results })
  }
}))

useLinksStore.subscribe(useSearchStore.getState().search)
useNotesStore.subscribe(useSearchStore.getState().search)

export default useSearchStore
