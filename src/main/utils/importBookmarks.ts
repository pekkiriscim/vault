import fs from 'fs'

import { dialog } from 'electron'

import NBFFConverter from 'nbff-converter'

import addLink from '@main/utils/addLink'
import addFolder from '@main/utils/addFolder'
import getMetadata from '@main/utils/getMetadata'
import flattenBookmarks from '@main/utils/flattenBookmarks'

const processMetadataQueue = async (links: Link[]): Promise<void> => {
  for (const link of links) {
    try {
      await getMetadata(link)
    } catch (error) {
      console.error('Failed to get metadata.')
    }
  }

  console.log('Completed processing metadata.')
}

const importBookmarks = async (): Promise<void> => {
  try {
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

    const linksToProcess: Link[] = []

    for (const item of flattenedBookmarks) {
      if (item.type === 'folder') {
        try {
          const folder = await addFolder({
            name: item.name,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
          })

          for (const link of item.links) {
            try {
              const newLink = await addLink({
                url: link.url,
                title: link.title,
                folderId: folder.id,
                createdAt: link.createdAt,
                updatedAt: link.updatedAt
              })
              linksToProcess.push(newLink)
            } catch (error) {
              console.error(`Failed to add link "${link.title}":`, error)
            }
          }
        } catch (error) {
          console.error(`Failed to add folder "${item.name}":`, error)
        }
      } else {
        try {
          const newLink = await addLink({
            url: item.url,
            title: item.title,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
          })
          linksToProcess.push(newLink)
        } catch (error) {
          console.error(`Failed to add link "${item.title}":`, error)
        }
      }
    }

    processMetadataQueue(linksToProcess).catch((error) => {
      console.error('Error processing metadata queue:', error)
    })
  } catch (error) {
    throw new Error('Failed to import bookmarks.')
  }
}

export default importBookmarks
