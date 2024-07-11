import { Outlet } from 'react-router-dom'

import Sidebar from '@renderer/components/sidebar'

const Layout = (): JSX.Element => {
  return (
    <main className="w-full h-full flex">
      <Sidebar />
      <Outlet />
    </main>
  )
}

export default Layout
