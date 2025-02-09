import fs from 'fs'

import { dialog } from 'electron'

import NBFFConverter from 'nbff-converter'

import databaseManager from '@main/database/DatabaseManager'

import addLink from '@main/utils/addLink'
import addFolder from '@main/utils/addFolder'
import flattenBookmarks from '@main/utils/flattenBookmarks'

const importBookmarks = async (): Promise<void> => {
  try {
    const { Link, Folder } = databaseManager.models

    if (!Link || !Folder) {
      throw new Error('Database models are not initialized.')
    }

    const { canceled, filePaths } = await dialog.showOpenDialog({
      filters: [{ name: 'Bookmark Files', extensions: ['html'] }],
      properties: ['openFile']
    })

    if (canceled || filePaths.length === 0) {
      throw new Error('No bookmark file selected.')
    }

    const nbffString = await fs.promises.readFile(filePaths[0], 'utf-8')

    const nbffConverter = new NBFFConverter()

    const bookmarks: Bookmarks = await nbffConverter.netscapeToJSON(nbffString)

    const flattenedBookmarks = flattenBookmarks(bookmarks.children)

    for (const item of flattenedBookmarks) {
      if (item.type === 'folder') {
        const folder = await addFolder({
          name: item.name,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        })

        for (const link of item.links) {
          await addLink({
            url: link.url,
            title: link.title,
            folderId: folder.id,
            createdAt: link.createdAt,
            updatedAt: link.updatedAt
          })
        }
      } else {
        await addLink({
          url: item.url,
          title: item.title,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        })
      }
    }
  } catch (error) {
    throw new Error('Failed to import bookmarks.')
  }
}

export default importBookmarks
