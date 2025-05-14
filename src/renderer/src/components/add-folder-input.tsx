import { useState, useRef, useEffect } from 'react'

import { toast } from 'sonner'

import { FolderClosed } from 'lucide-react'

import { useClickAway } from '@uidotdev/usehooks'

import { Input } from '@renderer/components/input'

import useFoldersStore from '@renderer/stores/FoldersStore'

const AddFolderInput = (): JSX.Element => {
  const { addFolder, setIsAddingFolder } = useFoldersStore()

  const [newFolderName, setNewFolderName] = useState('new folder')

  const ref = useClickAway<HTMLDivElement>(() => {
    setIsAddingFolder(false)
  })

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select()
    }
  }, [])

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (e.key === 'Enter') {
      try {
        if (!newFolderName || newFolderName.trim().length === 0) {
          toast.error('Please enter a folder name')
          return
        }

        if (newFolderName.trim().length > 50) {
          toast.error('Folder name must be less than 50 characters')
          return
        }

        await addFolder({ name: newFolderName.trim() })

        toast.success('Folder created successfully')

        setIsAddingFolder(false)
      } catch (error) {
        toast.error('Unable to create folder')
      }
    } else if (e.key === 'Escape') {
      setIsAddingFolder(false)
    }
  }

  return (
    <div
      ref={ref}
      className="w-full flex items-center justify-start gap-x-2 px-2 py-1 rounded cursor-default"
    >
      <FolderClosed className="size-5 text-zinc-500 min-w-5" />
      <Input
        ref={inputRef}
        value={newFolderName}
        placeholder="folder name"
        className="h-auto rounded-none border-0 bg-transparent p-0 text-sm text-zinc-700 font-medium"
        onChange={(e) => setNewFolderName(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default AddFolderInput
