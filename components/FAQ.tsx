"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "How long does a typical engagement take?",
    a: "For general timeframes, workflow automation projects run about 3–6 weeks. Custom agent builds run about 6–12 weeks depending on scope. Strategy engagements are 2 weeks, fixed.",
  },
  {
    q: "Do you work with companies outside the US?",
    a: "Not yet, we currently only work with clients in the US. We plan to expand internationally in the future, but for now we're focused on serving US-based companies.",
  },
  {
    q: "What if we already have an AI strategy?",
    a: "Good. We'll audit it, find the gaps, and either validate or improve it — honest, not flattering.",
  },
  {
    q: "Do you offer retainers?",
    a: "Yes — ongoing engineering retainers are available after an initial project. Most clients move to retainer by month three.",
  },
  {
    q: "How do you charge?",
    a: "Fixed-scope projects are priced upfront, no surprises. Retainers are monthly. We don't bill hourly.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-[1]">
      <div className="max-w-[760px] mx-auto">
        <div className="eyebrow justify-center sm:justify-start mb-3.5">FAQ</div>
        <h2
          className="font-heading font-semibold text-fg-1 mb-12 text-center sm:text-left"
          style={{ fontSize: "clamp(22px, 3vw, 38px)" }}
        >
          Common Questions
        </h2>
        <div className="flex flex-col gap-1.5">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="glass overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-4 sm:px-[22px] py-3 sm:py-[18px] flex items-center justify-between gap-2 sm:gap-4 bg-transparent border-0 cursor-pointer text-left"
              >
                <span className="font-heading text-[15px] font-medium text-fg-1 leading-[1.4]">
                  {item.q}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="shrink-0 transition-transform duration-300"
                  style={{
                    transform: open === i ? "rotate(45deg)" : "none",
                  }}
                >
                  <path
                    d="M8 2v12M2 8h12"
                    stroke="var(--teal-glow)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div
                className="overflow-hidden"
                style={{
                  maxHeight: open === i ? "160px" : "0",
                  transition: "max-height 350ms cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <p className="font-body text-[17px] text-fg-3 leading-[1.75] px-4 sm:px-[22px] pb-5">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
