import { useEffect } from 'react'

import LinkCard from '@renderer/components/link-card'
import { ScrollArea } from '@renderer/components/scroll-area'

import useLinksStore from '@renderer/stores/LinksStore'

const LinksPage = (): JSX.Element => {
  const { links, getLinks } = useLinksStore()

  useEffect(() => {
    getLinks()
  }, [])

  return (
    <ScrollArea className="w-full h-full relative p-8 flex flex-col items-center overflow-auto">
      <div className="max-w-[45rem] w-full h-full flex flex-col gap-y-1">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>
    </ScrollArea>
  )
}

export default LinksPage
