import { useEffect } from 'react'

import useVaultStore from '@renderer/stores/VaultStore'
import useImagesStore from '@renderer/stores/ImagesStore'

const ImagesPage = (): JSX.Element => {
  const { path } = useVaultStore()
  const { images, getImages } = useImagesStore()

  useEffect(() => {
    getImages()
  }, [])

  const pathSeparator = window.api.pathSeparator

  return (
    <div className="w-full h-full max-w-3xl mx-auto px-6 pb-10 pt-8 flex flex-col items-center gap-y-1">
      {images.map((image) => {
        const imagePath =
          'vault:' +
          pathSeparator +
          pathSeparator +
          path +
          pathSeparator +
          'images' +
          pathSeparator +
          image.fileName

        return <img key={image.id} src={imagePath} />
      })}
    </div>
  )
}

export default ImagesPage
