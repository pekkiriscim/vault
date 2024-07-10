import fs from 'fs'
import path from 'path'

const createFolder = async (folderName: string, basePath: string): Promise<string> => {
  const folderPath = path.join(basePath, folderName)

  if (!fs.existsSync(folderPath)) {
    await fs.promises.mkdir(folderPath)
  }

  return folderPath
}

export default createFolder
