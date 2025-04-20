interface AddLinkProps {
  url: string;
  title?: string | null;
  iconUrl?: string | null;
  folderId?: number | null;
  productPrice?: string | null;
  readTime?: string | null;
  isPinned?: boolean;
  createdAt?: number;
  updatedAt?: number;
}

interface AddNoteProps {
  content: string;
  folderId?: number | null;
  createdAt?: number;
  updatedAt?: number;
}

interface Folder {
  id: number;
  name: string;
  createdAt: number;
  updatedAt: number;
}
