import { useState, useEffect } from 'react'

import { Globe } from 'lucide-react'

import { Link } from 'react-router-dom'

import { useClickAway } from '@uidotdev/usehooks'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator
} from '@renderer/components/context-menu'
import { Input } from '@renderer/components/input'
import ImageWithFallback from '@renderer/components/image-with-fallback'

import useLinksStore from '@renderer/stores/LinksStore'

const LinkSidebarItem = ({ link }: { link: Link }): JSX.Element => {
  const { deleteLink, updateLinkTitle, updateLinkPin } = useLinksStore()

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
          className="w-full flex items-center justify-start px-2 py-1 rounded cursor-default gap-x-2"
        >
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
              className="max-w-32 h-auto rounded-none border-0 bg-transparent p-0 text-sm font-medium text-zinc-700"
              onKeyDown={handleKeyDown}
              onClick={(e) => e.preventDefault()}
              onChange={(e) => setNewLinkTitle(e.target.value)}
            />
          ) : (
            <p className="max-w-32 text-sm font-medium text-zinc-700 whitespace-nowrap overflow-hidden text-ellipsis">
              {link.title}
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
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleDeleteLink}>delete link</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default LinkSidebarItem
