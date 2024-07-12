import { ipcMain } from 'electron'

import openExistingVault from '@main/utils/openExistingVault'
import selectFolder from '@main/utils/selectFolder'
import createVault from '@main/utils/createVault'
import openVault from '@main/utils/openVault'

ipcMain.handle('select-folder', async () => {
  try {
    const folderPath = await selectFolder()

    return folderPath
  } catch (error) {
    throw new Error('Failed to select folder.')
  }
})

ipcMain.handle('create-vault', async (_event, vaultName, vaultPath) => {
  try {
    const vaultDir = await createVault(vaultName, vaultPath)

    return vaultDir
  } catch (error) {
    throw new Error('Failed to create vault.')
  }
})

ipcMain.handle('open-vault', async (_event, vaultPath) => {
  try {
    const vaultData = await openVault(vaultPath)

    return vaultData
  } catch (error) {
    throw new Error('Failed to open vault.')
  }
})

ipcMain.handle('open-existing-vault', async () => {
  try {
    const vaultData = await openExistingVault()

    return vaultData
  } catch (error) {
    throw new Error('Failed to open existing vault.')
  }
})
