"use client";

import React, { useEffect, useRef } from "react";

interface ReactiveDotGridProps {
  className?: string;
  dotSpacing?: number;
  baseRadius?: number;
  maxRadius?: number;
  influenceRadius?: number;
}

export function ReactiveDotGrid({
  className = "",
  dotSpacing = 28,
  baseRadius = 1.2,
  maxRadius = 2.8,
  influenceRadius = 150,
}: ReactiveDotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = window.devicePixelRatio || 1;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const cols = Math.floor(width / dotSpacing);
      const rows = Math.floor(height / dotSpacing);
      const offsetX = (width - cols * dotSpacing) / 2 + dotSpacing / 2;
      const offsetY = (height - rows * dotSpacing) / 2 + dotSpacing / 2;

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const originX = offsetX + i * dotSpacing;
          const originY = offsetY + j * dotSpacing;

          let posX = originX;
          let posY = originY;
          let radius = baseRadius;
          let alpha = 0.18;
          let color = "rgba(161, 161, 170, "; // Zinc / Greyish relative to black

          if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - originX;
            const dy = mouse.y - originY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < influenceRadius) {
              const factor = 1 - dist / influenceRadius; // 1 at mouse center, 0 at edge
              
              // Slight physical repulsion away from cursor
              const repelForce = factor * 7;
              const angle = Math.atan2(dy, dx);
              posX -= Math.cos(angle) * repelForce;
              posY -= Math.sin(angle) * repelForce;

              // Size and Luminance increase
              radius = baseRadius + (maxRadius - baseRadius) * factor;
              alpha = 0.2 + 0.75 * factor; // Brightens up to 0.95 near cursor
              
              // Shift color from subtle grey to luminous platinum/white
              if (factor > 0.4) {
                color = "rgba(244, 244, 245, "; // Zinc 100 / Luminous White
              } else {
                color = "rgba(212, 212, 216, "; // Zinc 300
              }
            }
          }

          ctx.beginPath();
          ctx.arc(posX, posY, radius, 0, Math.PI * 2);
          ctx.fillStyle = `${color}${alpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dotSpacing, baseRadius, maxRadius, influenceRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}
