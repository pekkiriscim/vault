import { Search } from 'lucide-react'

import { Input } from '@renderer/components/input'

const SearchInput = (): JSX.Element => {
  return (
    <div className="relative">
      <Search className="size-4 text-zinc-500 absolute top-2.5 left-3" />
      <Input placeholder="search" className="h-[2.25rem] px-3 py-2 pl-9" />
    </div>
  )
}

export default SearchInput
