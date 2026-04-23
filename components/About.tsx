"use client";

const VALUES = [
  {
    glyph: "◈",
    title: "Precise",
    body: "We scope tightly and deliver exactly what's promised. No scope creep, no vague timelines.",
  },
  {
    glyph: "⬡",
    title: "Autonomous",
    body: "Our agents run without hand-holding. That's the point — you shouldn't babysit your automation.",
  },
  {
    glyph: "∆",
    title: "Deliberate",
    body: "Every engagement is chosen carefully. We're selective by design — so the work we do is always right.",
  },
];

export default function About() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-[1]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="text-center md:text-left md:max-w-[480px]">
          <div className="eyebrow justify-center md:justify-start mb-4">About</div>
          <h2
            className="font-heading font-semibold text-fg-1 leading-[1.25] mb-7"
            style={{ fontSize: "clamp(22px, 3vw, 42px)" }}
          >
            Quiet Work.
            <br />
            Real Results.
          </h2>
          <p className="font-body text-[18px] text-fg-3 leading-[1.85] mb-5 max-w-[620px] mx-auto md:mx-0">
            QuietWizard Studios is a boutique AI agency. We build custom AI
            agents, automate the workflows that slow businesses down, and advise
            teams who want a clear path forward — without the noise.
          </p>
          <p className="font-body text-[18px] text-fg-3 leading-[1.85] mb-8 max-w-[620px] mx-auto md:mx-0">
            Engagements are scoped tightly, deliverables are concrete, and we
            don&apos;t disappear after the kickoff call.
          </p>
          <div className="scanline max-w-[160px] mb-7 mx-auto md:mx-0" />
          <div className="font-heading text-[16px] text-fg-2 italic leading-[1.6] text-center md:text-left">
            &ldquo;The technical craft is real.
            <br />
            The sense of wonder is intentional.&rdquo;
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {VALUES.map((v, i) => (
            <div
              key={i}
              className="glass py-5 px-[22px] flex gap-4 items-start"
            >
              <div className="font-mono text-[24px] text-teal-glow shrink-0 leading-none mt-0.5">
                {v.glyph}
              </div>
              <div>
                <div className="font-heading text-[15px] font-semibold text-fg-1 mb-1.5">
                  {v.title}
                </div>
                <p className="font-body text-[16px] text-fg-3 leading-[1.65]">
                  {v.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
