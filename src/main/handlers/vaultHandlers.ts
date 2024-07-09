import { ipcMain } from 'electron'

import selectFolder from '@main/utils/selectFolder'

ipcMain.handle('select-folder', () => {
  const folderPath = selectFolder()

  return folderPath
})
