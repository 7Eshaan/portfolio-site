"use client";

import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  invertOnHover?: boolean;
  borderGlow?: boolean;
  tilt?: boolean;
  maxTilt?: number;
  glare?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      invertOnHover = false,
      borderGlow = true,
      tilt = true,
      maxTilt = 7,
      glare = true,
      children,
      ...props
    },
    ref
  ) => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [transform, setTransform] = useState<string>("");
    const [glarePos, setGlarePos] = useState<{ x: number; y: number; opacity: number }>({
      x: 50,
      y: 50,
      opacity: 0,
    });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!tilt) return;
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) / width - 0.5;
        const mouseY = (e.clientY - rect.top) / height - 0.5;

        const rotateX = -mouseY * maxTilt * 2;
        const rotateY = mouseX * maxTilt * 2;

        setTransform(
          `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
        );

        if (glare) {
          setGlarePos({
            x: ((e.clientX - rect.left) / width) * 100,
            y: ((e.clientY - rect.top) / height) * 100,
            opacity: 0.18,
          });
        }
      },
      [tilt, maxTilt, glare]
    );

    const handleMouseEnter = () => {
      if (tilt) setIsHovered(true);
    };

    const handleMouseLeave = () => {
      if (tilt) {
        setIsHovered(false);
        setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
        setGlarePos((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    return (
      <div
        ref={(node) => {
          cardRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: transform || undefined,
          transition: isHovered
            ? "transform 100ms ease-out"
            : "transform 500ms cubic-bezier(0.03, 0.98, 0.52, 0.99)",
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "rounded-xl bg-zinc-950/80 border border-zinc-800/80 p-6 transition-all duration-300 relative overflow-hidden will-change-transform",
          borderGlow && "hover:border-zinc-500/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]",
          invertOnHover &&
            "hover:bg-white hover:text-black hover:border-white [&_*]:transition-colors duration-300 [&:hover_*]:text-black [&:hover_svg]:stroke-black [&:hover_.badge-invert]:bg-black [&:hover_.badge-invert]:text-white",
          className
        )}
        {...props}
      >
        {children}

        {/* 3D Holographic Surface Glare Reflection */}
        {glare && tilt && (
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-30"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.3), transparent 70%)`,
            }}
          />
        )}
      </div>
    );
  }
);

Card.displayName = "Card";
