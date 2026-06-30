"use client";

import { useState } from "react";

const COLORS: Record<string, [string, string]> = {
  headphones: ["#6366f1", "#4f46e5"],
  smartphones: ["#3b82f6", "#1d4ed8"],
  laptops: ["#8b5cf6", "#6d28d9"],
  vpn: ["#0891b2", "#0e7490"],
  antivirus: ["#059669", "#047857"],
  "password-managers": ["#d97706", "#b45309"],
  "robot-vacuums": ["#7c3aed", "#5b21b6"],
  "air-purifiers": ["#0ea5e9", "#0369a1"],
  "coffee-makers": ["#92400e", "#78350f"],
  "kitchen-cookware": ["#dc2626", "#991b1b"],
  "sport-headphones": ["#2563eb", "#1d4ed8"],
  "security-cameras": ["#475569", "#334155"],
  "mesh-wifi": ["#0284c7", "#0369a1"],
  "portable-power": ["#ca8a04", "#a16207"],
  "smart-rings": ["#db2777", "#be185d"],
  "bike-storage": ["#4f46e5", "#3730a3"],
  "web-hosting": ["#0d9488", "#0f766e"],
};

export function ProductImage({
  src,
  alt,
  category,
}: {
  src: string;
  alt: string;
  category: string;
}) {
  const [error, setError] = useState(false);
  const [c1, c2] = COLORS[category] ?? ["#475569", "#334155"];

  if (error) {
    return (
      <div
        className="h-48 flex items-center justify-center relative overflow-hidden select-none"
        style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, white 2px, transparent 2px)",
            backgroundSize: "30px 30px",
          }}
        />
        <p className="relative text-white/80 text-base font-bold text-center px-3 drop-shadow-md leading-tight">
          {alt}
        </p>
      </div>
    );
  }

  return (
    <div className="h-48 relative overflow-hidden bg-slate-200">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        onError={() => setError(true)}
      />
    </div>
  );
}
