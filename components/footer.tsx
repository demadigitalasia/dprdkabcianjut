"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ikon } from "@/components/ikon";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/panel")) return null;

  return (
    <footer className={`${pathname === "/aspirasi/lacak" ? "mt-8" : "mt-16"} bg-gunung text-white/70`}>
      <div aria-hidden className="h-1 bg-gradient-to-r from-daun via-emas to-cianjur" />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:py-14">
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 border-b border-white/10 pb-8 sm:gap-x-8 sm:gap-y-10 sm:pb-10 md:grid-cols-12 md:gap-8">
          <section className="col-span-2 md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 rounded-xl focus-visible:outline-emas">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl p-1.5">
                <Image src="/logo-cianjur.webp" alt="Lambang Kabupaten Cianjur" width={48} height={54} className="h-full w-auto object-contain" />
              </span>
              <span>
                <span className="block font-heading text-base font-semibold text-white">DPRD Kabupaten Cianjur</span>
                <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.16em] text-white/75">Sekretariat Dewan</span>
              </span>
            </Link>
            <p className="mt-3 font-heading text-lg font-semibold text-white sm:mt-5 sm:text-xl">Sugih Mukti</p>
            <p className="mt-0.5 text-[11px] tracking-[0.14em] text-emas sm:text-xs" lang="su">ᮞᮥᮌᮤᮂ ᮙᮥᮊ᮪ᮒᮤ</p>
            <p className="mt-2 max-w-md text-[13px] leading-relaxed sm:mt-3 sm:text-sm">
              DPRD Kabupaten Cianjur menjalankan fungsi legislasi, anggaran,
              dan pengawasan serta menyerap aspirasi masyarakat.
            </p>
            <Link href="/aspirasi" className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-full border border-emas/50 px-4 py-2 text-sm font-semibold text-emas transition-colors hover:bg-emas hover:text-tinta sm:mt-5">
              Sampaikan aspirasi <Ikon nama="arrow-right" ukuran={16} />
            </Link>
          </section>

          <nav aria-label="Informasi publik" className="md:col-span-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Informasi</h2>
            <ul className="mt-3 space-y-2 text-[13px] sm:mt-4 sm:space-y-3 sm:text-sm">
              <li><Link className="inline-flex min-h-8 items-center transition-colors hover:text-emas sm:min-h-0" href="/anggota">Anggota Dewan</Link></li>
              <li><Link className="inline-flex min-h-8 items-center transition-colors hover:text-emas sm:min-h-0" href="/berita">Berita</Link></li>
              <li><Link className="inline-flex min-h-8 items-center transition-colors hover:text-emas sm:min-h-0" href="/agenda">Agenda</Link></li>
              <li><Link className="inline-flex min-h-8 items-center transition-colors hover:text-emas sm:min-h-0" href="/transparansi">Transparansi</Link></li>
            </ul>
          </nav>

          <nav aria-label="Layanan dan bantuan" className="md:col-span-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Layanan</h2>
            <ul className="mt-3 space-y-2 text-[13px] sm:mt-4 sm:space-y-3 sm:text-sm">
              <li><Link className="inline-flex min-h-8 items-center transition-colors hover:text-emas sm:min-h-0" href="/aspirasi">Aspirasi Online</Link></li>
              <li><Link className="inline-flex min-h-8 items-center transition-colors hover:text-emas sm:min-h-0" href="/aspirasi/lacak">Lacak Aspirasi</Link></li>
              <li><Link className="inline-flex min-h-8 items-center transition-colors hover:text-emas sm:min-h-0" href="/kontak">Kontak</Link></li>
              <li><Link className="inline-flex min-h-8 items-center transition-colors hover:text-emas sm:min-h-0" href="/aksesibilitas">Aksesibilitas</Link></li>
            </ul>
          </nav>

          <section className="col-span-2 md:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Sekretariat DPRD</h2>
            <ul className="mt-3 space-y-2 text-[13px] leading-relaxed sm:mt-4 sm:space-y-3 sm:text-sm">
              <li className="flex items-start gap-2.5"><Ikon nama="map-pin" ukuran={17} className="mt-0.5 shrink-0" /><a href="https://maps.google.com/?q=Jl.+K.+H.+Abdullah+Bin+Nuh+KM.+1+Cianjur" target="_blank" rel="noreferrer" className="transition-colors hover:text-emas">Jl. K. H. Abdullah Bin Nuh KM. 1, Cianjur <span className="inline-flex items-center gap-1 whitespace-nowrap text-emas">Lihat peta <Ikon nama="arrow-up-right" ukuran={13} /></span></a></li>
              <li className="flex min-h-8 items-center gap-2.5"><Ikon nama="phone" ukuran={17} className="shrink-0 opacity-80" /><a href="tel:+62263272150" className="transition-colors hover:text-emas">(0263) 272150</a></li>
              <li className="flex min-h-8 items-center gap-2.5"><Ikon nama="mail" ukuran={17} className="shrink-0 opacity-80" /><a href="mailto:Setwankabcianjur@gmail.com" className="break-all transition-colors hover:text-emas">Setwankabcianjur@gmail.com</a></li>
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-white/75 sm:mt-4 sm:text-xs">Senin–Kamis 08.00–16.00 · Jumat 08.00–16.30 WIB</p>
          </section>
        </div>

        <div className="flex flex-wrap justify-between gap-x-4 gap-y-1.5 pt-4 text-[11px] text-white/75 sm:pt-5 sm:text-xs">
          <p>© 2026 Sekretariat DPRD Kabupaten Cianjur. Hak cipta dilindungi.</p>
          <p className="font-medium tracking-wide">KABUPATEN CIANJUR <span className="mx-1 text-emas" aria-hidden>·</span> SUGIH MUKTI</p>
        </div>
      </div>
    </footer>
  );
}
