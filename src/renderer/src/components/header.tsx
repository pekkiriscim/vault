import { Link } from 'react-router-dom'
import { Ellipsis, PanelRightOpen } from 'lucide-react'

import { Button } from '@renderer/components/button'

import useVaultStore from '@renderer/stores/VaultStore'

const Header = (): JSX.Element => {
  const { name } = useVaultStore()

  return (
    <header className="w-full flex items-center justify-between p-3">
      <div className="flex items-center gap-x-2">
        <Button variant="tertiary" size="icon">
          <PanelRightOpen className="size-5 text-zinc-600" />
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
