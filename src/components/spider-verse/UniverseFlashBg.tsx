"use client";

import { useEffect, useRef, useState } from "react";

interface Shard {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  r: number;
  g: number;
  b: number;
  opacity: number;
  pts: [number, number][];
}

const PALETTE: [number, number, number][] = [
  [230, 57, 70],
  [69, 123, 255],
  [123, 47, 190],
  [255, 214, 10],
  [240, 240, 240],
];

function makePolygon(sides: number, w: number, h: number): [number, number][] {
  return Array.from({ length: sides }, (_, i) => {
    const base = (i / sides) * Math.PI * 2;
    const jitter = (Math.random() - 0.5) * (Math.PI / sides) * 1.4;
    const angle = base + jitter;
    const rx = (0.4 + Math.random() * 0.6) * w;
    const ry = (0.4 + Math.random() * 0.6) * h;
    return [Math.cos(angle) * rx, Math.sin(angle) * ry];
  });
}

function makeShard(cw: number, ch: number): Shard {
  const [r, g, b] = PALETTE[Math.floor(Math.random() * PALETTE.length)];
  const sides = 3 + Math.floor(Math.random() * 5); // 3–7 sides
  const w = 35 + Math.random() * 90;
  const h = 25 + Math.random() * 70;
  return {
    x: Math.random() * cw,
    y: Math.random() * ch,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.005,
    r, g, b,
    opacity: 0.09 + Math.random() * 0.13,
    pts: makePolygon(sides, w, h),
  };
}

export default function UniverseFlashBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shardsRef = useRef<Shard[]>([]);
  const rafRef = useRef<number>(0);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (shardsRef.current.length === 0) {
        shardsRef.current = Array.from({ length: 22 }, () =>
          makeShard(canvas.width, canvas.height)
        );
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const drawShard = (s: Shard) => {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot);
      ctx.beginPath();
      ctx.moveTo(s.pts[0][0], s.pts[0][1]);
      for (let i = 1; i < s.pts.length; i++) ctx.lineTo(s.pts[i][0], s.pts[i][1]);
      ctx.closePath();
      ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${s.opacity})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${s.r},${s.g},${s.b},${Math.min(s.opacity * 4, 0.7)})`;
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pad = 240;

      for (const s of shardsRef.current) {
        s.x += s.vx;
        s.y += s.vy;
        s.rot += s.vr;

        if (s.x > canvas.width + pad) s.x = -pad;
        else if (s.x < -pad) s.x = canvas.width + pad;
        if (s.y > canvas.height + pad) s.y = -pad;
        else if (s.y < -pad) s.y = canvas.height + pad;

        drawShard(s);
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timeout = setTimeout(() => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 120 + Math.random() * 180);
        schedule();
      }, 4000 + Math.random() * 6000);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {glitching && (
        <>
          <div className="absolute inset-0" style={{ background: "#E63946", opacity: 0.08, transform: "translateX(-5px)" }} />
          <div className="absolute inset-0" style={{ background: "#457BFF", opacity: 0.08, transform: "translateX(5px)" }} />
        </>
      )}
    </div>
  );
}
