import Link from "next/link";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

const FOOTER_LINKS = {
  Categories: [
    { label: "Wireless Earbuds", href: "/categories/headphones" },
    { label: "Smartphones", href: "/categories/smartphones" },
    { label: "Laptops", href: "/categories/laptops" },
    { label: "VPN Services", href: "/categories/vpn" },
    { label: "Antivirus Software", href: "/categories/antivirus" },
    { label: "Password Managers", href: "/categories/password-managers" },
    { label: "Robot Vacuums", href: "/categories/robot-vacuums" },
    { label: "Air Purifiers", href: "/categories/air-purifiers" },
    { label: "Coffee Makers", href: "/categories/coffee-makers" },
    { label: "Web Hosting", href: "/categories/web-hosting" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "How We Test", href: "/how-we-test" },
    { label: "Our Team", href: "/about#team" },
    { label: "Contact", href: "/about#contact" },
  ],
  Legal: [
    { label: "Affiliate Disclosure", href: "/disclosure" },
    { label: "Privacy Policy", href: "/disclosure" },
    { label: "Terms of Use", href: "/disclosure" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src="/images/brand/logo.png" alt="TrueTopReviews" className="h-8 w-8" />
              <span className="text-lg font-bold text-white">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">{SITE_DESCRIPTION}</p>
            <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-xs text-slate-500 text-center">
            {SITE_NAME} is reader-supported. When you purchase through links on our site, we may earn an affiliate commission. <Link href="/disclosure" className="underline hover:text-slate-300">Learn more</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
