import { useEffect, memo } from 'react'

import ImageCard from '@renderer/components/image-card'

import useImagesStore from '@renderer/stores/ImagesStore'

const ImagesPage = (): JSX.Element => {
  const { images, getImages } = useImagesStore()

  useEffect(() => {
    getImages()
  }, [])

  return (
    <div className="w-full h-full max-w-3xl mx-auto px-9 pb-10 pt-8 grid grid-cols-3 gap-3">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  )
}

export default memo(ImagesPage)
