import fs from 'fs'
import path from 'path'

import { dialog } from 'electron'

import createFolder from '@main/utils/createFolder'

const createVault = async (vaultName: string, vaultPath: string): Promise<string | null> => {
  try {
    const vaultDir = await createFolder(vaultName, vaultPath)

    const vaultJsonPath = path.join(vaultDir, 'vault.json')
    const vaultJsonContent = { name: vaultName, createdAt: Date.now() }

    await fs.promises.writeFile(vaultJsonPath, JSON.stringify(vaultJsonContent))

    return vaultDir
  } catch (error) {
    dialog.showErrorBox('Vault Creation Error', 'There was an error while creating the vault.')

    return null
  }
}

export default createVault
