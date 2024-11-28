import fs from 'fs'
import path from 'path'

import databaseManager from '@main/database/DatabaseManager'

import addVault from '@main/utils/addVault'

const openVault = async (vaultPath: string): Promise<Vault> => {
  try {
    const vaultJsonPath = path.join(vaultPath, 'vault.json')

    const data = await fs.promises.readFile(vaultJsonPath, 'utf-8')
    const { name, createdAt } = JSON.parse(data)

    await databaseManager.openDatabase(vaultPath)

    const vault: Vault = { name, path: vaultPath, createdAt }

    await addVault(vault)

    return vault
  } catch (error) {
    throw new Error('Failed to open vault.')
  }
}

export default openVault
