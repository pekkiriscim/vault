import fs from 'fs'
import path from 'path'

import databaseManager from '@main/database/DatabaseManager'

const openVault = async (vaultPath: string): Promise<unknown> => {
  try {
    const vaultJsonPath = path.join(vaultPath, 'vault.json')

    const data = await fs.promises.readFile(vaultJsonPath, 'utf-8')
    const vaultData = JSON.parse(data)

    await databaseManager.openDatabase(vaultPath)

    return vaultData
  } catch (error) {
    throw new Error('Failed to open vault.')
  }
}

export default openVault
