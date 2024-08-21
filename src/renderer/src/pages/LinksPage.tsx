import { useEffect } from 'react'

import LinkCard from '@renderer/components/link-card'

import useLinksStore from '@renderer/stores/LinksStore'

const LinksPage = (): JSX.Element => {
  const { links, getLinks } = useLinksStore()

  useEffect(() => {
    getLinks()
  }, [])

  return (
    <div className="w-full h-full max-w-3xl mx-auto px-6 pb-10 pt-8 flex flex-col items-center gap-y-1">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  )
}

export default LinksPage
