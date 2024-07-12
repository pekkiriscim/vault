import { Outlet } from 'react-router-dom'

import Header from '@renderer/components/header'
import Sidebar from '@renderer/components/sidebar'

const Layout = (): JSX.Element => {
  return (
    <main className="w-full h-full relative flex">
      <Sidebar />
      <div className="w-full h-full relative flex flex-col">
        <Header />
        <Outlet />
      </div>
    </main>
  )
}

export default Layout
