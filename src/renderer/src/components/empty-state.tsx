const EmptyState = ({
  text,
  supportingText
}: {
  text: string
  supportingText: string
}): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-1 max-w-80 p-5 select-none">
      <p className="text-sm font-medium text-zinc-900 text-center">{text}</p>
      <p className="text-xs text-zinc-600 text-center">{supportingText}</p>
    </div>
  )
}

export default EmptyState
