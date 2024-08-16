import { Image, Inbox, Link2, Plus, StickyNote } from 'lucide-react'

import { Button } from '@renderer/components/button'
import SearchInput from '@renderer/components/search-input'
import SidebarItem from '@renderer/components/sidebar-item'

const sidebarItems = [
  { title: 'all', count: 0, path: '/all-items', icon: Inbox },
  { title: 'links', count: 0, path: '/links', icon: Link2 },
  { title: 'notes', count: 0, path: '/notes', icon: StickyNote },
  { title: 'images', count: 0, path: '/images', icon: Image }
]

const Sidebar = (): JSX.Element => {
  return (
    <nav className="max-w-[12.5rem] w-full h-full border-r border-zinc-200">
      <div className="w-full h-[3.25rem] flex items-center justify-end px-2.5 [-webkit-app-region:drag]">
        <Button variant="tertiary" size="icon">
          <Plus className="size-5 text-zinc-600" />
        </Button>
      </div>
      <div className="w-full flex flex-col items-center justify-start px-2.5 gap-y-5">
        <SearchInput />
        <div className="w-full flex flex-col items-center justify-start gap-y-1">
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
      </div>
    </nav>
  )
}

export default Sidebar
