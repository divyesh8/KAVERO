"use client";

import { useEffect, useRef } from "react";

type Bean = {
  x: number; y: number; vx: number; vy: number;
  radius: number; rotation: number; spin: number;
  landed: boolean; spawnAt: number;
};

/**
 * Canvas physics: staggered emission from upper-left, acceleration,
 * rotation, subtle collisions with the ground, bounded pixel ratio.
 * This belongs to the preloader ONLY. It renders no permanent page content.
 */
export function CoffeeBeanRain({ durationMs = 2900 }: { durationMs?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    const ctx = context;
    let width = 0;
    let height = 0;
    let frame = 0;
    let previous = 0;
    let start = 0;
    let seed = 913;
    let beans: Bean[] = [];
    let stopped = false;

    function random() {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    }

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = Math.max(1, Math.floor(width * ratio));
      canvas!.height = Math.max(1, Math.floor(height * ratio));
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      seed = 913;
      beans = Array.from({ length: 27 }, (_, i) => ({
        x: random() * Math.min(width * 0.32, 340) - 70,
        y: -20 - random() * 95,
        vx: 50 + random() * 125,
        vy: 5 + random() * 35,
        radius: 7 + random() * 6,
        rotation: random() * Math.PI * 2,
        spin: (random() - 0.5) * 7,
        landed: false,
        spawnAt: i * 42 + random() * 120,
      }));
    }

    function drawBean(bean: Bean) {
      ctx.save();
      ctx.translate(bean.x, bean.y);
      ctx.rotate(bean.rotation);
      ctx.scale(1.25, 0.78);
      const gradient = ctx.createRadialGradient(-bean.radius * 0.5, -bean.radius * 0.7, 1, 0, 0, bean.radius * 1.7);
      gradient.addColorStop(0, "#8a5734");
      gradient.addColorStop(0.46, "#5b311c");
      gradient.addColorStop(1, "#211008");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(0, 0, bean.radius * 1.28, bean.radius, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(226,166,113,0.7)";
      ctx.lineWidth = Math.max(0.8, bean.radius * 0.09);
      ctx.beginPath();
      ctx.moveTo(-bean.radius * 0.2, -bean.radius * 0.78);
      ctx.bezierCurveTo(bean.radius * 0.4, -bean.radius * 0.5, -bean.radius * 0.44, bean.radius * 0.15, bean.radius * 0.22, bean.radius * 0.8);
      ctx.stroke();
      ctx.restore();
    }

    function animate(now: number) {
      if (stopped) return;
      if (!start) start = now;
      if (!previous) previous = now;
      const dt = Math.min((now - previous) / 1000, 0.035);
      const elapsed = now - start;
      previous = now;
      ctx.clearRect(0, 0, width, height);
      for (const bean of beans) {
        if (elapsed < bean.spawnAt) continue;
        if (!bean.landed) {
          bean.vy += 510 * dt;
          bean.x += bean.vx * dt;
          bean.y += bean.vy * dt;
          bean.rotation += bean.spin * dt;
          const ground = height - 8 - bean.radius;
          if (bean.y >= ground) {
            bean.y = ground;
            bean.vy *= -0.28;
            bean.vx *= 0.68;
            bean.spin *= 0.62;
            if (Math.abs(bean.vy) < 34) bean.landed = true;
          }
        }
        drawBean(bean);
      }
      if (elapsed < durationMs) frame = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    frame = requestAnimationFrame(animate);
    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [durationMs]);

  return <canvas ref={canvasRef} className="kavero-bean-rain" aria-hidden="true" />;
}
