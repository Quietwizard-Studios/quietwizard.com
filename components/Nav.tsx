"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = ["Services", "Articles", "About", "FAQ", "Contact"];

export default function Nav() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMenuOpen(false);
      window.scrollTo({ top: 0 });
    }, 0);
    return () => clearTimeout(timeout);
  }, [pathname]);

  const showNav = visible || menuOpen || !isHome;

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[300] h-14 sm:h-16"
        style={{
          background: showNav ? "rgba(2,11,20,0.92)" : "transparent",
          borderBottom: showNav
            ? "1px solid var(--border)"
            : "1px solid transparent",
          backdropFilter: showNav ? "blur(20px)" : "none",
          transform:
            visible || !isHome ? "translateY(0)" : "translateY(-100%)",
          transition: "all 400ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div>
              <div className="font-display text-[12px] sm:text-[14px] font-bold text-fg-1 tracking-[0.02em] leading-none">
                QuietWizard
              </div>
              <div className="font-ui text-[6px] sm:text-[7px] font-bold tracking-[0.28em] sm:tracking-[0.3em] uppercase text-fg-muted mt-0.5">
                Studios
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-[2px]">
            {LINKS.map((l) => {
              const href = `/${l.toLowerCase()}`;
              const active = pathname === href;
              return (
                <Link
                  key={l}
                  href={href}
                  className="px-[14px] py-[6px] font-ui text-[11px] font-bold tracking-[0.1em] uppercase no-underline transition-colors duration-200"
                  style={{ color: active ? "var(--teal-glow)" : "var(--fg-3)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--fg-1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = active
                      ? "var(--teal-glow)"
                      : "var(--fg-3)")
                  }
                >
                  {l}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href="/contact"
              className="btn-primary hidden sm:inline-flex"
              style={{ height: 36, fontSize: 11 }}
            >
              Start a Project
            </Link>
            <button
              className="flex md:hidden flex-col gap-[5px] p-2 bg-transparent border-0 cursor-pointer"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block w-5 h-[1.5px] transition-all duration-[250ms]"
                  style={{
                    background: menuOpen ? "var(--teal-glow)" : "var(--fg-3)",
                    transform:
                      menuOpen && i === 0
                        ? "translateY(6.5px) rotate(45deg)"
                        : menuOpen && i === 2
                        ? "translateY(-6.5px) rotate(-45deg)"
                        : menuOpen && i === 1
                        ? "scaleX(0)"
                        : "none",
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      <div
        className="fixed inset-0 z-[290] flex flex-col items-center justify-center gap-1"
        style={{
          background: "rgba(2,11,20,0.97)",
          backdropFilter: "blur(24px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 300ms",
        }}
      >
        {LINKS.map((l) => {
          const href = `/${l.toLowerCase()}`;
          const active = pathname === href;
          return (
            <Link
              key={l}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-heading text-[24px] sm:text-[32px] font-medium tracking-[0.08em] block px-4 sm:px-8 py-3 no-underline transition-all duration-150"
              style={{ color: active ? "var(--teal-glow)" : "var(--fg-2)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--fg-1)";
                e.currentTarget.style.letterSpacing = "0.14em";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = active
                  ? "var(--teal-glow)"
                  : "var(--fg-2)";
                e.currentTarget.style.letterSpacing = "0.08em";
              }}
            >
              {l}
            </Link>
          );
        })}
        <div className="mt-6">
          <Link
            href="/contact"
            className="btn-primary"
            onClick={() => setMenuOpen(false)}
          >
            Start a Project
          </Link>
        </div>
      </div>
    </>
  );
}
