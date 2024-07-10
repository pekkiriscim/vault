import { Link } from 'react-router-dom'

import { Button } from '@renderer/components/button'
import useOpenVaultStore from '@renderer/stores/OpenVaultStore'

const HomePage = (): JSX.Element => {
  const { handleOpenExistingVault } = useOpenVaultStore()

  return (
    <main className="w-full h-full flex flex-col items-center justify-center gap-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-zinc-900 mb-2">start with a vault</h1>
        <p className="text-sm text-zinc-600">open exists vaults or simply create new vault</p>
      </div>
      <div className="flex items-center justify-center gap-x-2">
        <Button variant="secondary" onClick={handleOpenExistingVault}>
          open existing vault
        </Button>
        <Button asChild>
          <Link to="/create-vault">create new vault</Link>
        </Button>
      </div>
    </main>
  )
}

export default HomePage
