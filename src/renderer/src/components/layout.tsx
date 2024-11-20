import { useEffect, useRef } from 'react'

import { useLocation, Outlet } from 'react-router-dom'

import Header from '@renderer/components/header'
import Sidebar from '@renderer/components/sidebar'
import ContentInput from '@renderer/components/content-input'
import { ScrollArea } from '@renderer/components/scroll-area'

import useSidebarStore from '@renderer/stores/SidebarStore'

const Layout = (): JSX.Element => {
  const location = useLocation()

  const { isSidebarOpen } = useSidebarStore()

  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [location.key])

  return (
    <main className="w-full h-full relative flex">
      {isSidebarOpen && <Sidebar />}
      <div className="w-full h-full relative flex flex-col">
        <Header />
        <ScrollArea
          ref={scrollAreaRef}
          className="w-full h-full relative flex flex-col items-center"
        >
          <ContentInput />
          <Outlet />
        </ScrollArea>
      </div>
    </main>
  )
}

export default Layout
