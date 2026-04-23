"use client";

import { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";

const inputBase =
  "w-full bg-[rgba(20,168,159,0.04)] border border-border rounded-[4px] px-3 font-ui text-[13px] text-fg-1 outline-none backdrop-blur-sm transition-colors duration-200";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const result = await submitContactForm(new FormData(e.currentTarget));

    setPending(false);
    if (result?.error) {
      setError(result.error);
    } else {
      setSent(true);
    }
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-[1]">
      <div className="max-w-[660px] mx-auto">
        <div className="eyebrow justify-center mb-3.5">Contact</div>
        <h2
          className="font-heading font-semibold text-fg-1 text-center mb-3.5"
          style={{ fontSize: "clamp(22px, 3vw, 40px)" }}
        >
          Start a Project
        </h2>
        <p className="font-body text-[18px] text-fg-3 leading-[1.75] text-center mb-11">
          Tell us what you&apos;re working on. We&apos;ll respond within one
          business day — no sales call required.
        </p>

        {sent ? (
          <div className="glass py-12 px-8 text-center">
            <div className="font-heading text-[22px] text-teal-glow mb-3">
              Message Received
            </div>
            <p className="font-body text-[17px] text-fg-3 leading-[1.7]">
              We&apos;ll be in touch within one business day.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass p-5 sm:p-8">
            {error && (
              <div className="font-mono text-[11px] text-red-400 mb-4">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3">
              {[
                {
                  label: "Name",
                  name: "name",
                  placeholder: "Your name",
                  type: "text",
                },
                {
                  label: "Email",
                  name: "email",
                  placeholder: "you@company.com",
                  type: "email",
                },
              ].map((f) => (
                <div key={f.name}>
                  <div className="font-ui text-[10px] font-bold tracking-[0.1em] uppercase text-fg-muted mb-1.5">
                    {f.label}
                  </div>
                  <input
                    type={f.type}
                    name={f.name}
                    required
                    placeholder={f.placeholder}
                    className={`${inputBase} h-9 sm:h-10`}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--teal-glow)";
                      e.target.style.boxShadow =
                        "0 0 0 2px rgba(45,212,191,0.08)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--border)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="mb-3">
              <div className="font-ui text-[10px] font-bold tracking-[0.1em] uppercase text-fg-muted mb-1.5">
                Message
              </div>
              <textarea
                name="message"
                required
                placeholder="Tell us about your project…"
                className={`${inputBase} h-[90px] sm:h-[110px] py-2.5 resize-none font-body text-[17px] leading-[1.6]`}
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--teal-glow)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "var(--border)")
                }
              />
            </div>
            <button
              type="submit"
              disabled={pending}
              className="btn-primary w-full justify-center h-[46px] text-[12px]"
            >
              {pending ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
