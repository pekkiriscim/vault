import { parse } from 'muninn'

import databaseManager from '@main/database/DatabaseManager'

import configs from '@main/configs'

const getMetadata = async (link: Link): Promise<void> => {
  try {
    const response = await fetch(link.url)
    const html = await response.text()

    const domain = new URL(link.url).hostname.replace('www.', '')

    const baseUrl = new URL(link.url).origin

    const config = {
      schema: {
        title: {
          selector: 'title',
          initial: null
        },
        iconUrl: {
          selector: 'link[rel="icon"],  link[rel="shortcut icon"], link[rel="apple-touch-icon"]',
          attr: 'href',
          initial: null
        },
        productPrice: configs.productPrice[domain] || { fill: null },
        readTime: configs.readTime[domain] || { fill: null }
      }
    }

    const metadata = parse(html, config) as unknown as Metadata

    const { Link } = databaseManager.models

    if (!Link) {
      throw new Error('Link model is not initialized.')
    }

    const updateData: Partial<Metadata> = {
      productPrice: metadata.productPrice,
      readTime: metadata.readTime
    }

    if (!link.title) {
      updateData.title = metadata.title
    }

    if (!link.iconUrl && metadata.iconUrl) {
      try {
        const iconUrl = new URL(metadata.iconUrl, baseUrl).href

        updateData.iconUrl = iconUrl
      } catch (error) {
        console.error('Failed to parse icon URL:', error)

        updateData.iconUrl = null
      }
    }

    await Link.update(updateData, {
      where: { id: link.id }
    })
  } catch (error) {
    throw new Error('Failed to fetch metadata.')
  }
}

export default getMetadata
