import { useState, useEffect } from 'react'

import { Check } from 'lucide-react'

import { Link } from 'react-router-dom'

import { useClickAway } from '@uidotdev/usehooks'

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

import useLinksStore from '@renderer/stores/LinksStore'
import useFoldersStore from '@renderer/stores/FoldersStore'

const LinkCard = ({ link }: { link: Link }): JSX.Element => {
  const { folders } = useFoldersStore()
  const { deleteLink, updateLinkFolder, updateLinkTitle } = useLinksStore()

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

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Link
          to={link.url}
          target="_blank"
          draggable="false"
          className="w-full px-3 py-2 rounded-md flex items-center justify-start gap-x-2 cursor-default hover:bg-zinc-50"
        >
          {link.iconUrl && <img src={link.iconUrl} className="size-5 rounded" />}
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
            <p className="text-sm font-medium text-zinc-900">{link.title}</p>
          )}
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>open</ContextMenuItem>
        <ContextMenuItem>copy link</ContextMenuItem>
        <ContextMenuItem onClick={() => setIsEditingLink(true)}>edit</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>move</ContextMenuSubTrigger>
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
        <ContextMenuItem onClick={handleDeleteLink}>delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default LinkCard
