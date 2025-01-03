import fs from 'fs'
import path from 'path'

import envPaths from 'env-paths'

const getVaults = async (): Promise<Vault[]> => {
  try {
    const paths = envPaths('vault', { suffix: '' })

    const vaultsFilePath = path.join(paths.data, 'vaults.json')

    if (!fs.existsSync(vaultsFilePath)) {
      return []
    }

    const data = await fs.promises.readFile(vaultsFilePath, 'utf-8')

    const vaults: Vault[] = JSON.parse(data)

    return vaults
  } catch (error) {
    throw new Error('Failed to get vaults.')
  }
}

export default getVaults
