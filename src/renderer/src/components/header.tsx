import { Link } from 'react-router-dom'
import { Ellipsis, PanelRightOpen, PanelRightClose } from 'lucide-react'

import { Button } from '@renderer/components/button'

import useVaultStore from '@renderer/stores/VaultStore'
import useSidebarStore from '@renderer/stores/SidebarStore'

import cn from '@renderer/utils/cn'

const Header = (): JSX.Element => {
  const { name } = useVaultStore()
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
      <Button variant="tertiary" size="icon">
        <Ellipsis className="size-5 text-zinc-600" />
      </Button>
    </header>
  )
}

export default Header
