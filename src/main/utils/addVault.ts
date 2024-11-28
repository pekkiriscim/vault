import fs from 'fs'
import path from 'path'

import envPaths from 'env-paths'

const addVault = async (vault: Vault): Promise<void> => {
  try {
    const paths = envPaths('vault', { suffix: '' })

    const vaultsFilePath = path.join(paths.data, 'vaults.json')

    await fs.promises.mkdir(path.dirname(vaultsFilePath), { recursive: true })

    let vaults: Vault[] = []

    if (fs.existsSync(vaultsFilePath)) {
      const data = await fs.promises.readFile(vaultsFilePath, 'utf-8')

      vaults = JSON.parse(data)
    }

    const existingIndex = vaults.findIndex((v) => v.path === vault.path)

    if (existingIndex !== -1) {
      vaults.splice(existingIndex, 1)
    }

    vaults.unshift(vault)

    await fs.promises.writeFile(vaultsFilePath, JSON.stringify(vaults))
  } catch (error) {
    throw new Error('Failed to add vault.')
  }
}

export default addVault
