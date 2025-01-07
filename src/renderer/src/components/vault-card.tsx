import { Vault, Ellipsis } from 'lucide-react'

import { Button } from '@renderer/components/button'

const VaultCard = ({ vault }: { vault: Vault }): JSX.Element => {
  return (
    <div className="flex items-center justify-between p-3 border border-zinc-200 rounded-md">
      <div className="flex items-center gap-x-2">
        <Vault className="size-6 text-zinc-700" />
        <p className="text-xs font-medium text-zinc-900">{vault.name}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <Button size="icon" variant="tertiary">
          <Ellipsis className="size-5 text-zinc-600" />
        </Button>
        <Button variant="secondary">open</Button>
      </div>
    </div>
  )
}

export default VaultCard
