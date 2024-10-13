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

  const sortedItems = useMemo(() => allItems, [allItems])

  return (
    <div className="w-full h-full max-w-3xl mx-auto px-6 pb-10 pt-8 flex flex-col gap-y-1">
      {sortedItems.map((item) => {
        if ('url' in item) {
          return <LinkCard key={`link-${item.id}`} link={item as Link} />
        } else if ('content' in item) {
          return <NoteCard key={`note-${item.id}`} note={item as Note} />
        } else if ('fileName' in item) {
          return <ImageCard key={`image-${item.id}`} image={item as Image} />
        } else {
          return null
        }
      })}
    </div>
  )
}

export default memo(AllItemsPage)
