import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "invert";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", icon, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none rounded-md";

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2.5 gap-2",
      lg: "text-base px-6 py-3.5 gap-2.5",
    };

    const variantStyles = {
      // Solid white button that turns black with white border on hover
      primary:
        "bg-white text-black border border-white hover:bg-black hover:text-white hover:border-zinc-400 shadow-sm",
      // Black background with border that inverts to pure white with black text on hover
      secondary:
        "bg-zinc-900 text-zinc-100 border border-zinc-800 hover:bg-white hover:text-black hover:border-white",
      // Subtle outline that inverts to solid white on hover
      outline:
        "bg-transparent text-zinc-300 border border-zinc-700 hover:bg-white hover:text-black hover:border-white",
      // Invert button style
      invert:
        "bg-black text-white border border-zinc-800 hover:bg-white hover:text-black hover:border-white shadow-lg",
      // Ghost button
      ghost:
        "bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-900",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
