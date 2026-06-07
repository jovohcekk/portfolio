// =====================================
// BUTTON — primary gradient + outline glass
// =====================================

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex max-w-full items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-primary))] disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "btn-gradient text-white shadow-brand hover:brightness-[1.04] hover:shadow-brand-lg transition-all duration-300 btn-glow-pulse",
        outline:
          "border border-[var(--border-subtle)] bg-[rgb(var(--surface-elevated-rgb)/0.6)] text-primary-content hover:bg-[rgb(var(--surface-rgb)/0.8)] hover:border-[var(--border-glow)]",
        ghost: "text-primary-content hover:bg-[rgb(var(--surface-rgb)/0.6)]",
        secondary:
          "bg-[rgb(var(--surface-rgb)/0.85)] text-primary-content border border-[var(--border-subtle)] hover:border-[var(--border-glow)] hover:shadow-soft",
      },
      size: {
        default: "h-11 min-h-[2.75rem] px-4 py-2 xs:px-6",
        sm: "h-9 min-h-[2.25rem] rounded-md px-3 xs:px-4",
        lg: "h-12 min-h-[3rem] rounded-lg px-5 text-base xs:px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
