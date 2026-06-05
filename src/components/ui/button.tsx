// =====================================
// BUTTON — primary gradient + outline glass
// =====================================

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-primary text-white shadow-brand hover:brightness-110 hover:shadow-brand-lg dark:hover:shadow-[0_8px_32px_rgba(37,99,235,0.25),0_0_20px_rgba(236,72,153,0.15)]",
        outline:
          "border border-[var(--border-strong)] bg-transparent text-primary-content hover:bg-[rgb(var(--surface-rgb)/0.5)] hover:border-[#2563EB]",
        ghost: "text-primary-content hover:bg-[rgb(var(--surface-rgb)/0.5)]",
        secondary:
          "bg-[rgb(var(--surface-rgb)/0.9)] text-primary-content border border-[var(--border-subtle)] hover:border-[#2563EB]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-lg px-8 text-base",
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
