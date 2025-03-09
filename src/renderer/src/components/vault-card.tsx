import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Vault, Ellipsis } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@renderer/components/dropdown-menu'
import { Button } from '@renderer/components/button'

import useVaultStore from '@renderer/stores/VaultStore'

const VaultCard = ({ vault }: { vault: Vault }): JSX.Element => {
  const navigate = useNavigate()

  const { setVaultStore } = useVaultStore()

  const handleOpenVault = async (): Promise<void> => {
    try {
      const openedVault: Vault = await window.electron.ipcRenderer.invoke('open-vault', vault.path)

      setVaultStore(openedVault.name, openedVault.path, openedVault.createdAt)

      navigate('/all-items')

      toast.success('Vault opened successfully.')
    } catch (error) {
      toast.error('Failed to open the vault.')
    }
  }

  const handleShowVaultLocation = async (): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('show-vault-location', vault.path)
    } catch (error) {
      toast.error('Failed to show vault location.')
    }
  }

  return (
    <div className="flex items-center justify-between p-3 border border-zinc-200 rounded-md">
      <div className="flex items-center gap-x-2">
        <Vault className="size-6 text-zinc-700" />
        <p className="text-xs font-medium text-zinc-900">{vault.name}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="tertiary">
              <Ellipsis className="size-5 text-zinc-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleShowVaultLocation}>
              show vault location
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>rename vault</DropdownMenuItem>
            <DropdownMenuItem>remove from recent</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="secondary" onClick={handleOpenVault}>
          open
        </Button>
      </div>
    </div>
  )
}

export default VaultCard
