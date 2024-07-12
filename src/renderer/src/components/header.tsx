import { Ellipsis, PanelRightOpen } from 'lucide-react'

import { Button } from '@renderer/components/button'

const Header = (): JSX.Element => {
  return (
    <header className="w-full flex items-center justify-between p-3">
      <div className="flex items-center gap-x-2">
        <Button variant="tertiary" size="icon">
          <PanelRightOpen className="size-5 text-zinc-600" />
        </Button>
        <Button variant="tertiary">vault name</Button>
      </div>
      <Button variant="tertiary" size="icon">
        <Ellipsis className="size-5 text-zinc-600" />
      </Button>
    </header>
  )
}

export default Header
