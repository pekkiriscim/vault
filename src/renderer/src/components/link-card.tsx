import { Check } from 'lucide-react'

import { Link } from 'react-router-dom'

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

import useLinksStore from '@renderer/stores/LinksStore'
import useFoldersStore from '@renderer/stores/FoldersStore'

const LinkCard = ({ link }: { link: Link }): JSX.Element => {
  const { folders } = useFoldersStore()
  const { deleteLink, updateLinkFolder } = useLinksStore()

  const handleDeleteLink = (): void => {
    deleteLink(link.id)
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Link
          to={link.url}
          target="_blank"
          className="w-full px-3 py-2 rounded-md flex items-center justify-start gap-x-2 cursor-default hover:bg-zinc-50"
        >
          {link.iconUrl && <img src={link.iconUrl} className="size-5 rounded" />}
          <p className="text-sm font-medium text-zinc-900">{link.title}</p>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>open</ContextMenuItem>
        <ContextMenuItem>copy link</ContextMenuItem>
        <ContextMenuItem>edit</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>move</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            {folders.map((folder) => (
              <ContextMenuItem
                key={folder.id}
                onClick={async () =>
                  await updateLinkFolder(link.id, folder.id === link.folderId ? null : folder.id)
                }
              >
                {folder.name}
                {folder.id === link.folderId && <Check className="size-4 ml-auto text-zinc-500" />}
              </ContextMenuItem>
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleDeleteLink}>delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default LinkCard
