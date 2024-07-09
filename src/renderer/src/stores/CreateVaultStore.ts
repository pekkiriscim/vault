import { create } from 'zustand'

interface CreateVaultState {
  vaultName: string
  vaultPath: undefined | string
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePathSelection: () => void
}

const useCreateVaultStore = create<CreateVaultState>((set) => ({
  vaultName: '',
  vaultPath: undefined,
  handleNameChange: (e): void => set({ vaultName: e.target.value }),
  handlePathSelection: async (): Promise<void> => {
    const folderPath = await window.electron.ipcRenderer.invoke('select-folder')

    set({ vaultPath: folderPath })
  }
}))

export default useCreateVaultStore
