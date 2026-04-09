import { useState, useEffect } from "react";

const PLACEHOLDER_TEXTS = [
  "Ask Lovable to build your landing page",
  "Ask Lovable to create a dashboard",
  "Ask Lovable to design a pricing page",
  "Ask Lovable to build a SaaS app",
];

export default function GradientPanel() {
  const [inputText, setInputText] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = PLACEHOLDER_TEXTS[placeholderIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 55);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 28);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDER_TEXTS.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, placeholderIndex]);

  const displayText = PLACEHOLDER_TEXTS[placeholderIndex].slice(0, charIndex);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-none">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 60% 30%, #a78bfa 0%, #818cf8 15%, #60a5fa 30%, #f472b6 55%, #fb923c 75%, #f97316 90%, #ef4444 100%)",
        }}
      />
      {/* Soft overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 70%, rgba(251,146,60,0.45) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(167,139,250,0.5) 0%, transparent 55%)",
        }}
      />
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Centered AI input box */}
      <div className="absolute inset-0 flex items-center justify-center px-10">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 flex items-center gap-3 shadow-lg">
          <span className="flex-1 text-sm text-gray-500 min-h-[22px] leading-relaxed">
            {displayText}
            <span className="inline-block w-0.5 h-4 bg-gray-400 ml-0.5 animate-pulse align-middle" />
          </span>
          <button className="w-9 h-9 flex items-center justify-center bg-gray-900 rounded-full hover:bg-gray-700 transition-colors cursor-pointer flex-shrink-0">
            <i className="ri-arrow-up-line text-white text-base" />
          </button>
        </div>
      </div>
    </div>
  );
}
