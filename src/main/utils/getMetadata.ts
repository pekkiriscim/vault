import { parse } from 'muninn'

import databaseManager from '@main/database/DatabaseManager'

import configs from '@main/configs'

const getMetadata = async (link: Link): Promise<void> => {
  try {
    const response = await fetch(link.url)
    const html = await response.text()

    const domain = new URL(link.url).hostname.replace('www.', '')

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

    await Link.update(metadata, {
      where: { id: link.id }
    })
  } catch (error) {
    throw new Error('Failed to fetch metadata.')
  }
}

export default getMetadata
