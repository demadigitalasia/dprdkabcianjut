"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BadgeStatus } from "@/components/badge-status";
import { Ikon } from "@/components/ikon";

type Peristiwa = { status: string; waktu: string; catatan?: string };
type Entri = {
  tiket: string;
  tema: string;
  lokasi: string;
  dapil: string;
  komisi: string;
  isi: string;
  nama: string;
  status: string;
  waktu: string;
  riwayat?: Peristiwa[];
};

function tanggalLokal(nilai: string) {
  const tanggal = new Date(nilai);
  return Number.isNaN(tanggal.getTime())
    ? "Waktu belum tercatat"
    : tanggal.toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
      }) + " WIB";
}

function LacakKonten() {
  const searchParams = useSearchParams();
  const [kata, setKata] = useState(searchParams.get("tiket") ?? "");
  const [hasil, setHasil] = useState<Entri | null>(null);
  const [dicari, setDicari] = useState(false);
  const [pesan, setPesan] = useState("");

  function cari(tiket: string) {
    const nomor = tiket.trim().toUpperCase().replace(/\s+/g, "");
    setKata(nomor);
    setHasil(null);
    setDicari(false);
    setPesan("");

    if (!nomor) {
      setPesan("Masukkan nomor tiket untuk mulai melacak.");
      return;
    }
    if (!/^ASP-\d{4}-\d{4}$/.test(nomor)) {
      setPesan("Periksa format nomor. Contoh: ASP-2026-1234.");
      return;
    }

    setDicari(true);
    try {
      const tersimpan = JSON.parse(localStorage.getItem("aspirasi_tiket") ?? "[]");
      const data: Entri[] = Array.isArray(tersimpan) ? tersimpan : [];
      const temukan = data.find((entri) => entri.tiket?.toUpperCase() === nomor);
      setHasil(temukan ?? null);
    } catch {
      setHasil(null);
      setPesan("Data tiket di browser ini tidak dapat dibaca. Coba muat ulang halaman.");
    }
  }

  useEffect(() => {
    const awal = searchParams.get("tiket");
    if (!awal) return;
    const t = window.setTimeout(() => cari(awal), 0);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const riwayat = hasil
    ? Array.isArray(hasil.riwayat) && hasil.riwayat.length > 0
      ? [...hasil.riwayat].sort(
          (a, b) => new Date(a.waktu).getTime() - new Date(b.waktu).getTime()
        )
      : [{ status: hasil.status, waktu: hasil.waktu }]
    : [];

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-gunung text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/ilustrasi-halaman/lacak-status-warga.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_42%] opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gunung via-gunung/90 to-gunung/65" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,61,46,0.18)_0%,rgba(10,61,46,0.08)_52%,rgba(10,61,46,0.48)_100%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-4 py-9 sm:px-6 sm:py-12">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-emas">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emas" />
            Aspirasi warga Cianjur
          </p>
          <h1 className="mt-3 max-w-2xl font-heading text-3xl leading-tight sm:text-4xl">Lacak perjalanan aspirasi</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            Masukkan nomor tiket untuk melihat ringkasan dan catatan status yang tersimpan.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              cari(kata);
            }}
            className="mt-6 rounded-2xl border border-white/15 bg-white/[0.07] p-3 backdrop-blur sm:p-4"
          >
            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-3">
              <div className="min-w-0">
              <label htmlFor="tiket" className="mb-2 block text-sm font-semibold text-white">Nomor tiket</label>
              <input
                id="tiket"
                type="text"
                value={kata}
                onChange={(e) => {
                  setKata(e.target.value.toUpperCase());
                  setHasil(null);
                  setDicari(false);
                  setPesan("");
                }}
                placeholder="ASP-2026-1234"
                autoCapitalize="characters"
                autoComplete="off"
                spellCheck={false}
                aria-describedby="petunjuk-tiket"
                aria-invalid={Boolean(pesan)}
                className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 font-mono text-base tracking-wide text-tinta placeholder:font-sans placeholder:tracking-normal placeholder:text-tinta-pudar/70 focus:border-emas focus:outline-none focus:ring-2 focus:ring-emas/30"
              />
              </div>
              <button type="submit" className="inline-flex h-[50px] w-full items-center justify-center gap-2 self-end rounded-xl bg-emas px-6 text-sm font-bold text-tinta transition-colors hover:bg-emas-terang sm:w-auto sm:min-w-36">
                <Ikon nama="search" ukuran={17} /> Cari tiket
              </button>
            </div>
            <p id="petunjuk-tiket" className="mt-2 text-xs leading-relaxed text-white/65">
              Format: ASP-tahun-4 angka. Masukkan tiket di browser tempat formulir dibuat.
            </p>
          </form>

          {pesan && <p role="alert" className="mt-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white">{pesan}</p>}
          <p className="mt-4 text-xs leading-relaxed text-white/55">
            Pelacakan belum terhubung ke sistem penerimaan DPRD. Tiket lokal tidak tersedia di browser atau perangkat lain.
          </p>
        </div>
      </section>

      <section className="border-b border-tinta/5 bg-krem/70">
        <div className="mx-auto max-w-5xl space-y-5 px-4 py-6 sm:px-6 sm:py-7">
        {hasil && (
          <article className="overflow-hidden rounded-3xl border border-tinta/10 bg-white shadow-lg shadow-tinta/5">
            <header className="flex flex-col gap-4 border-b border-tinta/10 bg-krem p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <p className="font-mono text-xs font-semibold tracking-wider text-tinta-pudar">{hasil.tiket}</p>
                <h2 className="mt-1 font-heading text-xl text-gunung sm:text-2xl">{hasil.tema}</h2>
                <p className="mt-1 text-sm text-tinta-pudar">{hasil.lokasi}{hasil.dapil ? ` · ${hasil.dapil}` : ""}</p>
              </div>
              <div className="sm:text-right">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-tinta-pudar">Status saat ini</p>
                <BadgeStatus status={hasil.status} />
              </div>
            </header>

            <div className="grid gap-7 p-5 sm:grid-cols-[minmax(0,1fr)_17rem] sm:p-7">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-heading text-lg text-gunung">Catatan perkembangan</h3>
                  <span className="text-right text-xs text-tinta-pudar">Pengajuan dibuat<br className="sm:hidden" /> {tanggalLokal(hasil.waktu)}</span>
                </div>
                <ol className="mt-5">
                  {riwayat.map((peristiwa, indeks) => (
                    <li key={`${peristiwa.status}-${peristiwa.waktu}-${indeks}`} className="relative flex gap-4 pb-6 last:pb-0">
                      {indeks < riwayat.length - 1 && <span aria-hidden className="absolute left-[13px] top-7 h-[calc(100%-1.5rem)] w-px bg-daun/30" />}
                      <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full bg-pucuk text-daun-tua ring-4 ring-white"><Ikon nama="check" ukuran={14} /></span>
                      <span className="min-w-0 pt-0.5">
                        <span className="block text-sm font-semibold text-tinta">{peristiwa.status}</span>
                        <time className="mt-1 block text-xs text-tinta-pudar">{tanggalLokal(peristiwa.waktu)}</time>
                        {peristiwa.catatan && <span className="mt-2 block text-sm leading-relaxed text-tinta-pudar">{peristiwa.catatan}</span>}
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="mt-5 rounded-xl border border-tinta/10 bg-krem px-4 py-3 text-sm leading-relaxed text-tinta-pudar">
                  Belum ada catatan perkembangan setelah status di atas.
                </p>
              </div>

              <aside className="rounded-2xl border border-tinta/10 p-4 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-daun-tua">Ringkasan aspirasi</p>
                <dl className="mt-4 space-y-4 text-sm">
                  <div><dt className="text-xs text-tinta-pudar">Arah penanganan awal</dt><dd className="mt-1 font-semibold text-tinta">{hasil.komisi} · {hasil.dapil}</dd></div>
                  <div><dt className="text-xs text-tinta-pudar">Isi aspirasi</dt><dd className="mt-1 leading-relaxed text-tinta">{hasil.isi}</dd></div>
                </dl>
              </aside>
            </div>
            <footer className="border-t border-tinta/10 px-5 py-4 text-xs leading-relaxed text-tinta-pudar sm:px-7">
              Pembaruan di atas berasal dari catatan yang tersimpan di browser ini. Halaman ini belum menerima perubahan status atau mengirim notifikasi.
            </footer>
          </article>
        )}

        {dicari && !hasil && !pesan && (
          <div className="rounded-2xl border border-tinta/10 bg-krem p-5 sm:p-6">
            <p className="font-heading text-lg text-gunung">Nomor belum ditemukan di browser ini</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-tinta-pudar">
              Periksa kembali nomor tiket. Jika tiket dibuat di browser atau perangkat lain, datanya memang tidak tersedia di sini karena pelacakan belum tersambung ke sistem penerimaan.
            </p>
            <Link href="/aspirasi" className="mt-4 inline-flex items-center gap-2 rounded-full bg-emas px-4 py-2.5 text-sm font-bold text-tinta">
              Buka formulir aspirasi <Ikon nama="arrow-right" ukuran={15} />
            </Link>
          </div>
        )}

        {!hasil && !dicari && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col items-start rounded-2xl border border-tinta/10 bg-white p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-daun-tua">Belum punya nomor tiket?</p>
              <h2 className="mt-2 font-heading text-lg text-gunung">Mulai dari formulir aspirasi</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-tinta-pudar">Ceritakan usulan dan wilayah yang terdampak untuk membuat ringkasan pengajuan.</p>
              <Link href="/aspirasi" className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-emas px-4 py-2.5 text-sm font-bold text-tinta">
                Sampaikan aspirasi <Ikon nama="arrow-right" ukuran={15} />
              </Link>
            </div>
            <div className="flex flex-col items-start rounded-2xl border border-jerami bg-white p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-daun-tua">Perlu bantuan?</p>
              <h2 className="mt-2 font-heading text-lg text-gunung">Hubungi Sekretariat DPRD</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-tinta-pudar">Sekretariat dapat membantu menjelaskan kanal informasi dan layanan yang tersedia.</p>
              <Link href="/kontak" className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-tinta/15 px-4 py-2.5 text-sm font-semibold text-gunung hover:bg-krem">
                Informasi kontak <Ikon nama="arrow-right" ukuran={15} />
              </Link>
            </div>
          </div>
        )}
        </div>
      </section>
    </>
  );
}

export default function HalamanLacak() {
  return (
    <Suspense fallback={<p className="mx-auto max-w-5xl px-4 py-10 text-sm text-tinta-pudar sm:px-6">Memuat pelacakan…</p>}>
      <LacakKonten />
    </Suspense>
  );
}
