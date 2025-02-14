import { useState, useEffect } from 'react'

import { FolderClosed } from 'lucide-react'

import { NavLink, useNavigate } from 'react-router-dom'

import { useClickAway } from '@uidotdev/usehooks'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator
} from '@renderer/components/context-menu'
import { Input } from '@renderer/components/input'

import useCountStore from '@renderer/stores/CountStore'
import useFoldersStore from '@renderer/stores/FoldersStore'

import cn from '@renderer/utils/cn'

const FolderSidebarItem = ({ folder }: { folder: Folder }): JSX.Element => {
  const navigate = useNavigate()

  const { folderItemCounts } = useCountStore()
  const { deleteFolder, updateFolderName } = useFoldersStore()

  const [isEditingFolder, setIsEditingFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState(folder.name)

  const inputRef = useClickAway<HTMLInputElement>(() => setIsEditingFolder(false))

  useEffect(() => {
    if (isEditingFolder && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.select()
      }, 100)
    }
  }, [isEditingFolder])

  const handleDeleteFolder = (): void => {
    deleteFolder(folder.id)

    navigate('/all-items')
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (e.key === 'Enter') {
      await updateFolderName(folder.id, newFolderName)

      setIsEditingFolder(false)
    } else if (e.key === 'Escape') {
      setNewFolderName(folder.name)

      setIsEditingFolder(false)
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-full">
        <NavLink
          to={`folders/${folder.id}`}
          className={({ isActive }) =>
            cn(
              'w-full flex items-center justify-between px-2 py-1 rounded cursor-default',
              isActive && 'bg-zinc-50 [&>div>p]:text-zinc-800'
            )
          }
        >
          <div className="flex items-center justify-start gap-x-2">
            <FolderClosed className="size-5 text-zinc-500 min-w-5" />
            {isEditingFolder ? (
              <Input
                ref={inputRef}
                spellCheck="false"
                placeholder="folder name"
                value={newFolderName}
                className="max-w-24 h-auto rounded-none border-0 bg-transparent p-0 text-sm font-medium text-zinc-700"
                onKeyDown={handleKeyDown}
                onClick={(e) => e.preventDefault()}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
            ) : (
              <p className="max-w-24 text-sm font-medium text-zinc-700 whitespace-nowrap overflow-hidden text-ellipsis">
                {folder.name}
              </p>
            )}
          </div>
          <p className="text-xs font-medium text-zinc-700">{folderItemCounts[folder.id]}</p>
        </NavLink>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => setIsEditingFolder(true)}>rename folder</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleDeleteFolder}>delete folder</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default FolderSidebarItem
