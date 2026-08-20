import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "invert" | "subtle";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default:
        "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-white hover:text-black hover:border-white",
      outline:
        "bg-transparent text-zinc-400 border border-zinc-800 hover:border-zinc-500 hover:text-white",
      invert:
        "bg-black text-zinc-200 border border-zinc-800 hover:bg-white hover:text-black hover:border-white",
      subtle:
        "bg-zinc-900/60 text-zinc-400 border border-zinc-800/50",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-all duration-200 cursor-default select-none",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
