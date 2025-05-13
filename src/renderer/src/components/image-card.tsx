import { toast } from 'sonner'

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

  const handleDeleteImage = async (): Promise<void> => {
    try {
      await deleteImage(image.id)

      toast.success('Image deleted successfully')
    } catch (error) {
      toast.error('Unable to delete image')
    }
  }

  const handleOpenImage = async (): Promise<void> => {
    try {
      await openImage(image)

      toast.success('Image opened successfully')
    } catch (error) {
      toast.error('Unable to open image')
    }
  }

  const handleCopyImage = async (): Promise<void> => {
    try {
      await copyImage(image)
      toast.success('Image copied to clipboard')
    } catch (error) {
      toast.error('Unable to copy image')
    }
  }

  const handleUpdateImageFolder = async (folderId: number | null): Promise<void> => {
    try {
      await updateImageFolder(image.id, folderId)

      toast.success('Image moved successfully')
    } catch (error) {
      toast.error('Unable to move image')
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
        {folders.length > 0 && (
          <>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger>move to folder</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ScrollArea className="max-h-64 flex flex-col">
                  {folders.map((folder) => (
                    <ContextMenuItem
                      key={folder.id}
                      onClick={() =>
                        handleUpdateImageFolder(folder.id === image.folderId ? null : folder.id)
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
          </>
        )}
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleDeleteImage}>delete image</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default ImageCard
