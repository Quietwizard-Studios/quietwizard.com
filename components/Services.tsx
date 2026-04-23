import Link from "next/link";

const SERVICES = [
  {
    num: "01",
    cmd: "BUILD",
    title: "Custom AI Agents",
    desc: "Purpose-built agents that connect to your tools, handle real decisions, and operate autonomously — designed for your workflow, not a generic template.",
    price: "From $5,000",
    tags: ["LLM Agents", "Tool Use", "API Integration"],
    green: false,
  },
  {
    num: "02",
    cmd: "AUTOMATE",
    title: "Workflow Automation",
    desc: "End-to-end automation of the processes that drain your team's time. We map, architect, and deploy — so you stop doing the work a machine should handle.",
    price: "From $3,500",
    tags: ["Process Automation", "n8n / Make", "CRM & ERP"],
    green: true,
    featured: true,
  },
  {
    num: "03",
    cmd: "ADVISE",
    title: "AI Strategy & Roadmap",
    desc: "A focused engagement to assess where AI delivers real leverage — and a concrete plan to get there, without the buzzword theater.",
    price: "From $1,800",
    tags: ["AI Audit", "Roadmapping", "Team Enablement"],
    green: false,
  },
];

export default function Services() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-[1]">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-14 flex items-end justify-between flex-wrap gap-4">
          <div className="w-full sm:w-auto text-center sm:text-left">
            <div className="eyebrow justify-center sm:justify-start mb-3.5">What We Do</div>
            <h2
              className="font-heading font-semibold text-fg-1 leading-[1.2]"
              style={{ fontSize: "clamp(24px, 3.5vw, 46px)" }}
            >
              Craft Over Convention
            </h2>
          </div>
          <p className="font-body text-[16px] sm:text-[18px] text-fg-3 max-w-[420px] max-sm:max-w-[300px] leading-[1.75] text-center sm:text-left">
            We don&apos;t do everything. We build agents, automate workflows,
            and advise teams serious about AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className={`glass p-5 sm:p-7 flex flex-col${s.featured ? " border-[rgba(45,212,191,0.28)]" : ""}`}
            >
              <div className="flex items-baseline justify-between mb-4">
                <div
                  className={`font-mono text-[9px] font-medium tracking-[0.14em] ${
                    s.green ? "text-green-glow" : "text-teal-glow"
                  }`}
                >
                  {`${s.num} // ${s.cmd}`}
                </div>
                {s.featured && (
                  <span
                    className={`font-mono text-[8px] tracking-[0.12em] px-2 py-0.5 rounded-sm border ${
                      s.green
                        ? "bg-[rgba(74,222,128,0.08)] border-[rgba(74,222,128,0.2)] text-green-glow"
                        : "bg-[rgba(45,212,191,0.08)] border-[rgba(45,212,191,0.2)] text-teal-glow"
                    }`}
                  >
                    POPULAR
                  </span>
                )}
              </div>
              <div className="font-heading text-[19px] font-semibold text-fg-1 leading-[1.3] mb-3.5">
                {s.title}
              </div>
              <p className="font-body text-[17px] text-fg-3 leading-[1.75] mb-5 flex-1">
                {s.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-[18px]">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`font-ui text-[10px] font-bold py-[3px] px-2 rounded-sm tracking-[0.06em] border ${
                      s.green
                        ? "bg-[rgba(22,163,74,0.1)] border-[rgba(22,163,74,0.22)] text-green-glow"
                        : "bg-[rgba(20,168,159,0.1)] border-[rgba(20,168,159,0.22)] text-teal-glow"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border-dim">
                <span className="font-mono text-[13px] text-fg-2 font-medium">
                  {s.price}
                </span>
                <Link
                  href="/contact"
                  className={`font-ui text-[10px] font-bold tracking-[0.1em] uppercase no-underline cursor-pointer ${
                    s.green ? "text-green-glow" : "text-teal-glow"
                  }`}
                >
                  Inquire →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
