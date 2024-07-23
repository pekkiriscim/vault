import { create } from 'zustand'

interface VaultState {
  name: string | null
  createdAt: number | null
  setVaultStore: (name: string, createdAt: number) => void
}

const useVaultStore = create<VaultState>((set) => ({
  name: null,
  createdAt: null,
  setVaultStore: (name, createdAt): void => {
    set({ name, createdAt })
  }
}))

export default useVaultStore
