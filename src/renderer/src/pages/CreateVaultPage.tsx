import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'

import { Input } from '@renderer/components/input'
import { Label } from '@renderer/components/label'
import { Button } from '@renderer/components/button'

import useVaultStore from '@renderer/stores/VaultStore'
import useCreateVaultStore from '@renderer/stores/CreateVaultStore'

import vault from '@renderer/assets/vault.svg'

const CreateVaultPage = (): JSX.Element => {
  const navigate = useNavigate()

  const { setVaultStore } = useVaultStore()
  const { vaultName, vaultPath, handleNameChange, handlePathSelection } = useCreateVaultStore()

  const handleCreateVault = async (): Promise<void> => {
    try {
      if (!vaultName || vaultName.trim().length === 0) {
        toast.error('Please enter a vault name')
        return
      }

      if (vaultName.trim().length > 50) {
        toast.error('Vault name must be less than 50 characters')
        return
      }

      if (!vaultPath || vaultPath.trim().length === 0) {
        toast.error('Please select a location for your vault')
        return
      }

      const vaultDir = await window.electron.ipcRenderer.invoke(
        'create-vault',
        vaultName.trim(),
        vaultPath
      )

      const vault: Vault = await window.electron.ipcRenderer.invoke('open-vault', vaultDir)

      setVaultStore(vault.name, vault.path, vault.createdAt)

      navigate('/all-items')
      toast.success('Vault created successfully')
    } catch (error) {
      toast.error('Unable to create vault')
    }
  }

  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <header className="w-full flex h-[3.25rem] min-h-[3.25rem] [-webkit-app-region:drag]"></header>
      <div className="w-full h-full flex flex-col items-center justify-center px-8 py-6 gap-y-6 overflow-auto">
        <div className="flex flex-col items-center gap-y-5 text-center">
          <img src={vault} alt="vault" className="size-12 select-none" draggable="false" />
          <div className="select-none">
            <h1 className="text-2xl font-semibold text-zinc-900 mb-2">create a new vault</h1>
            <p className="text-sm text-zinc-600">choose a name and location to get started</p>
          </div>
        </div>
        <div className="max-w-[30rem] w-full flex flex-col gap-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col select-none">
              <Label htmlFor="vault-name">vault name</Label>
              <p className="text-xs text-zinc-600">enter a name for your vault</p>
            </div>
            <Input
              type="text"
              placeholder="vault name"
              id="vault-name"
              className="max-w-48"
              value={vaultName}
              onChange={handleNameChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col select-none">
              <Label htmlFor="vault-path">location</Label>
              <p className="text-xs text-zinc-600">
                {vaultPath ? vaultPath : 'pick a place to put your new vault'}
              </p>
            </div>
            <Button variant="secondary" id="vault-path" onClick={handlePathSelection}>
              browse...
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <Button variant="secondary" asChild>
            <Link to="/" draggable="false">
              back
            </Link>
          </Button>
          <Button onClick={handleCreateVault}>create new vault</Button>
        </div>
      </div>
    </main>
  )
}

export default CreateVaultPage
