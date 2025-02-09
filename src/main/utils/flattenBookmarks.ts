const flattenBookmarks = (
  items: (BookmarkLink | BookmarkFolder)[],
  flattenedBookmarks: FlattenedBookmarks = []
): FlattenedBookmarks => {
  items.forEach((item) => {
    if (item.type === 'url' && item.url) {
      flattenedBookmarks.push({
        type: 'url',
        url: item.url,
        title: item.title,
        createdAt: item.dateAdded ? Number(item.dateAdded) * 1000 : undefined,
        updatedAt: item.dateModified ? Number(item.dateModified) * 1000 : undefined
      })
    } else if (item.type === 'folder') {
      const folderLinks = item.children
        .filter(
          (child): child is BookmarkLink & { url: string } =>
            child.type === 'url' && typeof child.url === 'string'
        )
        .map(
          (child): FlattenedBookmarkLink => ({
            type: 'url',
            url: child.url,
            title: child.title,
            createdAt: child.dateAdded ? Number(child.dateAdded) * 1000 : undefined,
            updatedAt: child.dateModified ? Number(child.dateModified) * 1000 : undefined
          })
        )

      flattenedBookmarks.push({
        type: 'folder',
        name: item.title,
        createdAt: item.dateAdded ? Number(item.dateAdded) * 1000 : undefined,
        updatedAt: item.dateModified ? Number(item.dateModified) * 1000 : undefined,
        links: folderLinks
      })

      const subFolders = item.children.filter(
        (child): child is BookmarkFolder => child.type === 'folder'
      )

      if (subFolders.length > 0) {
        flattenBookmarks(subFolders, flattenedBookmarks)
      }
    }
  })

  return flattenedBookmarks
}

export default flattenBookmarks
