import { LinkModel } from '@main/models/LinkModel'

import databaseManager from '@main/database/DatabaseManager'

const getLinks = async (): Promise<LinkModel[]> => {
  try {
    const { Link } = databaseManager.models

    if (!Link) {
      throw new Error('Link model is not initialized.')
    }

    const links = await Link?.findAll({ raw: true })

    return links
  } catch (error) {
    throw new Error('Failed to fetch links.')
  }
}

export default getLinks
