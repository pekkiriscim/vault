interface Vault {
  name: string
  path: string
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

interface Metadata {
  title: string | null
  iconUrl: string | null
  productPrice: string | null
  readTime: string | null
}

interface Note {
  id: number
  content: string
  folderId: number | null
  createdAt: number
  updatedAt: number
}

interface Image {
  id: number
  fileName: string
  folderId: number | null
  createdAt: number
}

interface Folder {
  id: number
  name: string
  createdAt: number
  updatedAt: number
}
