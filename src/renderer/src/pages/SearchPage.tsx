import { useMemo, memo } from 'react'

import LinkCard from '@renderer/components/link-card'
import NoteCard from '@renderer/components/note-card'

import useSearchStore from '@renderer/stores/SearchStore'

import groupItemsByType from '@renderer/utils/groupItemsByType'

const SearchPage = (): JSX.Element => {
  const { results } = useSearchStore()

  const groupedResults = useMemo(() => groupItemsByType(results), [results])

  return (
    <div className="w-full h-full max-w-3xl mx-auto pb-10 pt-8 flex flex-col gap-y-1">
      {groupedResults.map((group, groupIndex) => {
        const firstItem = group[0]

        if ('url' in firstItem) {
          return (
            <div
              key={`link-group-${groupIndex}`}
              className="w-full h-full px-6 flex flex-col items-center gap-y-1"
            >
              {group.map((item) => (
                <LinkCard key={`link-${item.id}`} link={item as Link} />
              ))}
            </div>
          )
        } else if ('content' in firstItem) {
          return (
            <div
              key={`note-group-${groupIndex}`}
              className="w-full h-full px-6 flex flex-col gap-y-1"
            >
              {group.map((item) => (
                <NoteCard key={`note-${item.id}`} note={item as Note} />
              ))}
            </div>
          )
        } else {
          return null
        }
      })}
    </div>
  )
}

export default memo(SearchPage)
