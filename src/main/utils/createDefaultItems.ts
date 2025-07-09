import addLink from '@main/utils/addLink'
import addNote from '@main/utils/addNote'

const DEFAULT_LINK = {
  url: 'https://github.com/pekkiriscim/vault',
  title: 'pekkiriscim/vault: save links, notes, and images. private & open source.',
  iconUrl: 'https://github.githubassets.com/favicons/favicon.svg'
}

const DEFAULT_NOTE = {
  content:
    '<h1>welcome to vault 👋</h1><p>vault lets you save links, notes and images — all stored locally.</p><p>→ create folders to organize</p><p>→ use markdown to take rich notes</p><p>→ try the browser extension to save content from the web</p><p>vault is private and open source.</p>'
}

const createDefaultItems = async (): Promise<void> => {
  try {
    await addLink(DEFAULT_LINK)

    await addNote(DEFAULT_NOTE)
  } catch (error) {
    console.error('Failed to create default items:', error)

    throw new Error('Failed to create default items')
  }
}

export default createDefaultItems
