import { useEffect } from 'react'

import { useLocation, Outlet } from 'react-router-dom'

import Header from '@renderer/components/header'
import Sidebar from '@renderer/components/sidebar'
import ContentInput from '@renderer/components/content-input'
import { ScrollArea } from '@renderer/components/scroll-area'

const Layout = (): JSX.Element => {
  const location = useLocation()

  useEffect(() => {
    const scrollArea = document.querySelector('[data-radix-scroll-area-viewport]')

    scrollArea?.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.key])

  return (
    <main className="w-full h-full relative flex">
      <Sidebar />
      <div className="w-full h-full relative flex flex-col">
        <Header />
        <ScrollArea className="w-full h-full relative flex flex-col items-center">
          <ContentInput />
          <Outlet />
        </ScrollArea>
      </div>
    </main>
  )
}

export default Layout
