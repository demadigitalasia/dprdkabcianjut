"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

export function KerangkaPublik({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/panel")) return null;
  return children;
}

export function KontenSitus({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/panel")) return <div id="konten" tabIndex={-1} className="flex-1">{children}</div>;
  return <main id="konten" tabIndex={-1} className="flex-1">{children}</main>;
}
