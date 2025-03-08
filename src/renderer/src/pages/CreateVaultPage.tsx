import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@renderer/components/button'
import { Input } from '@renderer/components/input'
import { Label } from '@renderer/components/label'

import useVaultStore from '@renderer/stores/VaultStore'
import useCreateVaultStore from '@renderer/stores/CreateVaultStore'

const CreateVaultPage = (): JSX.Element => {
  const navigate = useNavigate()

  const { setVaultStore } = useVaultStore()
  const { vaultName, vaultPath, handleNameChange, handlePathSelection } = useCreateVaultStore()

  const handleCreateVault = async (): Promise<void> => {
    try {
      const vaultDir: string = await window.electron.ipcRenderer.invoke(
        'create-vault',
        vaultName,
        vaultPath
      )

      const vault: Vault = await window.electron.ipcRenderer.invoke('open-vault', vaultDir)

      setVaultStore(vault.name, vault.path, vault.createdAt)

      navigate('/all-items')

      toast.success('Vault created successfully.')
    } catch (error) {
      toast.error('Failed to create new vault.')
    }
  }

  return (
    <main className="w-full h-full flex flex-col items-center justify-center gap-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-zinc-900 mb-2">create new vault</h1>
        <p className="text-sm text-zinc-600">open exists vaults or simply create new vault</p>
      </div>
      <div className="max-w-[30rem] w-full flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
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
          <div className="flex flex-col">
            <Label htmlFor="vault-path">location</Label>
            <p className="text-xs text-zinc-600">
              {vaultPath ? vaultPath : 'pick a place to put your new vault'}
            </p>
          </div>
          <Button variant="secondary" id="vault-path" onClick={handlePathSelection}>
            browse
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-2">
        <Button variant="secondary" asChild>
          <Link to="/">back</Link>
        </Button>
        <Button onClick={handleCreateVault}>create new vault</Button>
      </div>
    </main>
  )
}

export default CreateVaultPage
