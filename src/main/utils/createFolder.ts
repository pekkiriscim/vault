import fs from 'fs'
import path from 'path'

const createFolder = async (folderName: string, basePath: string): Promise<string> => {
  try {
    if (!folderName || !basePath) {
      throw new Error('Invalid parameters: folderName and basePath are required.')
    }

    const folderPath = path.join(basePath, folderName)

    if (!fs.existsSync(folderPath)) {
      await fs.promises.mkdir(folderPath)
    }

    return folderPath
  } catch (error) {
    throw new Error('Failed to create folder.')
  }
}

export default createFolder
