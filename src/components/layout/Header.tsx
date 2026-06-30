"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { MobileNav } from "./MobileNav";
import { SearchModal } from "@/components/shared/SearchModal";

const NAV_ITEMS = [
  { label: "📱 Tech", href: "/categories/smartphones" },
  { label: "🎧 Audio", href: "/categories/headphones" },
  { label: "🏠 Home", href: "/categories/robot-vacuums" },
  { label: "🔒 VPN", href: "/categories/vpn" },
  { label: "🍳 Kitchen", href: "/categories/kitchen-cookware" },
  { label: "🏃 Sport", href: "/categories/sport-headphones" },
  { label: "📷 Cam", href: "/categories/security-cameras" },
  { label: "📡 WiFi", href: "/categories/mesh-wifi" },
  { label: "🔋 Power", href: "/categories/portable-power" },
  { label: "💍 Ring", href: "/categories/smart-rings" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand-900 shrink-0">
              <svg className="h-8 w-8 text-brand-600" fill="currentColor" viewBox="0 0 32 32">
                <path d="M16 2l2.5 7.5H26l-6 4.5 2.5 7.5L16 17l-6.5 4.5 2.5-7.5-6-4.5h7.5L16 2z" />
                <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="hidden sm:inline">{SITE_NAME}</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(true)} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-brand-600 border border-gray-200 hover:border-brand-300 rounded-lg transition-colors" aria-label="Open search">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden lg:inline text-xs text-slate-400">Ctrl+K</span>
              </button>
              <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 text-slate-600 hover:text-brand-600 rounded-lg hover:bg-gray-100" aria-label="Open menu">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} items={NAV_ITEMS} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
