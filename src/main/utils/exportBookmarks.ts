import fs from 'fs'

import { dialog } from 'electron'

import NBFFConverter from 'nbff-converter'

import getLinks from '@main/utils/getLinks'
import getFolders from '@main/utils/getFolders'

const exportBookmarks = async (): Promise<void> => {
  try {
    const folders = await getFolders()

    const links = await getLinks()

    const bookmarks: Bookmarks = {
      children: folders.map(
        (folder): BookmarkFolder => ({
          type: 'folder',
          title: folder.name,
          dateAdded: Math.floor(new Date(folder.createdAt).getTime() / 1000).toString(),
          dateModified: Math.floor(new Date(folder.updatedAt).getTime() / 1000).toString(),
          children: links
            .filter((link) => link.folderId === folder.id)
            .map(
              (link): BookmarkLink => ({
                type: 'url',
                url: link.url,
                title: link.title ?? '',
                dateAdded: Math.floor(new Date(link.createdAt).getTime() / 1000).toString(),
                dateModified: Math.floor(new Date(link.updatedAt).getTime() / 1000).toString()
              })
            )
        })
      )
    }

    const standaloneLinks = links.filter((link) => link.folderId === null)

    bookmarks.children.push(
      ...standaloneLinks.map(
        (link): BookmarkLink => ({
          type: 'url',
          url: link.url,
          title: link.title ?? '',
          dateAdded: Math.floor(new Date(link.createdAt).getTime() / 1000).toString(),
          dateModified: Math.floor(new Date(link.updatedAt).getTime() / 1000).toString()
        })
      )
    )

    const nbffConverter = new NBFFConverter()

    const result = await nbffConverter.jsonToNetscape(bookmarks)

    const { canceled, filePath } = await dialog.showSaveDialog({
      filters: [{ name: 'HTML', extensions: ['html'] }],
      defaultPath: 'bookmarks.html'
    })

    if (!canceled && filePath) {
      await fs.promises.writeFile(filePath, result.nbffStr, 'utf-8')
    }
  } catch (error) {
    throw new Error('Failed to export bookmarks.')
  }
}

export default exportBookmarks
