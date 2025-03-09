import fs from 'fs'
import path from 'path'

import envPaths from 'env-paths'

const removeVaultFromRecent = async (vaultPath: string): Promise<void> => {
  try {
    const paths = envPaths('vault', { suffix: '' })

    const vaultsFilePath = path.join(paths.data, 'vaults.json')

    if (!fs.existsSync(vaultsFilePath)) {
      return
    }

    const data = await fs.promises.readFile(vaultsFilePath, 'utf-8')

    const vaults: Vault[] = JSON.parse(data)

    const updatedVaults = vaults.filter((vault) => vault.path !== vaultPath)

    await fs.promises.writeFile(vaultsFilePath, JSON.stringify(updatedVaults))
  } catch (error) {
    throw new Error('Failed to remove vault from recent.')
  }
}

export default removeVaultFromRecent
