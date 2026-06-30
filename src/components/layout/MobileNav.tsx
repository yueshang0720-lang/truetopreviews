"use client";

import Link from "next/link";
import { useEffect, useCallback } from "react";

interface NavItem {
  label: string;
  href: string;
}

export function MobileNav({
  isOpen,
  onClose,
  items,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div className="fixed inset-y-0 right-0 w-72 bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="font-semibold text-brand-900">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-gray-100"
            aria-label="Close menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="p-4 space-y-1">
          <Link
            href="/"
            onClick={onClose}
            className="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-600"
          >
            Home
          </Link>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-600"
            >
              {item.label}
            </Link>
          ))}
          <hr className="my-4" />
          <Link
            href="/about"
            onClick={onClose}
            className="block px-4 py-3 rounded-lg text-sm text-slate-500 hover:text-brand-600"
          >
            About
          </Link>
          <Link
            href="/how-we-test"
            onClick={onClose}
            className="block px-4 py-3 rounded-lg text-sm text-slate-500 hover:text-brand-600"
          >
            How We Test
          </Link>
          <Link
            href="/disclosure"
            onClick={onClose}
            className="block px-4 py-3 rounded-lg text-sm text-slate-500 hover:text-brand-600"
          >
            Disclosure
          </Link>
        </nav>
      </div>
    </div>
  );
}
