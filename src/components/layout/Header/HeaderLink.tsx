"use client";

import { Link, usePathname } from "@/i18n/routing";
import clsx from "clsx";

interface HeaderLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
  activeIcon?: React.ReactNode;
  activeClassName?: string;
}

export default function HeaderLink({
  href,
  label,
  children,
  activeIcon,
  activeClassName,
}: HeaderLinkProps) {
  const pathname = usePathname();

  const isActive = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-label={label}
      className={clsx(
        "group hover:text-general-text-high",
        isActive
          ? clsx(activeClassName, "text-general-text-high")
          : "text-general-text-mid",
      )}
    >
      {isActive ? (activeIcon ?? children) : children}
    </Link>
  );
}
