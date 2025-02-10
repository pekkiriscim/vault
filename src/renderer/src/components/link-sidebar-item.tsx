import { Globe } from 'lucide-react'

import { Link } from 'react-router-dom'

import ImageWithFallback from '@renderer/components/image-with-fallback'

const LinkSidebarItem = ({ link }: { link: Link }): JSX.Element => {
  return (
    <Link
      to={link.url}
      target="_blank"
      className="w-full flex items-center justify-start px-2 py-1 rounded cursor-default gap-x-2"
    >
      <ImageWithFallback
        src={link.iconUrl}
        className="size-5 rounded"
        fallback={<Globe className="size-5 text-zinc-500 min-w-5 min-h-5" />}
      />
      <p className="max-w-32 text-sm font-medium text-zinc-700 whitespace-nowrap overflow-hidden text-ellipsis">
        {link.title}
      </p>
    </Link>
  )
}

export default LinkSidebarItem
