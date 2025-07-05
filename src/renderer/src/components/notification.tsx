import { Toaster } from 'sonner'

import { CircleAlert, CircleCheck, Info, Loader, TriangleAlert } from 'lucide-react'

const Notification = (): JSX.Element => {
  return (
    <Toaster
      visibleToasts={2}
      className="w-80"
      offset="1.25rem"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'w-full flex items-center p-3 bg-white border border-zinc-300 rounded-lg shadow-md [&>div[data-icon]]:mr-1 [&>div[data-icon]]:ml-0 [&>div[data-content]]:gap-y-[0.125rem] cursor-default select-none',
          title: 'text-xs font-medium text-zinc-900',
          description: 'text-xs text-zinc-600'
        }
      }}
      gap={12}
      icons={{
        success: <CircleCheck className="size-4 text-zinc-700" />,
        info: <Info className="size-4 text-zinc-700" />,
        warning: <TriangleAlert className="size-4 text-zinc-700" />,
        error: <CircleAlert className="size-4 text-zinc-700" />,
        loading: <Loader className="size-4 text-zinc-700  animate-spin" />
      }}
    />
  )
}

export default Notification
