import * as React from "react";

import cn from "@/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full h-[1.75rem] rounded-md border border-zinc-300 bg-zinc-50 px-2 py-1 text-sm text-zinc-900 placeholder:text-zinc-500 focus-visible:outline-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
