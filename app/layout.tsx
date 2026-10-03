import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { KerangkaPublik, KontenSitus } from "@/components/kerangka-publik";

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DPRD Kabupaten Cianjur",
    template: "%s — DPRD Kabupaten Cianjur",
  },
  description:
    "Portal informasi DPRD Kabupaten Cianjur. Informasi anggota dewan, berita, agenda rapat, dokumen publik, dan layanan aspirasi masyarakat.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${space.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-gunung focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Lewati ke konten
        </a>
        <KerangkaPublik><Header /></KerangkaPublik>
        <KontenSitus>{children}</KontenSitus>
        <KerangkaPublik><Footer /></KerangkaPublik>
      </body>
    </html>
  );
}
