import { create } from 'zustand'

interface VaultState {
  vaultName: string | null
  vaultPath: string | null
}

const useVaultStore = create<VaultState>(() => ({
  vaultName: null,
  vaultPath: null
}))

export default useVaultStore
