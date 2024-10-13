import { useEffect, useMemo, memo } from 'react'

import LinkCard from '@renderer/components/link-card'
import NoteCard from '@renderer/components/note-card'
import ImageCard from '@renderer/components/image-card'

import useLinksStore from '@renderer/stores/LinksStore'
import useNotesStore from '@renderer/stores/NotesStore'
import useImagesStore from '@renderer/stores/ImagesStore'
import useAllItemsStore from '@renderer/stores/AllItemsStore'

const AllItemsPage = (): JSX.Element => {
  const { getLinks } = useLinksStore()
  const { getNotes } = useNotesStore()
  const { getImages } = useImagesStore()
  const { allItems, updateAllItems } = useAllItemsStore()

  useEffect(() => {
    const fetchAllItems = async (): Promise<void> => {
      await Promise.all([getLinks(), getNotes(), getImages()])

      updateAllItems()
    }

    fetchAllItems()

    const unsubscribeLinks = useLinksStore.subscribe(updateAllItems)
    const unsubscribeNotes = useNotesStore.subscribe(updateAllItems)
    const unsubscribeImages = useImagesStore.subscribe(updateAllItems)

    return (): void => {
      unsubscribeLinks()
      unsubscribeNotes()
      unsubscribeImages()
    }
  }, [])

  const groupedItems = useMemo(() => allItems, [allItems])

  return (
    <div className="w-full h-full max-w-3xl mx-auto pb-10 pt-8 flex flex-col gap-y-1">
      {groupedItems.map((group, groupIndex) => {
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
              className="w-full h-full px-9 grid grid-cols-3 gap-3"
            >
              {group.map((item) => (
                <ImageCard key={`image-${item.id}`} image={item as Image} />
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

export default memo(AllItemsPage)
