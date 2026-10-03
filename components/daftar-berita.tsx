"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Berita } from "@/lib/demo-data";
import { KartuBerita } from "@/components/kartu-berita";
import { Ikon } from "@/components/ikon";

function tanggalIndo(iso: string, panjang = false) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: panjang ? "long" : "short",
    year: "numeric",
  });
}

export function DaftarBerita({ berita }: { berita: Berita[] }) {
  const [kata, setKata] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const hasil = useMemo(() => berita.filter((b) =>
    (kategori === "Semua" || b.kategori === kategori) &&
    `${b.judul} ${b.ringkasan}`.toLocaleLowerCase("id-ID").includes(kata.trim().toLocaleLowerCase("id-ID"))
  ).sort((a, b) => b.tanggal.localeCompare(a.tanggal)), [berita, kategori, kata]);
  const beritaUtama = hasil[0];
  const filterAktif = Boolean(kata || kategori !== "Semua");

  function resetFilter() {
    setKata("");
    setKategori("Semua");
  }

  return (
    <section aria-labelledby="telusuri-berita" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-jerami pb-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-daun-tua">Arsip informasi</p>
          <h2 id="telusuri-berita" className="mt-1 font-heading text-2xl text-gunung sm:text-3xl">Telusuri berita</h2>
          <p className="mt-1.5 text-sm text-tinta-pudar">Liputan DPRD dan Sekretariat Kabupaten Cianjur.</p>
        </div>
        <p className="rounded-full border border-jerami bg-white px-3 py-1.5 text-xs font-semibold text-gunung" aria-live="polite">{hasil.length} berita</p>
      </div>

      <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-jerami bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <label className="min-w-0 flex-1 text-xs font-semibold text-tinta-pudar">
          Cari berita
          <input value={kata} onChange={(event) => setKata(event.target.value)} placeholder="Judul atau topik berita" className="mt-1.5 block h-11 w-full rounded-xl border border-tinta/15 bg-white px-3 text-sm font-normal text-tinta outline-none transition-colors placeholder:text-tinta-pudar/70 focus:border-daun focus:ring-2 focus:ring-daun/10" />
        </label>
        <div>
          <p className="mb-1.5 text-xs font-semibold text-tinta-pudar">Kategori</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter kategori berita">
            {["Semua", "Dewan", "Sekretariat"].map((pilihan) => (
              <button key={pilihan} type="button" aria-pressed={kategori === pilihan} onClick={() => setKategori(pilihan)} className={`rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${kategori === pilihan ? "bg-gunung text-white" : "border border-tinta/10 bg-white text-tinta-pudar hover:border-daun/30 hover:text-daun-tua"}`}>
                {pilihan}
              </button>
            ))}
          </div>
        </div>
        {filterAktif && <button type="button" onClick={resetFilter} className="self-start rounded-full px-2 py-2 text-xs font-semibold text-daun-tua hover:bg-pucuk sm:self-auto">Hapus filter</button>}
      </div>

      {beritaUtama ? (
        <div className="mt-7">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-daun-tua">{filterAktif ? "Hasil terbaru" : "Berita terbaru"}</p>
          <article className="grid overflow-hidden rounded-3xl border border-gunung/10 bg-gunung shadow-sm md:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col items-start justify-center p-6 text-white sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-emas px-3 py-1 font-bold uppercase tracking-wide text-gunung">{beritaUtama.kategori}</span>
                <time className="text-white/65" dateTime={beritaUtama.tanggal}>{tanggalIndo(beritaUtama.tanggal, true)}</time>
              </div>
              <h3 className="mt-4 max-w-2xl font-heading text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">{beritaUtama.judul}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">{beritaUtama.ringkasan}</p>
              <Link href={`/berita/${beritaUtama.slug}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-emas px-4 py-2.5 text-sm font-bold text-gunung transition-colors hover:bg-kuning">
                Baca berita <Ikon nama="arrow-right" ukuran={15} />
              </Link>
            </div>
            <div className="relative min-h-56 overflow-hidden bg-gradient-to-br from-daun-tua via-gunung to-gunung sm:min-h-72">
              {beritaUtama.gambar ? (
                <>
                  <Image src={beritaUtama.gambar} alt={beritaUtama.gambarAlt ?? beritaUtama.judul} fill priority sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" />
                  {beritaUtama.gambarIlustrasi && <span className="absolute bottom-4 right-4 rounded-full border border-white/35 bg-gunung/75 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-sm">Ilustrasi</span>}
                </>
              ) : (
                <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_82%_15%,rgba(255,255,255,0.16),transparent_42%),linear-gradient(135deg,#07513e_0%,#073b31_52%,#102f32_100%)]" />
              )}
            </div>
          </article>
        </div>
      ) : (
        <div className="mt-7 rounded-2xl border border-dashed border-tinta/15 bg-krem px-6 py-12 text-center">
          <h3 className="font-heading text-lg text-gunung">Belum ada berita yang cocok</h3>
          <p className="mt-1 text-sm text-tinta-pudar">Coba kata kunci atau kategori yang berbeda.</p>
          <button type="button" onClick={resetFilter} className="mt-4 rounded-full bg-gunung px-4 py-2 text-sm font-semibold text-white">Tampilkan semua berita</button>
        </div>
      )}

      {hasil.length > 1 && (
        <div className="mt-9">
          <div className="flex items-end justify-between gap-3 border-b border-jerami pb-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-daun-tua">Kabar lainnya</p>
              <h3 className="mt-1 font-heading text-xl text-gunung sm:text-2xl">Berita dan Kegiatan</h3>
            </div>
            <p className="text-xs text-tinta-pudar">Terbaru lebih dahulu</p>
          </div>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hasil.slice(1).map((item) => <KartuBerita key={item.slug} berita={item} />)}
          </div>
        </div>
      )}
    </section>
  );
}
