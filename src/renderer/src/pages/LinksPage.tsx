import { useEffect, memo } from 'react'

import { Virtuoso } from 'react-virtuoso'

import { useOutletContext } from 'react-router-dom'

import LinkCard from '@renderer/components/link-card'
import EmptyState from '@renderer/components/empty-state'

import useLinksStore from '@renderer/stores/LinksStore'

const LinksPage = (): JSX.Element => {
  const { links, getLinks } = useLinksStore()

  const scrollParent = useOutletContext<HTMLDivElement | null>()

  useEffect(() => {
    getLinks()
  }, [])

  if (links.length === 0) {
    return (
      <div className="w-full h-full max-w-3xl mx-auto px-6 pb-10 pt-8 flex items-center justify-center">
        <EmptyState text="No links found" supportingText="Add your first link to get started" />
      </div>
    )
  }

  return (
    <div className="w-full h-full max-w-3xl mx-auto px-6 pb-10 pt-8 flex flex-col items-center">
      <Virtuoso
        data={links}
        itemContent={(_index, link) => <LinkCard key={link.id} link={link} />}
        customScrollParent={scrollParent || undefined}
        className="virtualized-links-container w-full"
      />
    </div>
  )
}

export default memo(LinksPage)
