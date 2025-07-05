import { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import cn from '@renderer/utils/cn'

const SidebarItem = ({
  title,
  count,
  path,
  icon
}: {
  title: string
  count: number
  path: string
  icon: LucideIcon
}): JSX.Element => {
  const Icon = icon

  return (
    <NavLink
      to={path}
      draggable="false"
      className={({ isActive }) =>
        cn(
          'w-full flex items-center justify-between px-2 py-1 rounded cursor-default select-none',
          isActive && 'bg-zinc-50 [&>div>p]:text-zinc-800'
        )
      }
    >
      <div className="flex items-center justify-start gap-x-2">
        <Icon className="size-5 text-zinc-500" />
        <p className="text-sm font-medium text-zinc-700">{title}</p>
      </div>
      <p className="text-xs font-medium text-zinc-700">{count}</p>
    </NavLink>
  )
}

export default SidebarItem
