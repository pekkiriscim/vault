import { useEffect, memo } from 'react'

import { Virtuoso } from 'react-virtuoso'

import { useOutletContext } from 'react-router-dom'

import LinkCard from '@renderer/components/link-card'

import useLinksStore from '@renderer/stores/LinksStore'

const LinksPage = (): JSX.Element => {
  const { links, getLinks } = useLinksStore()

  const scrollParent = useOutletContext<HTMLDivElement | null>()

  useEffect(() => {
    getLinks()
  }, [])

  return (
    <div className="w-full h-full max-w-3xl mx-auto px-6 pb-10 pt-8 flex flex-col items-center">
      <Virtuoso
        data={links}
        itemContent={(_index, link) => <LinkCard key={link.id} link={link} />}
        customScrollParent={scrollParent || undefined}
        className="virtualized-links-container w-full overflow-auto"
      />
    </div>
  )
}

export default memo(LinksPage)
