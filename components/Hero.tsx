"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import TerminalLine from "./TerminalLine";

const Sigil = dynamic(() => import("./Sigil"), { ssr: false });

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-[120px] px-4 sm:px-6 lg:px-8 pb-20 z-[1]">
      <Sigil size={600} opacity={0.11} />

      <div
        className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[700px] pointer-events-none max-md:w-[560px] max-md:h-[520px] max-sm:w-[300px] max-sm:h-[280px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,160,255,0.03) 0%, rgba(0,80,180,0.015) 40%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[900px] mx-auto text-center z-[2]">
        {/* Terminal prompt */}
        <div className="font-mono text-[11px] text-fg-muted mb-6 flex items-center justify-center gap-2">
          <span className="text-teal-glow">›</span>
          <TerminalLine text="Impossible Systems with Magical Results." delay={300} />
        </div>

        {/* Wordmark */}
        <h1
          className="font-display font-bold leading-none tracking-[0.025em] text-fg-1 mb-[6px] break-words"
          style={{
            fontSize: "clamp(40px, 8.5vw, 102px)",
            textShadow: "0 0 80px rgba(0,200,255,0.05)",
          }}
        >
          Quiet
          <span
            className="text-teal-glow"
            style={{
              textShadow:
                "0 0 40px rgba(0,200,255,0.18), 0 0 80px rgba(0,150,255,0.08)",
            }}
          >
            Wizard
          </span>
        </h1>

        {/* Studios sub-label */}
        <div
          className="font-heading font-bold text-fg-2 uppercase tracking-[0.35em] sm:tracking-[0.5em] mb-8 inline-block px-4 sm:px-6 py-[10px] border-t border-b border-[rgba(0,200,255,0.18)]"
          style={{
            fontSize: "clamp(14px, 2.2vw, 22px)",
            textShadow: "0 0 24px rgba(0,200,255,0.35)",
          }}
        >
          Studios
        </div>

        {/* Divider row */}
        <div className="flex items-center justify-center gap-4 mb-9">
          <div className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-transparent to-teal-glow" />
          <div
            className="w-1.5 h-1.5 bg-teal-glow rotate-45"
            style={{ boxShadow: "0 0 8px var(--teal-glow)" }}
          />
          <div className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-teal-glow to-transparent" />
        </div>

        {/* Tagline */}
        <p
          className="font-body text-fg-3 leading-[1.8] max-w-[620px] max-sm:max-w-[320px] mx-auto mb-12 px-1"
          style={{ fontSize: "clamp(17px, 2vw, 22px)" }}
        >
          We build the AI that others only talk about.
          <br />
          <span className="text-fg-2">
            Custom agents. Real automation. Strategy that ships.
          </span>
        </p>

        {/* CTAs */}
        <div className="flex gap-2 sm:gap-3.5 justify-center flex-wrap sm:flex-nowrap mb-[72px]">
          <Link href="/contact" className="btn-primary">
            Start a Project <span>→</span>
          </Link>
          <Link href="/services" className="btn-ghost">
            View Services
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-35">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-teal-glow" />
        <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-fg-muted">
          scroll
        </span>
      </div>
    </section>
  );
}
