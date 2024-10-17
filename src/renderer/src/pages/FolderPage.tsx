import { memo } from 'react'

import { useParams } from 'react-router-dom'

const FolderPage = (): JSX.Element => {
  const { folderId } = useParams<{ folderId: string }>()

  return (
    <div className="w-full h-full max-w-3xl mx-auto px-6 pb-10 pt-8 flex flex-col items-center gap-y-1">
      {folderId}
    </div>
  )
}

export default memo(FolderPage)
