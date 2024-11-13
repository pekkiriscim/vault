import databaseManager from '@main/database/DatabaseManager'

const addLink = async (linkProps: AddLinkProps): Promise<Link> => {
  try {
    const { Link } = databaseManager.models

    if (!Link) {
      throw new Error('Link model is not initialized.')
    }

    const currentTime = Date.now()

    const newLink = await Link.create({
      url: linkProps.url,
      title: linkProps.title ?? null,
      iconUrl: linkProps.iconUrl ?? null,
      folderId: linkProps.folderId ?? null,
      productPrice: linkProps.productPrice ?? null,
      readTime: linkProps.readTime ?? null,
      isPinned: linkProps.isPinned ?? false,
      createdAt: linkProps.createdAt || currentTime,
      updatedAt: linkProps.updatedAt || currentTime
    })

    return newLink.get({ plain: true })
  } catch (error) {
    throw new Error('Failed to add link.')
  }
}

export default addLink
