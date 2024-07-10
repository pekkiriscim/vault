import { ipcMain } from 'electron'

import selectFolder from '@main/utils/selectFolder'
import createVault from '@main/utils/createVault'

ipcMain.handle('select-folder', async () => {
  const folderPath = await selectFolder()

  return folderPath
})

ipcMain.handle('create-vault', async (_event, vaultName, vaultPath) => {
  await createVault(vaultName, vaultPath)
})
