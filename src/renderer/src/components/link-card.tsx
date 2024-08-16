import { Link } from 'react-router-dom'

const LinkCard = ({ link }: { link: Link }): JSX.Element => {
  return (
    <Link
      to={link.url}
      target="_blank"
      className="w-full px-3 py-2 rounded-md flex items-center justify-start gap-x-2 cursor-default hover:bg-zinc-50"
    >
      {link.iconUrl && <img src={link.iconUrl} className="size-5 rounded" />}
      <p className="text-sm font-medium text-zinc-900">{link.title}</p>
    </Link>
  )
}

export default LinkCard
