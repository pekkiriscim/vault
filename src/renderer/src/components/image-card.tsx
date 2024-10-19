import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent
} from '@renderer/components/context-menu'

import useVaultStore from '@renderer/stores/VaultStore'
import useImagesStore from '@renderer/stores/ImagesStore'
import useFoldersStore from '@renderer/stores/FoldersStore'

const ImageCard = ({ image }: { image: Image }): JSX.Element => {
  const { path } = useVaultStore()
  const { folders } = useFoldersStore()
  const { deleteImage, updateImageFolder } = useImagesStore()

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
        <ContextMenuSub>
          <ContextMenuSubTrigger>move</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            {folders.map((folder) => (
              <ContextMenuItem
                key={folder.id}
                onClick={async () => await updateImageFolder(image.id, folder.id)}
              >
                {folder.name}
              </ContextMenuItem>
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleDeleteImage}>delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default ImageCard
