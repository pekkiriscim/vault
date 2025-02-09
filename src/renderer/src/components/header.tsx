import { Link } from 'react-router-dom'
import { Ellipsis, PanelRightOpen, PanelRightClose } from 'lucide-react'

import { Button } from '@renderer/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@renderer/components/dropdown-menu'

import useVaultStore from '@renderer/stores/VaultStore'
import useLinksStore from '@renderer/stores/LinksStore'
import useSidebarStore from '@renderer/stores/SidebarStore'

import cn from '@renderer/utils/cn'

const Header = (): JSX.Element => {
  const { name } = useVaultStore()
  const { importBookmarks } = useLinksStore()
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore()

  return (
    <header
      className={cn(
        'w-full flex items-center justify-between px-2.5 py-3',
        !isSidebarOpen && 'pl-[6.375rem]'
      )}
    >
      <div className="flex items-center gap-x-2">
        <Button variant="tertiary" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? (
            <PanelRightOpen className="size-5 text-zinc-600" />
          ) : (
            <PanelRightClose className="size-5 text-zinc-600" />
          )}
        </Button>
        <Button variant="tertiary" asChild>
          <Link to="/">{name}</Link>
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="tertiary" size="icon">
            <Ellipsis className="size-5 text-zinc-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={importBookmarks}>import bookmarks</DropdownMenuItem>
          <DropdownMenuItem>export</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default Header
