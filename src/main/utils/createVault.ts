import fs from 'fs'
import path from 'path'

import createFolder from '@main/utils/createFolder'

const createVault = async (vaultName: string, vaultPath: string): Promise<string | null> => {
  try {
    const vaultDir = await createFolder(vaultName, vaultPath)

    const vaultJsonPath = path.join(vaultDir, 'vault.json')
    const vaultJsonContent = { name: vaultName, createdAt: Date.now() }

    await fs.promises.writeFile(vaultJsonPath, JSON.stringify(vaultJsonContent))

    return vaultDir
  } catch (error) {
    console.log(error)

    return null
  }
}

export default createVault
