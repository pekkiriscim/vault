import { useEffect, useState } from 'react'

import { useLocation, Outlet } from 'react-router-dom'

import SearchPage from '@renderer/pages/SearchPage'

import Header from '@renderer/components/header'
import Sidebar from '@renderer/components/sidebar'
import ContentInput from '@renderer/components/content-input'
import { ScrollArea } from '@renderer/components/scroll-area'

import useSearchStore from '@renderer/stores/SearchStore'
import useSidebarStore from '@renderer/stores/SidebarStore'

const Layout = (): JSX.Element => {
  const location = useLocation()

  const { query } = useSearchStore()
  const { isSidebarOpen } = useSidebarStore()

  const [scrollParent, setScrollParent] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (scrollParent) {
      scrollParent.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [location.key])

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
            <SearchPage />
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
