import { ipcMain } from 'electron'

import openExistingVault from '@main/utils/openExistingVault'
import selectFolder from '@main/utils/selectFolder'
import createVault from '@main/utils/createVault'
import openVault from '@main/utils/openVault'

ipcMain.handle('select-folder', async () => {
  const folderPath = await selectFolder()

  return folderPath
})

ipcMain.handle('create-vault', async (_event, vaultName, vaultPath) => {
  const vaultDir = await createVault(vaultName, vaultPath)

  return vaultDir
})

ipcMain.handle('open-vault', async (_event, vaultPath) => {
  const vaultData = await openVault(vaultPath)

  return vaultData
})

ipcMain.handle('open-existing-vault', async () => {
  const vaultData = await openExistingVault()

  return vaultData
})
