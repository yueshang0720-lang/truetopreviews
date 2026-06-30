"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Container } from "@/components/ui";

const SLIDES = [
  {
    emoji: "🎧",
    title: "Best Wireless Earbuds of 2026",
    sub: "Sound quality, ANC, comfort — we tested 25+ pairs so you don't have to.",
    href: "/categories/headphones",
    btn: "See Top 10 Earbuds",
  },
  {
    emoji: "📱",
    title: "Best Smartphones of 2026",
    sub: "Camera, battery, display — find the perfect phone for your budget.",
    href: "/categories/smartphones",
    btn: "See Top Smartphones",
  },
  {
    emoji: "💻",
    title: "Best Laptops of 2026",
    sub: "Performance, portability, battery — your next workhorse is here.",
    href: "/categories/laptops",
    btn: "See Top Laptops",
  },
  {
    emoji: "🤖",
    title: "Best Robot Vacuums of 2026",
    sub: "Hands-free cleaning with AI navigation — we tested 15 top models.",
    href: "/categories/robot-vacuums",
    btn: "See Top Vacuums",
  },
  {
    emoji: "🍳",
    title: "Best Kitchen Cookware of 2026",
    sub: "Non-toxic, durable, beautiful — pans that make cooking a joy.",
    href: "/categories/kitchen-cookware",
    btn: "See Top Cookware",
  },
  {
    emoji: "🔋",
    title: "Best Portable Power Stations",
    sub: "Camping, emergencies, off-grid — stay powered anywhere.",
    href: "/categories/portable-power",
    btn: "See Top Power Stations",
  },
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const total = SLIDES.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const s = SLIDES[current];

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-brand-900 to-slate-800 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      <Container className="relative py-8 sm:py-10 lg:py-14">
        <div className="flex items-start gap-6">
          {/* Left: content */}
          <div className="flex-1 max-w-3xl transition-opacity duration-500" key={current}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs mb-3">
              {s.emoji} Updated June 2026 &bull; Expert Reviews
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              {s.title}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-2xl">{s.sub}</p>
            <Link href={s.href} className="mt-5 inline-flex items-center justify-center px-6 py-2.5 bg-brand-500 hover:bg-brand-400 text-white font-semibold text-sm rounded-xl shadow transition-colors">
              {s.btn}
              <svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>

            {/* Nav buttons */}
            <div className="flex items-center gap-2 mt-6">
              <button onClick={prev} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors" aria-label="Previous">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={next} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors" aria-label="Next">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
              {/* Dots */}
              <div className="flex items-center gap-1.5 ml-2">
                {SLIDES.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-white w-4" : "bg-white/30 hover:bg-white/60"}`} aria-label={`Go to slide ${i + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
