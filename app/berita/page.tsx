import { BERITA } from "@/lib/demo-data";
import { DaftarBerita } from "@/components/daftar-berita";
import Image from "next/image";

export const metadata = { title: "Berita" };

export default function HalamanBerita() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-gunung text-white">
        <Image
          src="/ilustrasi-halaman/berita-cianjur.webp"
          alt="Ilustrasi suasana warga dan kawasan Cianjur"
          width={2172}
          height={724}
          sizes="(max-width: 768px) 100vw, 60vw"
          className="pointer-events-none absolute -right-24 bottom-0 top-0 -z-10 h-full w-[68%] object-cover object-center opacity-30"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-gunung via-gunung/95 to-gunung/35" />
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.17em] text-emas sm:text-xs">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emas" />
            Kabar Dewan · DPRD Kabupaten Cianjur
          </p>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
            Kabar dari <span className="text-emas">Cianjur.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            Ikuti kegiatan DPRD dan Sekretariat, pembahasan kebijakan, serta kabar pelayanan publik Kabupaten Cianjur.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/75">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Kegiatan dewan</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Informasi sekretariat</span>
          </div>
          <span className="absolute bottom-3 right-4 rounded-full border border-white/20 bg-gunung/60 px-2.5 py-1 text-[10px] text-white/80 backdrop-blur-sm sm:right-6">Ilustrasi</span>
        </div>
      </section>
      <DaftarBerita berita={BERITA} />
    </>
  );
}
