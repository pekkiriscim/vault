import { useState, useEffect } from 'react'

import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Vault, Ellipsis } from 'lucide-react'
import { useClickAway } from '@uidotdev/usehooks'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@renderer/components/dropdown-menu'
import { Input } from '@renderer/components/input'
import { Button } from '@renderer/components/button'

import useVaultStore from '@renderer/stores/VaultStore'

const VaultCard = ({ vault }: { vault: Vault }): JSX.Element => {
  const navigate = useNavigate()

  const { setVaultStore, removeVaultFromRecent, updateVaultName } = useVaultStore()

  const [isEditingVault, setIsEditingVault] = useState(false)
  const [newVaultName, setNewVaultName] = useState(vault.name)

  const inputRef = useClickAway<HTMLInputElement>(() => {
    setIsEditingVault(false)
    setNewVaultName(vault.name)
  })

  useEffect(() => {
    if (isEditingVault && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.select()
      }, 100)
    }
  }, [isEditingVault])

  useEffect(() => {
    setNewVaultName(vault.name)
  }, [vault.name])

  const handleOpenVault = async (): Promise<void> => {
    try {
      const openedVault: Vault = await window.electron.ipcRenderer.invoke('open-vault', vault.path)

      setVaultStore(openedVault.name, openedVault.path, openedVault.createdAt)

      navigate('/all-items')

      toast.success('Vault opened successfully')
    } catch (error) {
      toast.error('Unable to open vault')
    }
  }

  const handleShowVaultLocation = async (): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('show-vault-location', vault.path)
    } catch (error) {
      toast.error('Unable to show vault location')
    }
  }

  const handleRemoveVaultFromRecent = async (): Promise<void> => {
    try {
      await removeVaultFromRecent(vault.path)

      toast.success('Vault removed from recent')
    } catch (error) {
      toast.error('Unable to remove vault from recent')
    }
  }

  const handleRenameVault = async (): Promise<void> => {
    try {
      if (!newVaultName || newVaultName.trim().length === 0) {
        toast.error('Please enter a vault name')
        return
      }

      if (newVaultName.trim() === vault.name) {
        setIsEditingVault(false)
        return
      }

      if (newVaultName.trim().length > 50) {
        toast.error('Vault name must be less than 50 characters')
        return
      }

      await updateVaultName(vault.path, newVaultName.trim())

      setIsEditingVault(false)

      toast.success('Vault renamed successfully')
    } catch (error) {
      toast.error('Unable to rename vault')

      setNewVaultName(vault.name)

      setIsEditingVault(false)
    }
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (e.key === 'Enter') {
      await handleRenameVault()
    } else if (e.key === 'Escape') {
      setNewVaultName(vault.name)

      setIsEditingVault(false)
    }
  }

  return (
    <div className="flex items-center justify-between p-3 border border-zinc-200 rounded-md">
      <div className="flex items-center gap-x-2">
        <Vault className="size-6 text-zinc-700" />
        {isEditingVault ? (
          <Input
            ref={inputRef}
            spellCheck="false"
            placeholder="vault name"
            value={newVaultName}
            className="max-w-32 h-auto rounded-none border-0 bg-transparent p-0 text-xs font-medium text-zinc-900"
            onKeyDown={handleKeyDown}
            onClick={(e) => e.preventDefault()}
            onChange={(e) => setNewVaultName(e.target.value)}
          />
        ) : (
          <p className="text-xs font-medium text-zinc-900 select-none">{vault.name}</p>
        )}
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
            <DropdownMenuItem onClick={() => setIsEditingVault(true)}>
              rename vault
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleRemoveVaultFromRecent}>
              remove from recent
            </DropdownMenuItem>
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
