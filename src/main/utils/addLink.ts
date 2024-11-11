import databaseManager from '@main/database/DatabaseManager'

interface LinkData {
  url: string
  title?: string | null
  iconUrl?: string | null
  folderId?: number | null
  productPrice?: string | null
  readTime?: string | null
  isPinned?: boolean
  createdAt?: number
  updatedAt?: number
}

const addLink = async (linkData: LinkData): Promise<Link> => {
  try {
    const { Link } = databaseManager.models

    if (!Link) {
      throw new Error('Link model is not initialized.')
    }

    const currentTime = Date.now()

    const newLink = await Link.create({
      url: linkData.url,
      title: linkData.title ?? null,
      iconUrl: linkData.iconUrl ?? null,
      folderId: linkData.folderId ?? null,
      productPrice: linkData.productPrice ?? null,
      readTime: linkData.readTime ?? null,
      isPinned: linkData.isPinned ?? false,
      createdAt: linkData.createdAt || currentTime,
      updatedAt: linkData.updatedAt || currentTime
    })

    return newLink.get({ plain: true })
  } catch (error) {
    throw new Error('Failed to add link.')
  }
}

export default addLink
