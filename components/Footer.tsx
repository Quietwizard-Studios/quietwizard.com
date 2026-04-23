"use client";

import Link from "next/link";

const NAV_COLS = [
  { title: "Services", links: ["Services", "About", "Contact"] },
  { title: "Articles", links: ["Articles", "FAQ"] },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-dim pt-12 px-4 sm:px-6 lg:px-8 pb-8 relative z-[1] mt-8">
      <div className="max-w-[1200px] mx-auto flex justify-between items-start flex-wrap gap-8 mb-8">
        <div className="w-full sm:w-auto text-center sm:text-left">
          <div className="font-display text-[15px] font-bold text-fg-1 tracking-[0.02em] mb-1">
            QuietWizard
          </div>
          <div className="font-mono text-[7px] tracking-[0.28em] uppercase text-fg-muted mb-3.5">
            Studios
          </div>
          <p className="font-body text-[15px] text-fg-muted leading-[1.65] max-w-[220px] mx-auto sm:mx-0">
            We build the AI that others only talk about.
          </p>
        </div>

        <div className="w-full sm:w-auto flex gap-6 sm:gap-12 flex-wrap justify-center sm:justify-start text-center sm:text-left">
          {NAV_COLS.map((col) => (
            <div key={col.title}>
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-fg-muted mb-3.5">
                {col.title}
              </div>
              {col.links.map((l) => (
                <Link
                  key={l}
                  href={`/${l.toLowerCase()}`}
                  className="block font-ui text-[12px] sm:text-[13px] text-fg-muted mb-2.5 no-underline transition-colors duration-150"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--teal-glow)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--fg-muted)")
                  }
                >
                  {l}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border-dim pt-5 flex flex-col sm:flex-row justify-between items-center gap-3 max-w-[1200px] mx-auto">
        <div className="font-mono text-[10px] text-fg-muted text-center sm:text-left">
          © {new Date().getFullYear()} QuietWizard Studios
        </div>
        <div className="font-mono text-[8px] tracking-[0.12em] text-border uppercase text-center sm:text-right">
          Built with purpose
        </div>
      </div>
    </footer>
  );
}
