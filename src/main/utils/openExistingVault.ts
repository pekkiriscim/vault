import openVault from '@main/utils/openVault'
import selectFolder from '@main/utils/selectFolder'

const openExistingVault = async (): Promise<unknown> => {
  try {
    const vaultPath = await selectFolder()

    if (!vaultPath) {
      throw new Error('No vault path selected.')
    }

    const vaultData = await openVault(vaultPath)

    return vaultData
  } catch (error) {
    throw new Error('Failed to open existing vault.')
  }
}

export default openExistingVault
