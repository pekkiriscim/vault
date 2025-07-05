import { useState, useEffect } from 'react'

import { toast } from 'sonner'

import { Link } from 'react-router-dom'

import { Check, Globe } from 'lucide-react'

import { useClickAway } from '@uidotdev/usehooks'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@renderer/components/tooltip'
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
import { Input } from '@renderer/components/input'
import { ScrollArea } from '@renderer/components/scroll-area'
import ImageWithFallback from '@renderer/components/image-with-fallback'

import useLinksStore from '@renderer/stores/LinksStore'
import useFoldersStore from '@renderer/stores/FoldersStore'
import useSidebarStore from '@renderer/stores/SidebarStore'

import cn from '@renderer/utils/cn'
import formatTimestamp from '@renderer/utils/formatTimestamp'

const LinkCard = ({ link }: { link: Link }): JSX.Element => {
  const { folders } = useFoldersStore()
  const { isSidebarOpen } = useSidebarStore()
  const { deleteLink, updateLinkFolder, updateLinkTitle, updateLinkPin } = useLinksStore()

  const [isEditingLink, setIsEditingLink] = useState(false)
  const [newLinkTitle, setNewLinkTitle] = useState(link.title)

  const inputRef = useClickAway<HTMLInputElement>(() => {
    setIsEditingLink(false)
    setNewLinkTitle(link.title)
  })

  useEffect(() => {
    if (isEditingLink && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.select()
      }, 100)
    }
  }, [isEditingLink])

  useEffect(() => {
    setNewLinkTitle(link.title)
  }, [link.title])

  const handleDeleteLink = async (): Promise<void> => {
    try {
      await deleteLink(link.id)

      toast.success('Link deleted successfully')
    } catch (error) {
      toast.error('Unable to delete link')
    }
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (e.key === 'Enter') {
      try {
        if (!newLinkTitle || newLinkTitle.trim().length === 0) {
          toast.error('Please enter a link title')
          return
        }

        if (newLinkTitle.trim() === link.title) {
          setIsEditingLink(false)
          return
        }

        if (newLinkTitle.trim().length > 100) {
          toast.error('Link title must be less than 100 characters')
          return
        }

        await updateLinkTitle(link.id, newLinkTitle.trim())

        setIsEditingLink(false)

        toast.success('Link renamed successfully')
      } catch (error) {
        toast.error('Unable to rename link')

        setNewLinkTitle(link.title)
        setIsEditingLink(false)
      }
    } else if (e.key === 'Escape') {
      setNewLinkTitle(link.title)

      setIsEditingLink(false)
    }
  }

  const handleOpenLink = (): void => {
    try {
      window.open(link.url, '_blank')
    } catch (error) {
      toast.error('Unable to open link')
    }
  }

  const handleCopyUrl = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(link.url)
      toast.success('Link copied to clipboard')
    } catch (error) {
      toast.error('Unable to copy link')
    }
  }

  const handleUpdateLinkPin = async (): Promise<void> => {
    try {
      await updateLinkPin(link.id, !link.isPinned)

      toast.success(link.isPinned ? 'Link unpinned successfully' : 'Link pinned successfully')
    } catch (error) {
      toast.error('Unable to update link pin status')
    }
  }

  const handleUpdateLinkFolder = async (folderId: number | null): Promise<void> => {
    try {
      await updateLinkFolder(link.id, folderId)

      toast.success('Link moved successfully')
    } catch (error) {
      toast.error('Unable to move link')
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Link
          to={link.url}
          target="_blank"
          draggable="false"
          className="w-full px-3 py-2 rounded-md flex items-center justify-between cursor-default hover:bg-zinc-50 group data-[state=open]:bg-zinc-50 select-none"
        >
          <div className="w-full flex items-center justify-start gap-x-2">
            <ImageWithFallback
              src={link.iconUrl}
              className="size-5 rounded select-none"
              fallback={<Globe className="size-5 text-zinc-500 min-w-5 min-h-5" />}
            />
            {isEditingLink ? (
              <Input
                ref={inputRef}
                spellCheck="false"
                placeholder="link title"
                value={newLinkTitle ?? ''}
                className="h-auto rounded-none border-0 bg-transparent p-0 text-sm font-medium text-zinc-900"
                onKeyDown={handleKeyDown}
                onClick={(e) => e.preventDefault()}
                onChange={(e) => setNewLinkTitle(e.target.value)}
              />
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p
                      className={cn(
                        'max-w-[30rem] text-sm font-medium text-zinc-900 whitespace-nowrap overflow-hidden text-ellipsis',
                        isSidebarOpen
                          ? 'max-[960px]:max-w-80 max-md:max-w-64 max-[720px]:max-w-48 max-sm:max-w-32 max-[560px]:max-w-12'
                          : 'max-[720px]:max-w-96 max-sm:max-w-80 max-[560px]:max-w-56'
                      )}
                    >
                      {link.title || link.url}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent
                    collisionPadding={12}
                    className="max-w-[30rem] max-[560px]:max-w-96"
                  >
                    {link.title || link.url}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          {!isEditingLink && (
            <p className="text-sm font-medium text-zinc-500 whitespace-nowrap hidden group-hover:block">
              {link.productPrice
                ? link.productPrice
                : link.readTime
                  ? link.readTime
                  : formatTimestamp(link.createdAt)}
            </p>
          )}
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleOpenLink}>open link</ContextMenuItem>
        <ContextMenuItem onClick={handleCopyUrl}>copy url</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleUpdateLinkPin}>
          {link.isPinned ? 'unpin link' : 'pin link'}
        </ContextMenuItem>
        <ContextMenuItem onClick={() => setIsEditingLink(true)}>rename link</ContextMenuItem>
        {folders.length > 0 && (
          <>
            <ContextMenuSub>
              <ContextMenuSubTrigger>move to folder</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ScrollArea className="max-h-64 flex flex-col">
                  {folders.map((folder) => (
                    <ContextMenuItem
                      key={folder.id}
                      onClick={() =>
                        handleUpdateLinkFolder(folder.id === link.folderId ? null : folder.id)
                      }
                    >
                      {folder.name}
                      {folder.id === link.folderId && (
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
        <ContextMenuItem onClick={handleDeleteLink}>delete link</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default LinkCard
