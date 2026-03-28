export default function ActionLines({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <radialGradient id="fadeOut" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="60%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </radialGradient>
        <mask id="radialMask">
          <rect width="100%" height="100%" fill="url(#fadeOut)" />
        </mask>
      </defs>
      <g mask="url(#radialMask)" opacity="0.06">
        {Array.from({ length: 36 }).map((_, i) => {
          const angle = (i / 36) * 360;
          const rad = (angle * Math.PI) / 180;
          const x2 = 50 + Math.cos(rad) * 100;
          const y2 = 50 + Math.sin(rad) * 100;
          return (
            <line
              key={i}
              x1="50%"
              y1="50%"
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="white"
              strokeWidth="1.5"
            />
          );
        })}
      </g>
    </svg>
  );
}
