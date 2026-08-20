import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  invertOnHover?: boolean;
  borderGlow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, invertOnHover = false, borderGlow = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl bg-zinc-950/80 border border-zinc-800/80 p-6 transition-all duration-300",
          borderGlow && "hover:border-zinc-500/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]",
          invertOnHover &&
            "hover:bg-white hover:text-black hover:border-white [&_*]:transition-colors duration-300 [&:hover_*]:text-black [&:hover_svg]:stroke-black [&:hover_.badge-invert]:bg-black [&:hover_.badge-invert]:text-white",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
