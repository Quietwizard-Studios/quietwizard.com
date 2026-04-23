"use client";

import { useEffect, useRef } from "react";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function QuillEditor({ value, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<unknown>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!containerRef.current || quillRef.current) return;

    import("quill").then(({ default: Quill }) => {
      if (!containerRef.current) return;

      const quill = new Quill(containerRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [2, 3, false] }],
            ["bold", "italic", "underline"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
          ],
        },
      });

      quill.root.innerHTML = value;
      quillRef.current = quill;

      quill.on("text-change", () => {
        onChangeRef.current(quill.root.innerHTML);
      });
    });

    return () => {
      quillRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className="min-h-[300px]" />;
}
