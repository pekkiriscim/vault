import { create } from 'zustand'

interface OpenVaultState {
  handleOpenVault: (vaultPath: string) => Promise<void>
  handleOpenExistingVault: () => Promise<void>
}

const useOpenVaultStore = create<OpenVaultState>(() => ({
  handleOpenVault: async (vaultPath): Promise<void> => {
    const vaultData = await window.electron.ipcRenderer.invoke('open-vault', vaultPath)

    console.log(vaultData)
  },
  handleOpenExistingVault: async (): Promise<void> => {
    const vaultData = await window.electron.ipcRenderer.invoke('open-existing-vault')

    console.log(vaultData)
  }
}))

export default useOpenVaultStore
