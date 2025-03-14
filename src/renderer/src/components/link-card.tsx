import { useState, useEffect } from 'react'

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

  const handleDeleteLink = (): void => {
    deleteLink(link.id)
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (e.key === 'Enter') {
      await updateLinkTitle(link.id, newLinkTitle)

      setIsEditingLink(false)
    } else if (e.key === 'Escape') {
      setNewLinkTitle(link.title)

      setIsEditingLink(false)
    }
  }

  const handleOpenLink = (): void => {
    window.open(link.url, '_blank')
  }

  const handleCopyUrl = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(link.url)
    } catch (error) {
      console.error('Failed to copy URL.')
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Link
          to={link.url}
          target="_blank"
          draggable="false"
          className="w-full px-3 py-2 rounded-md flex items-center justify-between cursor-default hover:bg-zinc-50 group"
        >
          <div className="w-full flex items-center justify-start gap-x-2">
            <ImageWithFallback
              src={link.iconUrl}
              className="size-5 rounded"
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
                      {link.title}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent collisionPadding={12}>{link.title}</TooltipContent>
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
        <ContextMenuItem onClick={() => updateLinkPin(link.id, !link.isPinned)}>
          {link.isPinned ? 'unpin link' : 'pin link'}
        </ContextMenuItem>
        <ContextMenuItem onClick={() => setIsEditingLink(true)}>rename link</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>move to folder</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ScrollArea className="max-h-64 flex flex-col">
              {folders.map((folder) => (
                <ContextMenuItem
                  key={folder.id}
                  onClick={async () =>
                    await updateLinkFolder(link.id, folder.id === link.folderId ? null : folder.id)
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
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleDeleteLink}>delete link</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default LinkCard
