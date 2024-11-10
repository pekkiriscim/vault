import * as React from 'react'

import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'

import cn from '@renderer/utils/cn'

const labelVariants = cva('w-fit text-xs font-medium text-zinc-700')

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
))

Label.displayName = LabelPrimitive.Root.displayName

export { Label }
