import { useMemo, memo } from 'react'

import { Virtuoso } from 'react-virtuoso'

import LinkCard from '@renderer/components/link-card'
import NoteCard from '@renderer/components/note-card'
import EmptyState from '@renderer/components/empty-state'

import useSearchStore from '@renderer/stores/SearchStore'

import groupItemsByType from '@renderer/utils/groupItemsByType'

const SearchPage = ({ scrollParent }: { scrollParent: HTMLDivElement | null }): JSX.Element => {
  const { results } = useSearchStore()

  const groupedResults = useMemo(() => groupItemsByType(results), [results])

  if (results.length === 0) {
    return (
      <div className="w-full h-full max-w-3xl mx-auto pb-10 pt-8 flex items-center justify-center">
        <EmptyState
          text="No results found"
          supportingText="Try searching with different keywords"
        />
      </div>
    )
  }

  return (
    <div className="w-full h-full max-w-3xl mx-auto pb-10 pt-8 flex flex-col gap-y-1">
      <Virtuoso
        data={groupedResults}
        itemContent={(groupIndex, group) => {
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
        }}
        customScrollParent={scrollParent || undefined}
        className="virtualized-all-items-container w-full"
      />
    </div>
  )
}

export default memo(SearchPage)
