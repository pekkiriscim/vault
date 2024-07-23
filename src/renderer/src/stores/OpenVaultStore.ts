import { create } from 'zustand'

import useVaultStore from '@renderer/stores/VaultStore'

interface OpenVaultState {
  handleOpenVault: (vaultPath: string) => Promise<void>
  handleOpenExistingVault: () => Promise<void>
}

const useOpenVaultStore = create<OpenVaultState>(() => ({
  handleOpenVault: async (vaultPath): Promise<void> => {
    try {
      const vaultData: VaultData = await window.electron.ipcRenderer.invoke('open-vault', vaultPath)

      useVaultStore.getState().setVaultStore(vaultData.name, vaultData.createdAt)
    } catch (error) {
      throw new Error('Failed to open the vault.')
    }
  },
  handleOpenExistingVault: async (): Promise<void> => {
    try {
      const vaultData: VaultData = await window.electron.ipcRenderer.invoke('open-existing-vault')

      useVaultStore.getState().setVaultStore(vaultData.name, vaultData.createdAt)
    } catch (error) {
      throw new Error('Failed to open the existing vault.')
    }
  }
}))

export default useOpenVaultStore
