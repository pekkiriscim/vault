import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator
} from '@renderer/components/context-menu'

import useVaultStore from '@renderer/stores/VaultStore'
import useImagesStore from '@renderer/stores/ImagesStore'

const ImageCard = ({ image }: { image: Image }): JSX.Element => {
  const { path } = useVaultStore()
  const { deleteImage } = useImagesStore()

  const pathSeparator = window.api.pathSeparator

  const imagePath =
    'vault:' +
    pathSeparator +
    pathSeparator +
    path +
    pathSeparator +
    'images' +
    pathSeparator +
    image.fileName

  const handleDeleteImage = (): void => {
    deleteImage(image.id)
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <img src={imagePath} className="w-full min-h-40 max-h-40 h-full rounded-xl object-cover" />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>open</ContextMenuItem>
        <ContextMenuItem>copy image</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleDeleteImage}>delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default ImageCard
