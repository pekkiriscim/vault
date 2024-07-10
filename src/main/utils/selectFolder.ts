import { dialog } from 'electron'

const selectFolder = async (): Promise<string | null> => {
  const folderPath = await dialog.showOpenDialog({ properties: ['openDirectory'] })

  if (!folderPath.canceled) {
    return folderPath.filePaths[0]
  } else {
    return null
  }
}

export default selectFolder
