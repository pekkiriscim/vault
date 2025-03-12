import fs from 'fs'
import path from 'path'

import envPaths from 'env-paths'

import databaseManager from '@main/database/DatabaseManager'

const updateVaultName = async (vaultPath: string, newVaultName: string): Promise<void> => {
  try {
    await databaseManager.closeDatabase()

    const vaultJsonPath = path.join(vaultPath, 'vault.json')

    if (!fs.existsSync(vaultJsonPath)) {
      throw new Error('Vault configuration file not found.')
    }

    const vaultJsonContent = await fs.promises.readFile(vaultJsonPath, 'utf-8')
    const vaultConfig = JSON.parse(vaultJsonContent)

    vaultConfig.name = newVaultName

    await fs.promises.writeFile(vaultJsonPath, JSON.stringify(vaultConfig))

    const currentDirPath = vaultPath
    const parentDirPath = path.dirname(currentDirPath)
    const newDirPath = path.join(parentDirPath, newVaultName)

    if (fs.existsSync(newDirPath)) {
      throw new Error('A folder with the new vault name already exists.')
    }

    await fs.promises.rename(currentDirPath, newDirPath)

    const paths = envPaths('vault', { suffix: '' })
    const vaultsFilePath = path.join(paths.data, 'vaults.json')

    if (fs.existsSync(vaultsFilePath)) {
      const vaultsData = await fs.promises.readFile(vaultsFilePath, 'utf-8')
      const vaults: Vault[] = JSON.parse(vaultsData)

      const updatedVaults = vaults.map((vault) => {
        if (vault.path === currentDirPath) {
          return {
            ...vault,
            name: newVaultName,
            path: newDirPath
          }
        }

        return vault
      })

      await fs.promises.writeFile(vaultsFilePath, JSON.stringify(updatedVaults))
    }
  } catch (error) {
    throw new Error('Failed to update vault name.')
  }
}

export default updateVaultName
