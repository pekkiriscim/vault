import { useEffect } from 'react'

import { Search } from 'lucide-react'

import { useDebounce } from '@uidotdev/usehooks'

import { Input } from '@renderer/components/input'

import useSearchStore from '@renderer/stores/SearchStore'

const SearchInput = (): JSX.Element => {
  const { query, handleQueryChange, search } = useSearchStore()

  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    search()
  }, [debouncedQuery])

  return (
    <div className="relative">
      <Search className="size-4 text-zinc-500 absolute top-2.5 left-3" />
      <Input
        value={query}
        placeholder="search"
        spellCheck="false"
        className="h-[2.25rem] px-3 py-2 pl-9"
        onChange={handleQueryChange}
      />
    </div>
  )
}

export default SearchInput
