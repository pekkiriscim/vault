import { Check } from 'lucide-react'

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
import { ScrollArea } from '@renderer/components/scroll-area'

import useVaultStore from '@renderer/stores/VaultStore'
import useImagesStore from '@renderer/stores/ImagesStore'
import useFoldersStore from '@renderer/stores/FoldersStore'

const ImageCard = ({ image }: { image: Image }): JSX.Element => {
  const { path } = useVaultStore()
  const { folders } = useFoldersStore()
  const { deleteImage, updateImageFolder, openImage, copyImage } = useImagesStore()

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

  const handleOpenImage = async (): Promise<void> => {
    try {
      await openImage(image)
    } catch (error) {
      console.error('Failed to open image:', error)
    }
  }

  const handleCopyImage = async (): Promise<void> => {
    try {
      await copyImage(image)
    } catch (error) {
      console.error('Failed to copy image:', error)
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <img src={imagePath} className="w-full min-h-40 max-h-40 h-full rounded-xl object-cover" />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleOpenImage}>open image</ContextMenuItem>
        <ContextMenuItem onClick={handleCopyImage}>copy image</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>move to folder</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ScrollArea className="max-h-64 flex flex-col">
              {folders.map((folder) => (
                <ContextMenuItem
                  key={folder.id}
                  onClick={async () =>
                    await updateImageFolder(
                      image.id,
                      folder.id === image.folderId ? null : folder.id
                    )
                  }
                >
                  {folder.name}
                  {folder.id === image.folderId && (
                    <Check className="size-4 ml-auto text-zinc-500" />
                  )}
                </ContextMenuItem>
              ))}
            </ScrollArea>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleDeleteImage}>delete image</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default ImageCard
