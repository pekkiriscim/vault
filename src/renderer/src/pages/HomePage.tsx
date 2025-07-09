import { useEffect } from 'react'

import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@renderer/components/button'
import VaultCard from '@renderer/components/vault-card'
import { ScrollArea } from '@renderer/components/scroll-area'

import useVaultStore from '@renderer/stores/VaultStore'

import vault from '@renderer/assets/vault.svg'

const HomePage = (): JSX.Element => {
  const navigate = useNavigate()

  const { vaults, setVaultStore, getVaults } = useVaultStore()

  useEffect(() => {
    getVaults()
  }, [])

  const handleOpenExistingVault = async (): Promise<void> => {
    try {
      const vault: Vault = await window.electron.ipcRenderer.invoke('open-existing-vault')

      setVaultStore(vault.name, vault.path, vault.createdAt)

      navigate('/all-items')

      toast.success('Vault opened successfully')
    } catch (error) {
      toast.error('Unable to open vault')
    }
  }

  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <header className="w-full flex h-[3.25rem] min-h-[3.25rem] [-webkit-app-region:drag]"></header>
      <div className="w-full h-full flex flex-col items-center justify-center px-8 py-6 gap-y-6 overflow-auto">
        <div className="flex flex-col items-center gap-y-5 text-center">
          <img src={vault} alt="vault" className="size-12 select-none" draggable="false" />
          <div className="select-none">
            <h1 className="text-2xl font-semibold text-zinc-900 mb-2">start with a vault</h1>
            <p className="text-sm text-zinc-600">open an existing vault or create a new one</p>
          </div>
        </div>
        {vaults.length > 0 && (
          <ScrollArea className="w-full max-w-96">
            <div className="flex flex-col w-full gap-y-2">
              {vaults.map((vault) => (
                <VaultCard key={vault.name} vault={vault} />
              ))}
            </div>
          </ScrollArea>
        )}
        <div className="flex items-center justify-center gap-x-2">
          <Button variant="secondary" onClick={handleOpenExistingVault}>
            open existing vault
          </Button>
          <Button asChild>
            <Link to="/create-vault" draggable="false">
              create new vault
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

export default HomePage
