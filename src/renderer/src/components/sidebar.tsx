import { useEffect } from 'react'

import { FolderClosed, Image, Inbox, Link2, Plus, StickyNote } from 'lucide-react'

import { Button } from '@renderer/components/button'
import SearchInput from '@renderer/components/search-input'
import SidebarItem from '@renderer/components/sidebar-item'
import { ScrollArea } from '@renderer/components/scroll-area'
import AddFolderInput from '@renderer/components/add-folder-input'

import useCountStore from '@renderer/stores/CountStore'
import useFoldersStore from '@renderer/stores/FoldersStore'

const Sidebar = (): JSX.Element => {
  const { folders, isAddingFolder, getFolders, setIsAddingFolder } = useFoldersStore()
  const { allItemsCount, linksCount, notesCount, imagesCount, folderItemCounts } = useCountStore()

  useEffect(() => {
    getFolders()
  }, [])

  const sidebarItems = [
    { title: 'all', count: allItemsCount, path: '/all-items', icon: Inbox },
    { title: 'links', count: linksCount, path: '/links', icon: Link2 },
    { title: 'notes', count: notesCount, path: '/notes', icon: StickyNote },
    { title: 'images', count: imagesCount, path: '/images', icon: Image }
  ]

  return (
    <nav className="w-full h-full max-w-[12.5rem] flex flex-col border-r border-zinc-200">
      <div className="w-full h-[3.25rem] min-h-[3.25rem] flex items-center justify-end px-2.5 [-webkit-app-region:drag]">
        <Button
          variant="tertiary"
          size="icon"
          className="[-webkit-app-region:no-drag]"
          onClick={() => setIsAddingFolder(true)}
        >
          <Plus className="size-5 text-zinc-600" />
        </Button>
      </div>
      <div className="w-full flex items-center justify-start px-2.5 pb-5">
        <SearchInput />
      </div>
      <ScrollArea className="w-full h-full flex flex-col items-center justify-start px-2.5">
        <div className="w-full flex flex-col items-center justify-start gap-y-1 pb-5">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              title={item.title}
              count={item.count}
              path={item.path}
              icon={item.icon}
            />
          ))}
        </div>
        <div className="w-full flex flex-col items-center justify-start gap-y-3 pb-2.5">
          <p className="w-full text-start text-xs font-medium text-zinc-500 pl-2">folders</p>
          <div className="w-full flex flex-col items-center justify-start gap-y-1">
            {isAddingFolder && <AddFolderInput />}
            {folders.map((folder) => (
              <SidebarItem
                key={folder.id}
                title={folder.name}
                count={folderItemCounts[folder.id]}
                path={`folders/${folder.id}`}
                icon={FolderClosed}
              />
            ))}
          </div>
        </div>
      </ScrollArea>
    </nav>
  )
}

export default Sidebar
