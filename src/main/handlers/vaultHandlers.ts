import { ipcMain } from 'electron'

import openVault from '@main/utils/openVault'
import getVaults from '@main/utils/getVaults'
import createVault from '@main/utils/createVault'
import selectFolder from '@main/utils/selectFolder'
import openExistingVault from '@main/utils/openExistingVault'
import showVaultLocation from '@main/utils/showVaultLocation'
import removeVaultFromRecent from '@main/utils/removeVaultFromRecent'

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

ipcMain.handle('get-vaults', async () => {
  try {
    const vaults = await getVaults()

    return vaults
  } catch (error) {
    throw new Error('Failed to get vaults.')
  }
})

ipcMain.handle('show-vault-location', async (_event, vaultPath) => {
  try {
    await showVaultLocation(vaultPath)
  } catch (error) {
    throw new Error('Failed to show vault location.')
  }
})

ipcMain.handle('remove-vault-from-recent', async (_event, vaultPath) => {
  try {
    await removeVaultFromRecent(vaultPath)
  } catch (error) {
    throw new Error('Failed to remove vault from recent.')
  }
})
