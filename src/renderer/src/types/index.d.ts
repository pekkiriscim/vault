interface VaultData {
  name: string
  createdAt: number
}

interface Link {
  id: number
  url: string
  title: string | null
  iconUrl: string | null
  folderId: number | null
  productPrice: string | null
  readTime: string | null
  isPinned: boolean
  createdAt: number
  updatedAt: number
}

interface Note {
  id: number
  content: string
  folderId: number | null
  createdAt: number
  updatedAt: number
}
