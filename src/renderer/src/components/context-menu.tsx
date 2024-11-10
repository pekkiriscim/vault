import * as React from 'react'

import { Check, ChevronRight, Dot } from 'lucide-react'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'

import cn from '@renderer/utils/cn'

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ContextMenuPrimitive.Group

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    className?: string
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded px-1.5 py-1 text-xs font-medium outline-none focus:bg-zinc-50 focus:text-zinc-800 data-[state=open]:bg-zinc-50',
      inset && 'pl-7',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4 text-zinc-500" />
  </ContextMenuPrimitive.SubTrigger>
))

ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent> & {
    className?: string
  }
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'flex flex-col gap-y-0.5 z-50 min-w-[8rem] overflow-hidden rounded-md border border-zinc-200 bg-white p-1 text-zinc-700 shadow-md',
      className
    )}
    {...props}
  />
))

ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content> & { className?: string }
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        'flex flex-col gap-y-0.5 z-50 min-w-[8rem] overflow-hidden rounded-md border border-zinc-200 bg-white p-1 text-zinc-700 shadow-md',
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))

ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    className?: string
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded px-1.5 py-1 text-xs font-medium outline-none focus:bg-zinc-50 focus:text-zinc-800 data-[disabled]:pointer-events-none data-[disabled]:text-zinc-500',
      inset && 'pl-7',
      className
    )}
    {...props}
  />
))

ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem> & {
    className?: string
    checked?: boolean
  }
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded py-1 pl-7 pr-1.5 text-xs font-medium outline-none focus:bg-zinc-50 focus:text-zinc-800 data-[disabled]:pointer-events-none data-[disabled]:text-zinc-500',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-1.5 flex h-4 w-4 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-zinc-500" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))

ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded py-1 pl-7 pr-1.5 text-xs font-medium outline-none focus:bg-zinc-50 focus:text-zinc-800 data-[disabled]:pointer-events-none data-[disabled]:text-zinc-500',
      className
    )}
    {...props}
  >
    <span className="absolute left-1.5 flex h-4 w-4 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Dot className="h-4 w-4 fill-current text-zinc-500" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))

ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    className?: string
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn('px-1.5 py-1 text-xs font-medium text-zinc-700', inset && 'pl-7', className)}
    {...props}
  />
))

ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator> & { className?: string }
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-0.5 h-px bg-zinc-200', className)}
    {...props}
  />
))

ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { className?: string }): JSX.Element => {
  return (
    <span className={cn('ml-auto text-xs tracking-widest text-zinc-500', className)} {...props} />
  )
}

ContextMenuShortcut.displayName = 'ContextMenuShortcut'

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup
}
