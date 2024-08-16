import { useEffect } from 'react'

import useLinksStore from '@renderer/stores/LinksStore'
import LinkCard from '@renderer/components/link-card'

const LinksPage = (): JSX.Element => {
  const { links, getLinks } = useLinksStore()

  useEffect(() => {
    getLinks()
  }, [])

  return (
    <main className="w-full h-full relative p-8 flex flex-col items-center overflow-auto">
      <div className="max-w-[45rem] w-full h-full flex flex-col gap-y-1">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>
    </main>
  )
}

export default LinksPage
