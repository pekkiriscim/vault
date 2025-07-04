import { useEffect, useMemo, memo } from 'react'

import { Virtuoso } from 'react-virtuoso'

import { useOutletContext } from 'react-router-dom'

import LinkCard from '@renderer/components/link-card'
import NoteCard from '@renderer/components/note-card'
import ImageCard from '@renderer/components/image-card'
import EmptyState from '@renderer/components/empty-state'

import useAllItemsStore from '@renderer/stores/AllItemsStore'

import groupItemsByType from '@renderer/utils/groupItemsByType'

const AllItemsPage = (): JSX.Element => {
  const { allItems, fetchAllItems } = useAllItemsStore()

  const scrollParent = useOutletContext<HTMLDivElement | null>()

  useEffect(() => {
    fetchAllItems()
  }, [])

  const groupedItems = useMemo(() => groupItemsByType(allItems), [allItems])

  if (allItems.length === 0) {
    return (
      <div className="w-full h-full max-w-3xl mx-auto pb-10 pt-8 flex items-center justify-center">
        <EmptyState
          text="No items found"
          supportingText="Add links, notes, or images to get started"
        />
      </div>
    )
  }

  return (
    <div className="w-full h-full max-w-3xl mx-auto pb-10 pt-8 flex flex-col gap-y-1">
      <Virtuoso
        data={groupedItems}
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
          } else if ('fileName' in firstItem) {
            return (
              <div
                key={`image-group-${groupIndex}`}
                className="w-full h-full px-9 py-6 grid grid-cols-3 gap-3"
              >
                {group.map((item) => (
                  <ImageCard key={`image-${item.id}`} image={item as Image} />
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

export default memo(AllItemsPage)
