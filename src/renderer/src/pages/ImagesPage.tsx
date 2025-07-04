import { useEffect, memo, useMemo } from 'react'

import { Virtuoso } from 'react-virtuoso'

import { useOutletContext } from 'react-router-dom'

import ImageCard from '@renderer/components/image-card'
import EmptyState from '@renderer/components/empty-state'

import useImagesStore from '@renderer/stores/ImagesStore'

import groupImages from '@renderer/utils/groupImages'

const ImagesPage = (): JSX.Element => {
  const { images, getImages } = useImagesStore()

  const scrollParent = useOutletContext<HTMLDivElement | null>()

  useEffect(() => {
    getImages()
  }, [])

  const groupedImages = useMemo(() => groupImages(images, 3), [images])

  if (images.length === 0) {
    return (
      <div className="w-full h-full max-w-3xl mx-auto px-9 pb-10 pt-8 flex items-center justify-center">
        <EmptyState text="No images found" supportingText="Add your first image to get started" />
      </div>
    )
  }

  return (
    <div className="w-full h-full max-w-3xl mx-auto px-9 pb-10 pt-8 flex flex-col">
      <Virtuoso
        data={groupedImages}
        itemContent={(groupIndex, group) => {
          return (
            <div key={`group-${groupIndex}`} className="grid grid-cols-3 gap-x-3">
              {group.map((image) => (
                <ImageCard key={image.id} image={image} />
              ))}
            </div>
          )
        }}
        customScrollParent={scrollParent || undefined}
        className="virtualized-images-container w-full"
      />
    </div>
  )
}

export default memo(ImagesPage)
