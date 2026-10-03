"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Ikon } from "@/components/ikon";
import { ANGGOTA, DAPIL_INFO, PERIODE } from "@/lib/demo-data";

type TautanMenu = {
  href: string;
  label: string;
  deskripsi: string;
  eksternal?: boolean;
};

type KelompokMenu = {
  id: string;
  label: string;
  tautan: TautanMenu[];
};

const KELAS_PANEL = "w-[22rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-tinta/10 bg-white text-tinta shadow-xl shadow-black/15";
const KELAS_PANEL_KEPALA = "bg-gunung px-5 py-4 text-white";
const KELAS_LABEL_PANEL = "text-[10px] font-bold uppercase tracking-[0.15em] text-emas";

const KELOMPOK_MENU: KelompokMenu[] = [
  {
    id: "profil",
    label: "Profil DPRD",
    tautan: [
      {
        href: "/anggota#pimpinan-dprd",
        label: "Pimpinan DPRD",
        deskripsi: "Ketua dan Wakil Ketua.",
      },
      {
        href: "/anggota#sebaran-dapil",
        label: "Wilayah dapil",
        deskripsi: "Wilayah dan alokasi kursi setiap dapil.",
      },
      {
        href: "/anggota#direktori-anggota",
        label: "Direktori anggota",
        deskripsi: "Cari menurut nama, partai, atau dapil.",
      },
    ],
  },
  {
    id: "kegiatan",
    label: "Kegiatan",
    tautan: [
      {
        href: "/berita",
        label: "Kabar Dewan & Sekretariat",
        deskripsi: "Berita kegiatan, pembahasan, dan kunjungan kerja.",
      },
      {
        href: "/agenda",
        label: "Jadwal rapat dan kegiatan",
        deskripsi: "Lihat agenda DPRD menurut tanggal dan status.",
      },
    ],
  },
  {
    id: "dokumen",
    label: "Dokumen publik",
    tautan: [
      {
        href: "/transparansi",
        label: "Semua dokumen publik",
        deskripsi: "Cari laporan anggaran, kinerja, PPID, dan informasi.",
      },
      {
        href: "https://jdihsetwan.cianjurkab.go.id/",
        label: "JDIH Sekretariat DPRD",
        deskripsi: "Buka jaringan dokumentasi dan informasi hukum.",
        eksternal: true,
      },
    ],
  },
  {
    id: "layanan",
    label: "Layanan warga",
    tautan: [
      {
        href: "/aspirasi/lacak",
        label: "Periksa tindak lanjut aspirasi",
        deskripsi: "Masukkan nomor tiket untuk melihat status terbaru.",
      },
      {
        href: "/aspirasi/statistik",
        label: "Ringkasan aspirasi",
        deskripsi: "Lihat sebaran aspirasi menurut tema, dapil, dan status.",
      },
      {
        href: "/kontak",
        label: "Hubungi Sekretariat",
        deskripsi: "Alamat kantor, jam layanan, telepon, dan email.",
      },
    ],
  },
];

function tautanAktif(pathname: string, href: string) {
  const path = href.split("#")[0];
  return path === "/" ? pathname === "/" : pathname.startsWith(path);
}

export function Header() {
  const pathname = usePathname();

  return <IsiHeader key={pathname} pathname={pathname} />;
}

function IsiHeader({ pathname }: { pathname: string }) {
  const [menuTerbuka, setMenuTerbuka] = useState(false);
  const [kelompokMobilTerbuka, setKelompokMobilTerbuka] = useState<string | null>(null);
  const [kelompokDesktopTerbuka, setKelompokDesktopTerbuka] = useState<string | null>(null);
  const navDesktopRef = useRef<HTMLElement>(null);
  const tombolKelompokRef = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    function tutupSaatKlikDiLuar(event: PointerEvent) {
      if (event.target instanceof Node && !navDesktopRef.current?.contains(event.target)) {
        setKelompokDesktopTerbuka(null);
      }
    }

    function tutupDenganEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setKelompokDesktopTerbuka((aktif) => {
          if (aktif) tombolKelompokRef.current[aktif]?.focus();
          return null;
        });
        setKelompokMobilTerbuka(null);
        setMenuTerbuka(false);
      }
    }

    document.addEventListener("pointerdown", tutupSaatKlikDiLuar);
    document.addEventListener("keydown", tutupDenganEscape);
    return () => {
      document.removeEventListener("pointerdown", tutupSaatKlikDiLuar);
      document.removeEventListener("keydown", tutupDenganEscape);
    };
  }, []);

  function tutupNavigasi() {
    setKelompokDesktopTerbuka(null);
    setKelompokMobilTerbuka(null);
    setMenuTerbuka(false);
  }

  if (pathname.startsWith("/panel")) return null;

  function TautanRingkas({ tautan, mobile = false }: { tautan: TautanMenu; mobile?: boolean }) {
    const aktif = tautan.eksternal ? false : tautanAktif(pathname, tautan.href);
    const className = `group block rounded-xl px-3 py-2.5 transition-colors ${
      mobile
        ? aktif
          ? "bg-white/10 text-white"
          : "text-white/75 hover:bg-white/5 hover:text-white"
        : aktif
          ? "bg-pucuk/70 text-gunung"
          : "text-tinta hover:bg-krem"
    }`;
    const isi = (
      <>
        <span className="flex items-center justify-between gap-2 text-sm font-semibold">
          {tautan.label}
          {tautan.eksternal && !mobile && <Ikon nama="arrow-up-right" ukuran={14} className="text-daun-tua" />}
        </span>
        {!mobile && <span className="mt-0.5 block text-xs leading-relaxed text-tinta-pudar">{tautan.deskripsi}</span>}
      </>
    );

    return (
      <li key={tautan.href}>
        {tautan.eksternal ? (
          <a href={tautan.href} onClick={tutupNavigasi} className={className}>
            {isi}
          </a>
        ) : (
          <Link href={tautan.href} aria-current={aktif && !tautan.href.includes("#") ? "page" : undefined} onClick={tutupNavigasi} className={className}>
            {isi}
          </Link>
        )}
      </li>
    );
  }

  function isiDropdown(kelompok: KelompokMenu, mobile = false) {
    if (mobile) {
      return <ul className="space-y-0.5">{kelompok.tautan.map((tautan) => <TautanRingkas key={tautan.href} tautan={tautan} mobile />)}</ul>;
    }

    if (kelompok.id === "profil") {
      return (
        <div className={KELAS_PANEL}>
          <div className={KELAS_PANEL_KEPALA}>
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <p className="font-heading text-lg">Profil DPRD</p>
              <p className={KELAS_LABEL_PANEL}>Periode {PERIODE}</p>
            </div>
            <div className="mt-3 flex items-center gap-5 border-t border-white/15 pt-3 text-xs text-white/75">
              <span><strong className="text-white">{ANGGOTA.length}</strong> anggota</span>
              <span><strong className="text-white">{DAPIL_INFO.length}</strong> dapil</span>
            </div>
          </div>
          <ul className="divide-y divide-tinta/5 px-2 py-1">
            {kelompok.tautan.map((tautan) => <TautanRingkas key={tautan.href} tautan={tautan} />)}
          </ul>
        </div>
      );
    }

    if (kelompok.id === "dokumen") {
      const kategoriDokumen = ["Anggaran", "Kinerja", "PPID", "Informasi"] as const;
      return (
        <div className={KELAS_PANEL}>
          <div className={KELAS_PANEL_KEPALA}>
            <p className={KELAS_LABEL_PANEL}>Pusat Dokumen</p>
            <p className="mt-1 font-heading text-lg">Cari informasi DPRD</p>
            <p className="mt-1 text-xs leading-relaxed text-white/70">Pilih kategori atau telusuri seluruh dokumen.</p>
          </div>
          <ul className="grid grid-cols-2 gap-2 p-3">
            {kategoriDokumen.map((kategori) => (
              <li key={kategori}>
                <Link href={`/transparansi?kategori=${encodeURIComponent(kategori)}`} onClick={tutupNavigasi} className="block rounded-lg border border-jerami bg-krem px-3 py-2 text-sm font-semibold text-tinta transition-colors hover:border-daun/40 hover:bg-pucuk/50">
                  {kategori}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="divide-y divide-tinta/5 border-t border-jerami px-2 py-1">
            {kelompok.tautan.map((tautan) => <TautanRingkas key={tautan.href} tautan={tautan} />)}
          </ul>
        </div>
      );
    }

    if (kelompok.id === "kegiatan") {
      return (
        <div className={KELAS_PANEL}>
          <div className={KELAS_PANEL_KEPALA}>
            <p className={KELAS_LABEL_PANEL}>Kegiatan Lembaga</p>
            <p className="mt-1 font-heading text-lg">Berita dan agenda</p>
            <p className="mt-1 text-xs leading-relaxed text-white/70">Ikuti pembahasan dan jadwal DPRD Cianjur.</p>
          </div>
          <ul className="divide-y divide-tinta/5 px-2 py-1">
            {kelompok.tautan.map((tautan) => <TautanRingkas key={tautan.href} tautan={tautan} />)}
          </ul>
        </div>
      );
    }

    if (kelompok.id === "layanan") {
      const [lacak, statistik, kontak] = kelompok.tautan;
      return (
        <div className={KELAS_PANEL}>
          <div className={KELAS_PANEL_KEPALA}>
            <p className={KELAS_LABEL_PANEL}>Layanan Warga</p>
            <p className="mt-1 font-heading text-lg">Pantau aspirasi</p>
            <p className="mt-1 text-xs leading-relaxed text-white/70">Masukkan nomor tiket untuk melihat perkembangan tindak lanjut.</p>
            <Link href={lacak.href} onClick={tutupNavigasi} className="mt-3 inline-flex min-h-9 items-center rounded-full bg-emas px-3.5 text-xs font-bold text-tinta transition-colors hover:bg-white">
              Lacak aspirasi <Ikon nama="arrow-right" ukuran={14} className="ml-1.5" />
            </Link>
          </div>
          <ul className="divide-y divide-tinta/5 px-2 py-1">
            {[statistik, kontak].map((tautan) => (
              <li key={tautan.href}>
                <Link href={tautan.href} onClick={tutupNavigasi} className="flex items-center justify-between gap-4 rounded-xl px-3 py-2.5 transition-colors hover:bg-krem">
                  <span className="block text-sm font-semibold">{tautan.label}</span>
                  <span className="text-right text-xs text-tinta-pudar">{tautan.href.includes("statistik") ? "Tema · dapil · status" : "Alamat · telepon · email"}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div className="w-[20rem] rounded-2xl border border-tinta/10 bg-white p-2 text-tinta shadow-xl shadow-black/15">
        <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-daun-tua">{kelompok.label}</p>
        <ul className="space-y-0.5">{kelompok.tautan.map((tautan) => <TautanRingkas key={tautan.href} tautan={tautan} />)}</ul>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-gunung/95 text-white shadow-sm shadow-black/5 backdrop-blur-md">
      <div aria-hidden className="h-0.5 bg-gradient-to-r from-daun via-emas to-cianjur" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex min-h-[68px] items-center justify-between gap-3 py-2.5">
          <Link href="/" onClick={() => setMenuTerbuka(false)} className="group flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline-emas">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl p-1 transition-transform group-hover:scale-[1.03]">
              <Image src="/logo-cianjur.webp" alt="Lambang Kabupaten Cianjur" width={44} height={48} priority className="h-full w-auto object-contain" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-heading text-sm font-semibold tracking-tight sm:text-base">DPRD Kabupaten Cianjur</span>
              <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.16em] text-white/60 sm:text-[11px]">Sekretariat Dewan</span>
            </span>
          </Link>

          <nav ref={navDesktopRef} aria-label="Menu utama" className="hidden 2xl:block">
            <ul className="flex items-center gap-0.5">
              <li>
                <Link
                  href="/"
                  aria-current={pathname === "/" ? "page" : undefined}
                  className={`relative block rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors after:absolute after:inset-x-2.5 after:-bottom-2.5 after:h-0.5 after:rounded-full ${pathname === "/" ? "bg-white/10 text-white after:bg-emas" : "text-white/75 after:bg-transparent hover:bg-white/5 hover:text-white"}`}
                >
                  Beranda
                </Link>
              </li>
              {KELOMPOK_MENU.map((kelompok) => {
                const aktif = kelompok.tautan.some((tautan) => !tautan.eksternal && tautanAktif(pathname, tautan.href));
                const terbuka = kelompokDesktopTerbuka === kelompok.id;
                return (
                  <li key={kelompok.id} className="relative">
                    <button
                      ref={(node) => { tombolKelompokRef.current[kelompok.id] = node; }}
                      type="button"
                      aria-expanded={terbuka}
                      aria-controls={`menu-${kelompok.id}`}
                      onClick={() => setKelompokDesktopTerbuka(terbuka ? null : kelompok.id)}
                      className={`relative inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors after:absolute after:inset-x-2.5 after:-bottom-2.5 after:h-0.5 after:rounded-full ${aktif || terbuka ? "bg-white/10 text-white after:bg-emas" : "text-white/75 after:bg-transparent hover:bg-white/5 hover:text-white"}`}
                    >
                      {kelompok.label}
                      <Ikon nama="chevron-down" ukuran={14} className={`transition-transform ${terbuka ? "rotate-180" : ""}`} />
                    </button>
                    {terbuka && <div id={`menu-${kelompok.id}`} className="absolute left-0 top-full z-50 mt-3">{isiDropdown(kelompok)}</div>}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden shrink-0 items-center gap-2 2xl:flex">
            <Link href="/aspirasi" aria-current={pathname === "/aspirasi" ? "page" : undefined} className="rounded-full bg-emas px-4 py-2.5 text-sm font-bold text-tinta shadow-md shadow-emas/15 transition-transform hover:-translate-y-0.5">
              Sampaikan Aspirasi
            </Link>
            <Link href="/panel/login" className="rounded-full border border-white/20 px-3 py-2 text-xs font-semibold text-white/75 transition-colors hover:border-white/40 hover:bg-white/5 hover:text-white">
              Panel Internal
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-2 2xl:hidden">
            <Link href="/aspirasi" className="hidden rounded-full bg-emas px-3.5 py-2 text-xs font-bold text-tinta sm:inline-flex">Aspirasi</Link>
            <button type="button" aria-expanded={menuTerbuka} aria-controls="menu-mobile" aria-label={menuTerbuka ? "Tutup menu navigasi" : "Buka menu navigasi"} onClick={() => setMenuTerbuka(!menuTerbuka)} className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 transition-colors hover:bg-white/10 focus-visible:outline-emas">
              <span className="grid gap-[5px]" aria-hidden>
                <span className={`h-0.5 w-5 rounded bg-current transition-transform ${menuTerbuka ? "translate-y-[7px] rotate-45" : ""}`} />
                <span className={`h-0.5 w-5 rounded bg-current transition-opacity ${menuTerbuka ? "opacity-0" : ""}`} />
                <span className={`h-0.5 w-5 rounded bg-current transition-transform ${menuTerbuka ? "-translate-y-[7px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>

        {menuTerbuka && (
          <nav id="menu-mobile" aria-label="Menu utama" className="border-t border-white/10 py-3 2xl:hidden">
            <ul className="space-y-1">
              <li>
                <Link href="/" aria-current={pathname === "/" ? "page" : undefined} onClick={() => setMenuTerbuka(false)} className={`flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold ${pathname === "/" ? "bg-white/10 text-white" : "text-white/75 hover:bg-white/5 hover:text-white"}`}>
                  Beranda
                </Link>
              </li>
              {KELOMPOK_MENU.map((kelompok) => {
                const terbuka = kelompokMobilTerbuka === kelompok.id;
                const aktif = kelompok.tautan.some((tautan) => !tautan.eksternal && tautanAktif(pathname, tautan.href));
                return (
                  <li key={kelompok.id} className="rounded-xl border border-white/10">
                    <button
                      type="button"
                      aria-expanded={terbuka}
                      aria-controls={`menu-mobile-${kelompok.id}`}
                      onClick={() => setKelompokMobilTerbuka(terbuka ? null : kelompok.id)}
                      className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left text-sm font-semibold ${aktif || terbuka ? "text-white" : "text-white/75"}`}
                    >
                      {kelompok.label}
                      <Ikon nama="chevron-down" ukuran={16} className={`transition-transform ${terbuka ? "rotate-180" : ""}`} />
                    </button>
                    {terbuka && (
                      <div id={`menu-mobile-${kelompok.id}`} className="border-t border-white/10 px-1.5 py-1.5">{isiDropdown(kelompok, true)}</div>
                    )}
                  </li>
                );
              })}
              <li>
                <Link href="/aspirasi" onClick={() => setMenuTerbuka(false)} className="flex min-h-11 items-center rounded-xl bg-emas px-3 text-sm font-bold text-tinta">Sampaikan Aspirasi</Link>
              </li>
              <li>
                <Link href="/panel/login" onClick={() => setMenuTerbuka(false)} className="flex min-h-11 items-center rounded-xl border border-white/15 px-3 text-sm text-white/75">Panel Internal · Sekretariat</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
