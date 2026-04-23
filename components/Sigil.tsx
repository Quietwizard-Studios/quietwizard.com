const fixed = (value: number) => Number(value.toFixed(6));

export default function Sigil({
  size = 420,
  opacity = 0.07,
}: {
  size?: number;
  opacity?: number;
}) {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(1,9,18,0.78) 0%, rgba(1,9,18,0.5) 40%, transparent 72%)",
        }}
      />
      <svg
        width={size}
        height={size}
        viewBox="0 0 420 420"
        fill="none"
        className="absolute top-0 left-0"
      >
        <circle cx="210" cy="210" r="200" stroke="var(--teal-glow)" strokeWidth="0.5" opacity={opacity * 2} strokeDasharray="4 8" />
        <circle cx="210" cy="210" r="180" stroke="var(--teal-glow)" strokeWidth="1" opacity={opacity * 1.5} />
        <circle cx="210" cy="210" r="140" stroke="var(--teal-glow)" strokeWidth="0.5" opacity={opacity * 2} strokeDasharray="2 6" />
        <circle cx="210" cy="210" r="100" stroke="var(--teal-glow)" strokeWidth="1" opacity={opacity * 2.5} />
        <circle cx="210" cy="210" r="60" stroke="var(--teal-glow)" strokeWidth="0.5" opacity={opacity * 3} />

        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x1 = fixed(210 + 60 * Math.cos(a));
          const y1 = fixed(210 + 60 * Math.sin(a));
          const x2 = fixed(210 + 200 * Math.cos(a));
          const y2 = fixed(210 + 200 * Math.sin(a));
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--teal-glow)" strokeWidth="0.5" opacity={opacity * 2} />
          );
        })}

        {Array.from({ length: 6 }, (_, i) => {
          const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
          const a2 = ((i + 1) / 6) * Math.PI * 2 - Math.PI / 6;
          const r = 140;
          const x1 = fixed(210 + r * Math.cos(a));
          const y1 = fixed(210 + r * Math.sin(a));
          const x2 = fixed(210 + r * Math.cos(a2));
          const y2 = fixed(210 + r * Math.sin(a2));
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--teal-glow)"
              strokeWidth="1"
              opacity={opacity * 3}
            />
          );
        })}

        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <g key={i}>
              <circle
                cx={fixed(210 + 180 * Math.cos(a))}
                cy={fixed(210 + 180 * Math.sin(a))}
                r="3"
                fill="var(--teal-glow)"
                opacity={opacity * 4}
              />
              <circle
                cx={fixed(210 + 100 * Math.cos(a))}
                cy={fixed(210 + 100 * Math.sin(a))}
                r="2"
                fill="var(--teal-glow)"
                opacity={opacity * 5}
              />
            </g>
          );
        })}

        <polygon points="210,186 234,210 210,234 186,210" stroke="var(--teal-glow)" strokeWidth="1" fill="none" opacity={opacity * 4} />
        <circle cx="210" cy="210" r="8" stroke="var(--teal-glow)" strokeWidth="1.5" fill="none" opacity={opacity * 6} />
        <circle cx="210" cy="210" r="3" fill="var(--teal-glow)" opacity={opacity * 8} />

        <g style={{ transformOrigin: "210px 210px", animation: "rotateSigil 60s linear infinite" }}>
          {Array.from({ length: 24 }, (_, i) => {
            const a = (i / 24) * Math.PI * 2;
            const odd = i % 2 === 0;
            return (
              <circle
                key={i}
                cx={fixed(210 + 198 * Math.cos(a))}
                cy={fixed(210 + 198 * Math.sin(a))}
                r={odd ? 2 : 1}
                fill="var(--teal-glow)"
                opacity={odd ? opacity * 5 : opacity * 2}
              />
            );
          })}
        </g>

        <g style={{ transformOrigin: "210px 210px", animation: "rotateSigilRev 40s linear infinite" }}>
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2;
            const r = 160;
            const x1 = fixed(210 + r * Math.cos(a));
            const y1 = fixed(210 + r * Math.sin(a));
            const x2 = fixed(210 + (r - 18) * Math.cos(a + Math.PI / 8));
            const y2 = fixed(210 + (r - 18) * Math.sin(a + Math.PI / 8));
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--teal-glow)" strokeWidth="1.5" opacity={opacity * 4} />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
