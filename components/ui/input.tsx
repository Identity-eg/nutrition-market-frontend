import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "h-[48px] w-full rounded-md bg-gray-20 border-[1px] border-gray-20 hover:border-gray-40 px-[12px] py-[10px] text-N500 outline-none outline-[1.5px] -outline-offset-[1.5px] transition-all focus-within:outline-green-300  focus:outline-green-300 focus-visible:border-green-300 disabled:bg-gray-40 placeholder:typography-R14",
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
