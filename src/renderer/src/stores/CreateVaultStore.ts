import { create } from 'zustand'

interface CreateVaultState {
  vaultName: string
  vaultPath: string | null
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePathSelection: () => Promise<void>
}

const useCreateVaultStore = create<CreateVaultState>((set) => ({
  vaultName: '',
  vaultPath: null,
  handleNameChange: (e): void => set({ vaultName: e.target.value }),
  handlePathSelection: async (): Promise<void> => {
    const folderPath = await window.electron.ipcRenderer.invoke('select-folder')

    set({ vaultPath: folderPath })
  }
}))

export default useCreateVaultStore
