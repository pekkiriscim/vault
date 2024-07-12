import { dialog } from 'electron'

const selectFolder = async (): Promise<string> => {
  try {
    const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })

    if (!result.canceled && result.filePaths.length > 0) {
      return result.filePaths[0]
    } else {
      throw new Error('No folder path selected.')
    }
  } catch (error) {
    throw new Error('Failed to select folder.')
  }
}

export default selectFolder
