"use client";

interface SectionBgProps {
  accent: string;
  /** Path to a wallpaper image (relative to /public), e.g. "/wallpapers/articles.jpg" */
  image?: string;
  /** 0–1, how strong the accent colour bleeds in. Default 0.12 */
  intensity?: number;
}

/**
 * Fixed decorative background for list / section pages.
 * Sits at z-index -1 so page content scrolls over it.
 */
export default function SectionBg({ accent, image, intensity = 0.12 }: SectionBgProps) {
  // Convert hex to rgba helper (only handles 6-digit hex)
  const toRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const faint = toRgba(accent, intensity);
  const faint2 = toRgba(accent, intensity * 0.5);

  return (
    <>
      {/* Fixed full-screen base */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -1 }}
        aria-hidden
      >
        {/* ── Wallpaper layer ── */}
        {image && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}

        {/* Dark base — strong enough to keep content readable over any photo */}
        <div
          className="absolute inset-0"
          style={{ background: image ? "rgba(10,10,15,0.72)" : "#0A0A0F" }}
        />
        {/* Accent radial from top-left */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 55% at 0% 0%, ${faint} 0%, transparent 70%)`,
          }}
        />
        {/* Secondary glow bottom-right */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 50% 40% at 100% 100%, ${faint2} 0%, transparent 65%)`,
          }}
        />

        {/* Dot-grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${toRgba(accent, 0.18)} 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Spider-web radial lines from top-left — pure SVG, no external image */}
        <svg
          className="absolute top-0 left-0 w-[640px] h-[640px] opacity-[0.06]"
          viewBox="0 0 640 640"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 16 }, (_, i) => {
            const angle = (i * Math.PI) / 8; // 16 rays, 0–π (top-left quadrant extended)
            const x = Math.cos(angle) * 900;
            const y = Math.sin(angle) * 900;
            return (
              <line key={i} x1="0" y1="0" x2={x} y2={y} stroke={accent} strokeWidth="1" />
            );
          })}
        </svg>

        {/* Floating orbs */}
        <Orb color={accent} size={320} x="15%" y="30%" delay={0} duration={9} alpha={0.06} />
        <Orb color={accent} size={180} x="72%" y="18%" delay={2} duration={7} alpha={0.07} />
        <Orb color={accent} size={240} x="60%" y="65%" delay={4} duration={11} alpha={0.05} />
        <Orb color={accent} size={120} x="38%" y="80%" delay={1} duration={8} alpha={0.08} />
      </div>

      {/* Keyframe styles injected once per accent (safe — same accent = same class) */}
      <style>{`
        @keyframes sb-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-18px) scale(1.04); }
        }
      `}</style>
    </>
  );
}

function Orb({
  color,
  size,
  x,
  y,
  delay,
  duration,
  alpha,
}: {
  color: string;
  size: number;
  x: string;
  y: string;
  delay: number;
  duration: number;
  alpha: number;
}) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(${r},${g},${b},${alpha}) 0%, transparent 70%)`,
        animation: `sb-float ${duration}s ${delay}s ease-in-out infinite`,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
