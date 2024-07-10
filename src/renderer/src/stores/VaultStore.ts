import { create } from 'zustand'

interface VaultState {
  name: string | null
}

const useVaultStore = create<VaultState>(() => ({
  name: null
}))

export default useVaultStore
