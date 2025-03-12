import { create } from 'zustand'

interface VaultState {
  name: string | null
  path: string | null
  createdAt: number | null
  vaults: Vault[]
  setVaultStore: (name: string, path: string, createdAt: number) => void
  getVaults: () => Promise<void>
  removeVaultFromRecent: (vaultPath: string) => Promise<void>
  updateVaultName: (vaultPath: string, newVaultName: string) => Promise<void>
}

const useVaultStore = create<VaultState>((set, get) => ({
  name: null,
  path: null,
  createdAt: null,
  vaults: [],
  setVaultStore: (name, path, createdAt): void => {
    set({ name, path, createdAt })
  },
  getVaults: async (): Promise<void> => {
    try {
      const vaults: Vault[] = await window.electron.ipcRenderer.invoke('get-vaults')

      set({ vaults })
    } catch (error) {
      throw new Error('Failed to get vaults.')
    }
  },
  removeVaultFromRecent: async (vaultPath): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('remove-vault-from-recent', vaultPath)

      await get().getVaults()
    } catch (error) {
      throw new Error('Failed to remove vault from recent.')
    }
  },
  updateVaultName: async (vaultPath, newVaultName): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('update-vault-name', vaultPath, newVaultName)

      await get().getVaults()
    } catch (error) {
      throw new Error('Failed to rename vault.')
    }
  }
}))

export default useVaultStore
