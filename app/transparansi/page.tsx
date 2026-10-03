import Link from "next/link";
import { DOKUMEN } from "@/lib/demo-data";
import { KartuArsip } from "@/components/kartu-arsip";
import { PageHeader } from "@/components/page-header";
import { Ikon } from "@/components/ikon";
import { FormPencarianArsip } from "@/components/form-pencarian-arsip";

export const metadata = { title: "Transparansi" };

const KATEGORI = ["Anggaran", "Kinerja", "PPID", "Informasi"] as const;

export default async function HalamanTransparansi({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; tahun?: string; q?: string }>;
}) {
  const { kategori, tahun, q = "" } = await searchParams;
  const kategoriAktif = KATEGORI.includes(kategori as (typeof KATEGORI)[number])
    ? (kategori as (typeof KATEGORI)[number])
    : undefined;
  const parsedTahun = tahun ? Number(tahun) : undefined;
  const tahunAktif = parsedTahun && Number.isInteger(parsedTahun) && DOKUMEN.some((d) => d.tahun === parsedTahun) ? parsedTahun : undefined;

  const daftar = DOKUMEN.filter(
    (d) =>
      (!kategoriAktif || d.kategori === kategoriAktif) &&
      (!tahunAktif || d.tahun === tahunAktif) &&
      (!q.trim() || `${d.judul} ${d.nomor} ${d.kategori} ${d.tahun}`.toLocaleLowerCase("id-ID").includes(q.trim().toLocaleLowerCase("id-ID")))
  );
  const daftarTahun = [...new Set(DOKUMEN.map((d) => d.tahun))].sort((a, b) => b - a);

  return (
    <>
      <PageHeader
        label="Informasi Publik"
        judul="Transparansi"
        deskripsi="Telusuri produk hukum, laporan anggaran, kinerja, dan informasi publik DPRD Kabupaten Cianjur."
        gambar="/ilustrasi-halaman/transparansi-arsip.webp"
        altGambar="Ilustrasi warga memeriksa laporan di meja informasi publik"
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <section className="relative isolate mb-8 overflow-hidden rounded-3xl bg-gunung p-5 text-white shadow-lg shadow-gunung/10 sm:p-7 lg:p-8">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_90%_8%,rgba(245,210,0,0.16),transparent_25%),radial-gradient(ellipse_at_20%_120%,rgba(0,165,81,0.25),transparent_40%),linear-gradient(120deg,#082f26_0%,#0a3d2e_55%,#124937_100%)]" />
          <div aria-hidden className="pointer-events-none absolute -right-28 -top-44 -z-10 size-96 rounded-full border border-white/[0.07]" />
          <div aria-hidden className="pointer-events-none absolute -right-12 -top-28 -z-10 size-64 rounded-full border border-emas/[0.09]" />
          <div className="relative max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-emas"><Ikon nama="download" ukuran={16} />Pusat Dokumen Publik</p>
            <h2 className="mt-2 font-heading text-xl text-white sm:text-2xl">Temukan dokumen DPRD Cianjur</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">Cari produk hukum, anggaran, laporan kinerja, dan informasi publik dalam satu katalog.</p>
          </div>

          <div aria-hidden className="pointer-events-none absolute right-8 top-1/2 hidden h-44 w-56 -translate-y-1/2 lg:block">
            <div className="absolute right-0 top-4 h-36 w-44 rotate-[8deg] rounded-2xl border border-white/20 bg-cianjur/20 p-3.5 shadow-xl backdrop-blur-sm">
              <div className="h-2 w-12 rounded-full bg-cianjur/80" /><div className="mt-5 h-1.5 w-28 rounded-full bg-white/35" /><div className="mt-2 h-1.5 w-36 rounded-full bg-white/20" /><div className="mt-2 h-1.5 w-24 rounded-full bg-white/20" />
              <span className="absolute bottom-3 right-3 rounded-md bg-white/10 px-2 py-1 text-[9px] font-bold tracking-wider text-white/75">PPID</span>
            </div>
            <div className="absolute left-1 top-1 h-36 w-44 -rotate-[7deg] rounded-2xl border border-white/25 bg-white/[0.13] p-3.5 shadow-2xl backdrop-blur-sm">
              <div className="flex gap-2"><span className="rounded-md bg-emas px-2 py-1 text-[9px] font-bold tracking-wider text-gunung">ANGGARAN</span><span className="rounded-md bg-daun/25 px-2 py-1 text-[9px] font-bold tracking-wider text-white">KINERJA</span></div>
              <div className="mt-5 h-1.5 w-32 rounded-full bg-white/45" /><div className="mt-2 h-1.5 w-40 rounded-full bg-white/25" /><div className="mt-2 h-1.5 w-28 rounded-full bg-white/25" />
              <div className="mt-4 h-5 w-14 rounded-md border border-white/20 bg-white/10" />
            </div>
          </div>

          <FormPencarianArsip query={q} kategori={kategoriAktif} tahun={tahunAktif} />
        </section>
        <div className="grid gap-5 rounded-2xl border border-jerami bg-white p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-tinta-pudar">Kategori dokumen</p>
            <div className="flex flex-wrap gap-2">
              <Link href={`/transparansi?${new URLSearchParams({ ...(q ? { q } : {}), ...(tahunAktif ? { tahun: String(tahunAktif) } : {}) })}`} className={`rounded-lg border px-3 py-2 text-sm ${!kategoriAktif ? "border-gunung bg-gunung font-semibold text-white" : "border-tinta/10 bg-white text-tinta-pudar hover:border-gunung/40"}`}>Semua</Link>
              {KATEGORI.map((k) => <Link key={k} href={`/transparansi?${new URLSearchParams({ ...(q ? { q } : {}), ...(tahunAktif ? { tahun: String(tahunAktif) } : {}), kategori: k })}`} className={`rounded-lg border px-3 py-2 text-sm ${kategoriAktif === k ? "border-gunung bg-gunung font-semibold text-white" : "border-tinta/10 bg-white text-tinta-pudar hover:border-gunung/40"}`}>{k}</Link>)}
            </div>
          </div>
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-tinta-pudar">Tahun dokumen</p>
            <div className="flex flex-wrap gap-2">
              <Link href={`/transparansi?${new URLSearchParams({ ...(q ? { q } : {}), ...(kategoriAktif ? { kategori: kategoriAktif } : {}) })}`} className={`rounded-lg border px-3 py-2 text-sm ${!tahunAktif ? "border-gunung bg-gunung font-semibold text-white" : "border-tinta/10 bg-white text-tinta-pudar hover:border-gunung/40"}`}>Semua</Link>
              {daftarTahun.map((t) => <Link key={t} href={`/transparansi?${new URLSearchParams({ ...(q ? { q } : {}), ...(kategoriAktif ? { kategori: kategoriAktif } : {}), tahun: String(t) })}`} className={`rounded-lg border px-3 py-2 text-sm ${tahunAktif === t ? "border-gunung bg-gunung font-semibold text-white" : "border-tinta/10 bg-white text-tinta-pudar hover:border-gunung/40"}`}>{t}</Link>)}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between gap-4 border-b border-jerami pb-3">
          <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-daun-tua">Arsip DPRD Cianjur</p><h2 className="mt-1 font-heading text-xl text-gunung sm:text-2xl">Dokumen publik</h2></div>
          <p className="shrink-0 text-sm text-tinta-pudar"><span className="font-heading text-xl font-bold text-gunung">{daftar.length}</span> dokumen</p>
        </div>
        <p className="mt-3 text-xs text-tinta-pudar">{q ? `Hasil pencarian “${q}”` : "Diurutkan dari dokumen terbaru"}{kategoriAktif ? ` · ${kategoriAktif}` : ""}{tahunAktif ? ` · ${tahunAktif}` : ""}</p>
        {tahun && !tahunAktif && <p className="mt-2 text-xs text-emas-tua">Tahun pada tautan tidak dikenali; filter tahun diabaikan.</p>}

        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {daftar.map((d) => (
            <KartuArsip key={d.id} dokumen={d} varian="arsip" />
          ))}
          {daftar.length === 0 && (
            <div className="grid items-center gap-4 rounded-3xl border border-dashed border-tinta/15 bg-krem p-6 sm:grid-cols-[auto_1fr] sm:p-8">
              <span aria-hidden className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-daun-tua shadow-sm"><Ikon nama="search" ukuran={25} /></span>
              <div><p className="font-semibold text-tinta">Tidak ada dokumen pada filter ini.</p>
              <p className="mt-1 text-sm text-tinta-pudar">
                Silakan coba kata kunci atau ubah kategori dan tahun yang dipilih, atau hubungi
                Sekretariat DPRD untuk bantuan.
              </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
