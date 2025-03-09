import { shell } from 'electron'

const showVaultLocation = async (vaultPath: string): Promise<void> => {
  try {
    await shell.openPath(vaultPath)
  } catch (error) {
    throw new Error('Failed to show vault location.')
  }
}

export default showVaultLocation
