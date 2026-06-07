// =====================================
// INPUT — surface-input klasslari
// =====================================

import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full min-w-0 max-w-full rounded-lg border px-4 py-2 text-sm backdrop-blur-sm transition-colors duration-300",
          "surface-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-primary))]",
          "disabled:cursor-not-allowed disabled:opacity-50",
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
