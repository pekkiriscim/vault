import { useEffect, useState } from 'react'

import { useLocation, Outlet } from 'react-router-dom'

import SearchPage from '@renderer/pages/SearchPage'

import Header from '@renderer/components/header'
import Sidebar from '@renderer/components/sidebar'
import ContentInput from '@renderer/components/content-input'
import { ScrollArea } from '@renderer/components/scroll-area'

import useLinksStore from '@renderer/stores/LinksStore'
import useNotesStore from '@renderer/stores/NotesStore'
import useImagesStore from '@renderer/stores/ImagesStore'
import useSearchStore from '@renderer/stores/SearchStore'
import useSidebarStore from '@renderer/stores/SidebarStore'

const Layout = (): JSX.Element => {
  const location = useLocation()

  const { query } = useSearchStore()
  const { getLinks } = useLinksStore()
  const { getNotes } = useNotesStore()
  const { getImages } = useImagesStore()
  const { isSidebarOpen } = useSidebarStore()

  const [scrollParent, setScrollParent] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (scrollParent) {
      scrollParent.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [location.key])

  useEffect(() => {
    const unsubscribeLink = window.electron.ipcRenderer.on('link-added', () => {
      getLinks()
    })

    const unsubscribeNote = window.electron.ipcRenderer.on('note-added', () => {
      getNotes()
    })

    const unsubscribeImage = window.electron.ipcRenderer.on('image-added', () => {
      getImages()
    })

    return (): void => {
      unsubscribeLink()
      unsubscribeNote()
      unsubscribeImage()
    }
  }, [getLinks, getNotes, getImages])

  return (
    <main className="w-full h-full relative flex">
      {isSidebarOpen && <Sidebar />}
      <div className="w-full h-full relative flex flex-col">
        <Header />
        <ScrollArea
          ref={setScrollParent}
          className="w-full h-full relative flex flex-col items-center"
        >
          {query ? (
            <SearchPage scrollParent={scrollParent} />
          ) : (
            <>
              <ContentInput />
              <Outlet context={scrollParent} />
            </>
          )}
        </ScrollArea>
      </div>
    </main>
  )
}

export default Layout
