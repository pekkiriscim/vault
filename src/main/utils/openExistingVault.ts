import { dialog } from 'electron'

import selectFolder from '@main/utils/selectFolder'
import openVault from '@main/utils/openVault'

const openExistingVault = async (): Promise<unknown> => {
  try {
    const vaultPath = await selectFolder()

    if (!vaultPath) {
      throw new Error('No vault path selected.')
    }

    const vaultData = await openVault(vaultPath)

    return vaultData
  } catch (error) {
    dialog.showErrorBox('Open Vault Error', 'There was an error while opening the existing vault.')

    return null
  }
}

export default openExistingVault
