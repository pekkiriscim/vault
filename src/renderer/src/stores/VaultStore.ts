import { create } from 'zustand'

interface VaultState {
  name: string | null
  path: string | null
  createdAt: number | null
  setVaultStore: (name: string, path: string, createdAt: number) => void
}

const useVaultStore = create<VaultState>((set) => ({
  name: null,
  path: null,
  createdAt: null,
  setVaultStore: (name, path, createdAt): void => {
    set({ name, path, createdAt })
  }
}))

export default useVaultStore
