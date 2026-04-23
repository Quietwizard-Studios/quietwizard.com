"use client";

import { useState, useEffect } from "react";

export default function TerminalLine({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        setShown(text.slice(0, ++i));
        if (i >= text.length) clearInterval(interval);
      }, 28);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);

  return (
    <span className="font-mono text-[11px] text-teal-glow tracking-[0.05em]">
      {shown}
      {shown.length < text.length && <span className="cursor" />}
    </span>
  );
}
