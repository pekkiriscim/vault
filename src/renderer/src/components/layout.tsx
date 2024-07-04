import { Outlet } from 'react-router-dom'

const Layout = (): JSX.Element => {
  return (
    <div>
      <p>layout</p>
      <Outlet />
    </div>
  )
}

export default Layout
