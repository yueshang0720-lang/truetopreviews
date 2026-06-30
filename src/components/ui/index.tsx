import Link from "next/link";
import type { ReactNode } from "react";

// ===== UI Primitives =====

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

interface CardProps {
  children: ReactNode;
  href?: string;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  children,
  href,
  className = "",
  padding = "md",
}: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };
  const base =
    "bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow";
  const cls = `${base} ${paddings[padding]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={`${cls} block`}>
        {children}
      </Link>
    );
  }
  return <div className={cls}>{children}</div>;
}

interface BadgeProps {
  children: ReactNode;
  variant?:
    | "gold"
    | "silver"
    | "bronze"
    | "excellence"
    | "blue"
    | "green"
    | "red"
    | "gray";
  size?: "sm" | "md";
}

export function Badge({
  children,
  variant = "blue",
  size = "sm",
}: BadgeProps) {
  const variants = {
    gold: "bg-amber-50 text-amber-700 border-amber-200",
    silver: "bg-gray-50 text-gray-600 border-gray-200",
    bronze: "bg-orange-50 text-orange-700 border-orange-200",
    excellence: "bg-purple-50 text-purple-700 border-purple-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    red: "bg-red-50 text-red-700 border-red-200",
    gray: "bg-gray-50 text-gray-600 border-gray-200",
  };
  const sizes = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
}

interface ButtonProps {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isAffiliate?: boolean;
  className?: string;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  isAffiliate = true,
  className = "",
}: ButtonProps) {
  const variants = {
    primary:
      "bg-brand-600 text-white hover:bg-brand-700 shadow-sm",
    secondary:
      "bg-brand-50 text-brand-700 hover:bg-brand-100",
    outline:
      "border border-gray-300 text-slate-700 hover:border-brand-400 hover:text-brand-600",
  };
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm font-medium",
    lg: "px-8 py-3 text-base font-semibold",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel={isAffiliate ? "nofollow sponsored noopener" : "noopener noreferrer"}
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </a>
  );
}

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  action?: { label: string; href: string };
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 ${
        align === "center" ? "text-center sm:text-center" : ""
      }`}
    >
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-slate-500 max-w-2xl">{subtitle}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="text-sm font-medium text-brand-600 hover:text-brand-700 shrink-0"
        >
          {action.label} &rarr;
        </Link>
      )}
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-gray-200 ${className}`}
    />
  );
}
