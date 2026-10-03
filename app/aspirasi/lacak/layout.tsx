import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Lacak Status Aspirasi",
  description: "Cari ringkasan tiket aspirasi yang tersimpan pada browser tempat pengajuan dibuat.",
};

export default function LacakLayout({ children }: { children: ReactNode }) {
  return children;
}
