import { create } from 'zustand'

interface CreateVaultState {
  vaultName: string
  vaultPath: string | null
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePathSelection: () => Promise<void>
  handleCreateVault: () => Promise<void>
}

const useCreateVaultStore = create<CreateVaultState>((set, get) => ({
  vaultName: '',
  vaultPath: null,
  handleNameChange: (e): void => set({ vaultName: e.target.value }),
  handlePathSelection: async (): Promise<void> => {
    const folderPath = await window.electron.ipcRenderer.invoke('select-folder')

    set({ vaultPath: folderPath })
  },
  handleCreateVault: async (): Promise<void> => {
    await window.electron.ipcRenderer.invoke('create-vault', get().vaultName, get().vaultPath)
  }
}))

export default useCreateVaultStore
