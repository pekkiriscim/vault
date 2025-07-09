import fs from 'fs'
import path from 'path'

import databaseManager from '@main/database/DatabaseManager'

import createFolder from '@main/utils/createFolder'
import createDefaultItems from '@main/utils/createDefaultItems'

const createVault = async (vaultName: string, vaultPath: string): Promise<string> => {
  try {
    const vaultDir = await createFolder(vaultName, vaultPath)

    const vaultJsonPath = path.join(vaultDir, 'vault.json')

    if (!fs.existsSync(vaultJsonPath)) {
      const vaultJsonContent = { name: vaultName, createdAt: Date.now() }

      await fs.promises.writeFile(vaultJsonPath, JSON.stringify(vaultJsonContent))

      await databaseManager.openDatabase(vaultDir)

      try {
        await createDefaultItems()
      } catch (error) {
        console.error('Failed to create default items:', error)
      }

      return vaultDir
    } else {
      throw new Error('Vault already exists at the specified path.')
    }
  } catch (error) {
    throw new Error('Failed to create vault.')
  }
}

export default createVault
