import { useState, useEffect } from 'react'

import { toast } from 'sonner'

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

  const inputRef = useClickAway<HTMLInputElement>(() => {
    setIsEditingFolder(false)
    setNewFolderName(folder.name)
  })

  useEffect(() => {
    if (isEditingFolder && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.select()
      }, 100)
    }
  }, [isEditingFolder])

  const handleDeleteFolder = async (): Promise<void> => {
    try {
      await deleteFolder(folder.id)

      navigate('/all-items')

      toast.success('Folder deleted successfully')
    } catch (error) {
      toast.error('Unable to delete folder')
    }
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (e.key === 'Enter') {
      try {
        if (!newFolderName || newFolderName.trim().length === 0) {
          toast.error('Please enter a folder name')
          return
        }

        if (newFolderName.trim() === folder.name) {
          setIsEditingFolder(false)
          return
        }

        if (newFolderName.trim().length > 50) {
          toast.error('Folder name must be less than 50 characters')
          return
        }

        await updateFolderName(folder.id, newFolderName.trim())

        setIsEditingFolder(false)

        toast.success('Folder renamed successfully')
      } catch (error) {
        toast.error('Unable to rename folder')

        setNewFolderName(folder.name)
        setIsEditingFolder(false)
      }
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
          draggable="false"
          className={({ isActive }) =>
            cn(
              'w-full flex items-center justify-between px-2 py-1 rounded cursor-default select-none',
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
