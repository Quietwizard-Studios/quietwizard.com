"use client";

import { useEffect, useRef } from "react";

// ── Arc Reactor — pure JSX so React owns the lifecycle ───────────
const RINGS = [
  { r: 420, stroke: "rgba(0,200,255,0.1)",  sw: 0.75, dash: "5 22",        spd: "130s", cw: true,  ticks: 0 },
  { r: 370, stroke: "rgba(0,200,255,0.18)", sw: 1,    dash: "160 80 20 60", spd: "75s",  cw: false, ticks: 24, tl: 7 },
  { r: 310, stroke: "rgba(0,200,255,0.28)", sw: 1.25, dash: "90 35 18 35",  spd: "48s",  cw: true,  ticks: 12, tl: 10 },
  { r: 248, stroke: "rgba(0,200,255,0.38)", sw: 1.5,  dash: "55 18 10 18",  spd: "30s",  cw: false, ticks: 0 },
  { r: 190, stroke: "rgba(0,210,255,0.5)",  sw: 2,    dash: "28 8",         spd: "19s",  cw: true,  ticks: 8,  tl: 8 },
  { r: 135, stroke: "rgba(0,220,255,0.62)", sw: 2.5,  dash: "14 4",         spd: "12s",  cw: false, ticks: 0 },
  { r: 82,  stroke: "rgba(0,235,255,0.78)", sw: 2,    dash: "10 3",         spd: "8s",   cw: true,  ticks: 6,  tl: 6 },
  { r: 44,  stroke: "rgba(0,245,255,0.9)",  sw: 1.5,  dash: "",             spd: "5s",   cw: false, ticks: 0 },
] as const;

function ArcReactor() {
  return (
    <div
      id="qws-arc-reactor"
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-[1] overflow-hidden"
      style={{ animation: "hudPulse 8s ease-in-out infinite" }}
    >
      <svg
        width="900" height="900"
        viewBox="-450 -450 900 900"
        fill="none"
        style={{ overflow: "visible", maxWidth: "100vw", maxHeight: "100vh" }}
      >
        {/* Axis guides */}
        <line x1="-430" y1="0" x2="430" y2="0" stroke="rgba(0,200,255,0.06)" strokeWidth="0.5" />
        <line x1="0" y1="-430" x2="0" y2="430" stroke="rgba(0,200,255,0.06)" strokeWidth="0.5" />
        <line x1="-310" y1="-310" x2="310" y2="310" stroke="rgba(0,200,255,0.03)" strokeWidth="0.5" />
        <line x1="310" y1="-310" x2="-310" y2="310" stroke="rgba(0,200,255,0.03)" strokeWidth="0.5" />

        {RINGS.map((ring, i) => (
          <g
            key={i}
            style={{
              transformOrigin: "0px 0px",
              animation: `${ring.cw ? "rotateArc" : "rotateArcR"} ${ring.spd} linear infinite`,
            }}
          >
            <circle
              r={ring.r}
              stroke={ring.stroke}
              strokeWidth={ring.sw}
              strokeDasharray={ring.dash || undefined}
            />
            {"tl" in ring && ring.ticks > 0 && ring.tl && Array.from({ length: ring.ticks }, (_, j) => {
              const a = (j / ring.ticks) * Math.PI * 2;
              const cos = Math.cos(a), sin = Math.sin(a);
              const r0 = ring.r - ring.tl / 2, r1 = ring.r + ring.tl / 2;
              const tickStroke = ring.stroke.replace(/[\d.]+\)$/, "0.7)");
              return (
                <line
                  key={j}
                  x1={cos * r0} y1={sin * r0}
                  x2={cos * r1} y2={sin * r1}
                  stroke={tickStroke}
                  strokeWidth="1.25"
                />
              );
            })}
          </g>
        ))}

        {/* Center glow disc */}
        <circle r="22" fill="rgba(0,160,255,0.025)" stroke="rgba(0,230,255,0.13)" strokeWidth="1" />
      </svg>
    </div>
  );
}

// ── HUD corner SVG ───────────────────────────────────────────────
function HUDCorner({ animation }: { animation: string }) {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <path d="M4 80 L4 4 L80 4" stroke="rgba(0,200,255,0.55)" strokeWidth="1.5" />
      <path d="M4 52 L4 18 L52 4" stroke="rgba(0,200,255,0.2)" strokeWidth="0.75" strokeDasharray="3 4" />
      <line x1="20" y1="4" x2="20" y2="9" stroke="rgba(0,200,255,0.4)" strokeWidth="1" />
      <line x1="36" y1="4" x2="36" y2="7" stroke="rgba(0,200,255,0.25)" strokeWidth="0.75" />
      <line x1="52" y1="4" x2="52" y2="9" stroke="rgba(0,200,255,0.4)" strokeWidth="1" />
      <line x1="68" y1="4" x2="68" y2="7" stroke="rgba(0,200,255,0.25)" strokeWidth="0.75" />
      <line x1="4" y1="20" x2="9" y2="20" stroke="rgba(0,200,255,0.4)" strokeWidth="1" />
      <line x1="4" y1="36" x2="7" y2="36" stroke="rgba(0,200,255,0.25)" strokeWidth="0.75" />
      <line x1="4" y1="52" x2="9" y2="52" stroke="rgba(0,200,255,0.4)" strokeWidth="1" />
      <line x1="4" y1="68" x2="7" y2="68" stroke="rgba(0,200,255,0.25)" strokeWidth="0.75" />
      <circle cx="4" cy="4" r="3" fill="rgba(0,200,255,0.8)" />
      <circle cx="4" cy="4" r="7" stroke="rgba(0,200,255,0.3)" strokeWidth="0.75" fill="none" />
      <circle cx="80" cy="4" r="2" fill="rgba(0,200,255,0.4)" />
      <circle cx="4" cy="80" r="2" fill="rgba(0,200,255,0.4)" />
      <g style={{ transformOrigin: "4px 4px", animation }}>
        <path d="M4,24 A20,20 0 0,1 24,4" stroke="rgba(0,200,255,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
      <rect x="12" y="12" width="28" height="16" fill="rgba(0,200,255,0.04)" stroke="rgba(0,200,255,0.18)" strokeWidth="0.5" />
      <line x1="12" y1="20" x2="40" y2="20" stroke="rgba(0,200,255,0.1)" strokeWidth="0.5" />
    </svg>
  );
}

const hudDataStyle: React.CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 3,
  fontFamily: "var(--font-jetbrains-mono), monospace",
  fontSize: 8,
  color: "rgba(0,200,255,0.45)",
  letterSpacing: "0.1em",
  lineHeight: 1.7,
  animation: "dataFlicker 8s infinite",
};

export default function HUDBackground() {
  const honeycombRef = useRef<HTMLCanvasElement>(null);
  const hexgridRef = useRef<HTMLCanvasElement>(null);
  const hudTimeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {

    // ── Honeycomb ──────────────────────────────────────────────
    const hc = honeycombRef.current;
    if (!hc) return;
    const ctx = hc.getContext("2d")!;

    function drawHoneycomb() {
      const W = (hc!.width = window.innerWidth);
      const H = (hc!.height = window.innerHeight);
      ctx.clearRect(0, 0, W, H);
      const R = 28;
      const cw = R * (3 / 2);
      const rh = R * Math.sqrt(3);
      const cols = Math.ceil(W / cw) + 3;
      const rows = Math.ceil(H / rh) + 3;
      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          const cx = col * cw;
          const cy = row * rh + (col % 2 === 0 ? 0 : rh / 2);
          const dx = cx / W - 0.5;
          const dy = cy / H - 0.42;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const alpha = Math.max(0, 0.09 - dist * 0.15);
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i;
            const px = cx + R * Math.cos(a);
            const py = cy + R * Math.sin(a);
            if (i === 0) {
              ctx.moveTo(px, py);
            } else {
              ctx.lineTo(px, py);
            }
          }
          ctx.closePath();
          ctx.strokeStyle = `rgba(0,180,255,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
          if (dist < 0.18 && Math.random() < 0.04) {
            ctx.fillStyle = `rgba(0,160,255,${alpha * 0.18})`;
            ctx.fill();
          }
        }
      }
    }
    drawHoneycomb();
    window.addEventListener("resize", drawHoneycomb);

    // ── Hexgrid + circuit traces ──────────────────────────────
    const hg = hexgridRef.current;
    if (!hg) return;
    const hx = hg.getContext("2d")!;
    let W = 0, H = 0;
    let offscreen: HTMLCanvasElement | null = null;

    const PATHS: number[][][] = [
      [[0.5,0.42],[0.64,0.42],[0.64,0.36],[0.8,0.36],[0.8,0.41],[0.96,0.41]],
      [[0.5,0.44],[0.7,0.44],[0.7,0.54],[0.86,0.54],[0.86,0.49],[0.99,0.49]],
      [[0.5,0.47],[0.76,0.47],[0.76,0.63],[0.91,0.63],[0.91,0.58]],
      [[0.5,0.5],[0.6,0.5],[0.6,0.7],[0.74,0.7],[0.74,0.76],[0.9,0.76]],
      [[0.5,0.42],[0.36,0.42],[0.36,0.36],[0.2,0.36],[0.2,0.41],[0.04,0.41]],
      [[0.5,0.44],[0.3,0.44],[0.3,0.54],[0.14,0.54],[0.14,0.49],[0.01,0.49]],
      [[0.5,0.47],[0.24,0.47],[0.24,0.63],[0.09,0.63],[0.09,0.58]],
      [[0.5,0.5],[0.4,0.5],[0.4,0.7],[0.26,0.7],[0.26,0.76],[0.1,0.76]],
      [[0.5,0.42],[0.5,0.28],[0.62,0.28],[0.62,0.16],[0.54,0.16],[0.54,0.04]],
      [[0.5,0.42],[0.5,0.24],[0.38,0.24],[0.38,0.12],[0.43,0.12]],
      [[0.5,0.52],[0.5,0.72],[0.64,0.72],[0.64,0.84],[0.58,0.84]],
      [[0.5,0.52],[0.5,0.74],[0.38,0.74],[0.38,0.86]],
    ];

    function calcMeta(path: number[][]) {
      const segs: number[] = [];
      let total = 0;
      for (let i = 1; i < path.length; i++) {
        const dx = path[i][0] - path[i-1][0], dy = path[i][1] - path[i-1][1];
        const len = Math.sqrt(dx*dx + dy*dy);
        segs.push(len); total += len;
      }
      return { segs, total };
    }

    function pointAtT(path: number[][], segs: number[], total: number, t: number, w: number, h: number) {
      const target = t * total; let dist = 0;
      for (let i = 0; i < segs.length; i++) {
        if (dist + segs[i] >= target) {
          const f = segs[i] > 0 ? (target - dist) / segs[i] : 0;
          const p0 = path[i], p1 = path[i+1] || path[i];
          return { x: (p0[0] + (p1[0]-p0[0])*f)*w, y: (p0[1] + (p1[1]-p0[1])*f)*h };
        }
        dist += segs[i];
      }
      const l = path[path.length-1]; return { x: l[0]*w, y: l[1]*h };
    }

    const pulses = PATHS.map(path => ({
      path, meta: calcMeta(path),
      t: Math.random(), speed: 0.00025 + Math.random()*0.00015,
    }));

    function buildGrid(w: number, h: number) {
      offscreen = document.createElement("canvas");
      offscreen.width = w; offscreen.height = h;
      const oc = offscreen.getContext("2d")!;
      const vx = w/2, vy = h*0.42, rows = 22, cols = 30;
      for (let i = 1; i <= rows; i++) {
        const t = Math.pow(i/rows, 1.7);
        const y = vy + (h-vy)*t, halfW = w*0.6*t, a = 0.035 + 0.13*t;
        oc.strokeStyle = `rgba(0,180,255,${a})`; oc.lineWidth = 0.25 + t*1.1;
        oc.beginPath(); oc.moveTo(vx-halfW, y); oc.lineTo(vx+halfW, y); oc.stroke();
      }
      for (let i = -cols/2; i <= cols/2; i++) {
        const bx = vx + (w/cols)*i*1.45, a = 0.045*(1 - Math.abs(i)/(cols/2)*0.55);
        oc.strokeStyle = `rgba(0,180,255,${a})`; oc.lineWidth = 0.45;
        oc.beginPath(); oc.moveTo(vx, vy); oc.lineTo(bx, h); oc.stroke();
      }
      for (let i = 1; i <= rows; i++) {
        const t = Math.pow(i/rows, 1.7);
        const y = vy - vy*t, halfW = w*0.6*t, a = 0.018 + 0.055*t;
        oc.strokeStyle = `rgba(0,180,255,${a})`; oc.lineWidth = 0.2 + t*0.55;
        oc.beginPath(); oc.moveTo(vx-halfW, y); oc.lineTo(vx+halfW, y); oc.stroke();
      }
      for (let i = -cols/2; i <= cols/2; i++) {
        const bx = vx + (w/cols)*i*1.45, a = 0.022*(1 - Math.abs(i)/(cols/2)*0.55);
        oc.strokeStyle = `rgba(0,180,255,${a})`; oc.lineWidth = 0.3;
        oc.beginPath(); oc.moveTo(vx, vy); oc.lineTo(bx, 0); oc.stroke();
      }
      const hGrad = oc.createLinearGradient(0, vy-40, 0, vy+40);
      hGrad.addColorStop(0, "transparent"); hGrad.addColorStop(0.5, "rgba(0,160,255,0.09)"); hGrad.addColorStop(1, "transparent");
      oc.fillStyle = hGrad; oc.fillRect(0, vy-40, w, 80);
    }

    let time = 0, animId: number;

    function drawHexgrid() {
      hx.clearRect(0, 0, W, H); time += 0.004;
      if (offscreen) hx.drawImage(offscreen, 0, 0);
      const gR = Math.min(W,H)*0.38, p = 0.5 + Math.sin(time*0.65)*0.14;
      const g1 = hx.createRadialGradient(W/2, H*0.42, 0, W/2, H*0.42, gR);
      g1.addColorStop(0, `rgba(0,130,240,${0.045*p})`); g1.addColorStop(0.45, `rgba(0,90,200,${0.02*p})`); g1.addColorStop(1, "rgba(0,0,0,0)");
      hx.fillStyle = g1; hx.fillRect(0, 0, W, H);
      ([[0.18,0.32,0.015],[0.82,0.5,0.015],[0.5,0.82,0.01]] as [number,number,number][]).forEach(([fx,fy,a]) => {
        const g = hx.createRadialGradient(fx*W, fy*H, 0, fx*W, fy*H, gR*0.42);
        g.addColorStop(0, `rgba(0,70,180,${a*p})`); g.addColorStop(1, "rgba(0,0,0,0)");
        hx.fillStyle = g; hx.fillRect(0, 0, W, H);
      });
      pulses.forEach(p2 => {
        hx.beginPath();
        p2.path.forEach(([fx,fy], i) => {
          if (i === 0) {
            hx.moveTo(fx * W, fy * H);
          } else {
            hx.lineTo(fx * W, fy * H);
          }
        });
        hx.strokeStyle = "rgba(0,160,255,0.11)"; hx.lineWidth = 0.8; hx.stroke();
        p2.t = (p2.t + p2.speed) % 1;
        const pos = pointAtT(p2.path, p2.meta.segs, p2.meta.total, p2.t, W, H);
        const pg = hx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 14);
        pg.addColorStop(0, "rgba(0,220,255,0.75)"); pg.addColorStop(1, "rgba(0,220,255,0)");
        hx.beginPath(); hx.arc(pos.x, pos.y, 14, 0, Math.PI*2); hx.fillStyle = pg; hx.fill();
        hx.beginPath(); hx.arc(pos.x, pos.y, 2.5, 0, Math.PI*2); hx.fillStyle = "rgba(220,245,255,0.95)"; hx.fill();
      });
      animId = requestAnimationFrame(drawHexgrid);
    }

    function resizeHexgrid() {
      W = hg!.width = window.innerWidth; H = hg!.height = window.innerHeight; buildGrid(W, H);
    }
    window.addEventListener("resize", resizeHexgrid);

    function onMouseMove(e: MouseEvent) {
      const rx = (e.clientX/window.innerWidth - 0.5)*10;
      const ry = (e.clientY/window.innerHeight - 0.5)*6;
      hg!.style.transform = `translate(${rx}px,${ry}px) scale(1.015)`;
    }
    window.addEventListener("mousemove", onMouseMove);

    function onScroll() {
      const t = Math.min(window.scrollY/window.innerHeight, 1);
      hg!.style.opacity = String(1 - t*0.62);
      const arcEl = document.getElementById("qws-arc-reactor");
      if (arcEl) arcEl.style.opacity = String(0.85 - t*0.65);
    }
    window.addEventListener("scroll", onScroll);

    resizeHexgrid();
    drawHexgrid();

    // ── Live clock ────────────────────────────────────────────
    const hudTime = hudTimeRef.current;
    let clockTimer: ReturnType<typeof setTimeout>;
    if (hudTime) {
      function tick() {
        const n = new Date();
        const off = n.getTimezoneOffset();
        const sign = off > 0 ? "-" : "+";
        const hrs = String(Math.abs(off/60)).padStart(2, "0");
        hudTime!.textContent = `${n.toTimeString().slice(0, 8)} UTC${sign}${hrs}:00`;
        clockTimer = setTimeout(tick, 1000);
      }
      tick();
    }

    return () => {
      clearTimeout(clockTimer);
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", drawHoneycomb);
      window.removeEventListener("resize", resizeHexgrid);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <canvas ref={honeycombRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
      <canvas ref={hexgridRef}   className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse at 50% 42%, rgba(0,120,220,0.055) 0%, transparent 52%),
            radial-gradient(ellipse at 18% 33%, rgba(0,60,160,0.025) 0%, transparent 38%),
            radial-gradient(ellipse at 82% 48%, rgba(0,60,160,0.025) 0%, transparent 38%),
            radial-gradient(ellipse at 50% 40%, transparent 28%, rgba(1,9,18,0.65) 72%, rgba(1,9,18,0.92) 100%)`,
        }}
      />

      {/* Arc reactor — pure JSX, React controls its lifetime */}
      <ArcReactor />

      {/* Scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-[6]"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.045) 3px, rgba(0,0,0,0.045) 4px)",
          animation: "glitch 14s infinite 3s",
        }}
      />

      {/* HUD corners */}
      <div className="fixed top-0 left-0 w-[120px] h-[120px] pointer-events-none z-[3]">
        <HUDCorner animation="rotateArc 8s linear infinite" />
      </div>
      <div className="fixed top-0 right-0 w-[120px] h-[120px] pointer-events-none z-[3]" style={{ transform: "scaleX(-1)" }}>
        <HUDCorner animation="rotateArcR 8s linear infinite" />
      </div>
      <div className="fixed bottom-0 left-0 w-[120px] h-[120px] pointer-events-none z-[3]" style={{ transform: "scaleY(-1)" }}>
        <HUDCorner animation="rotateArc 12s linear infinite" />
      </div>
      <div className="fixed bottom-0 right-0 w-[120px] h-[120px] pointer-events-none z-[3]" style={{ transform: "scale(-1)" }}>
        <HUDCorner animation="rotateArcR 12s linear infinite" />
      </div>

      {/* HUD data readouts */}
      <div style={{ ...hudDataStyle, top: 128, left: 20 }}>
        SYS.COORD // 37.774°N 122.419°W<br />
        NODE.COUNT: 090 / 090<br />
        NET.STATUS: NOMINAL<br />
        PWR: ████████░░ 82%
      </div>
      <div style={{ ...hudDataStyle, top: 128, right: 20, textAlign: "right" }}>
        ARCH.MODE: ACTIVE<br />
        THREAT.LVL: 000<br />
        SHIELD.INT: ONLINE<br />
        UPTIME: 99.97%
      </div>
      <div style={{ ...hudDataStyle, bottom: 20, left: 20 }}>
        BUILD: QWS-7.4.2 // STABLE<br />
        AGENT.POOL: 12 ONLINE<br />
        API.LATENCY: 18ms
      </div>
      <div style={{ ...hudDataStyle, bottom: 20, right: 20, textAlign: "right" }}>
        TIMESTAMP: <span ref={hudTimeRef} /><br />
        SESSION: SECURE / AES-256<br />
        ACCESS: GRANTED
      </div>
    </>
  );
}
