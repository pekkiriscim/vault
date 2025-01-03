import { create } from 'zustand'

interface VaultState {
  name: string | null
  path: string | null
  createdAt: number | null
  vaults: Vault[]
  setVaultStore: (name: string, path: string, createdAt: number) => void
  getVaults: () => Promise<void>
}

const useVaultStore = create<VaultState>((set) => ({
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
  }
}))

export default useVaultStore
