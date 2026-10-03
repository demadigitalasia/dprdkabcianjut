import type { Metadata } from "next";
import { ANGGOTA, DAPIL_INFO, PIMPINAN_DPRD } from "@/lib/demo-data";
import { DaftarAnggota } from "@/components/daftar-anggota";
import { KartuDapil } from "@/components/kartu-dapil";
import { KartuPimpinan } from "@/components/kartu-pimpinan";
import { GarisPadi } from "@/components/garis-padi";

export const metadata: Metadata = { title: "Anggota Dewan" };

export default async function HalamanAnggota({
  searchParams,
}: {
  searchParams: Promise<{ dapil?: string }>;
}) {
  const { dapil } = await searchParams;
  const dapilValid = dapil && ANGGOTA.some((a) => a.dapil === dapil) ? dapil : "";
  const jumlahPartai = new Set(ANGGOTA.map((a) => a.partai)).size;
  const ketua = PIMPINAN_DPRD.find((a) => a.jabatan === "Ketua");
  const urutanWakilKetua = ["ganjar-ramadhan", "susilawati", "lepi-ali-firmansyah"];
  const wakilKetua = PIMPINAN_DPRD.filter((a) => a.jabatan === "Wakil Ketua")
    .sort((a, b) => urutanWakilKetua.indexOf(a.slug) - urutanWakilKetua.indexOf(b.slug));
  const anggotaLain = ANGGOTA.filter((a) => !a.jabatan);

  return (
    <>
      <section className="relative overflow-hidden bg-gunung text-white">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-32 h-[28rem] w-[28rem] rounded-full bg-daun/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 left-[38%] h-80 w-80 rounded-full bg-emas/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-9 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.17em] text-emas sm:text-xs">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emas" />
              Dewan Perwakilan Rakyat Daerah
            </p>
            <h1 className="mt-5 max-w-2xl font-heading text-4xl leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
              Kenali wakil Anda<span className="text-emas">.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              Temukan wakil rakyat Kabupaten Cianjur berdasarkan nama, daerah pemilihan, atau partai politik.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-white/70">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Periode 2024–2029</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Sistem proporsional terbuka</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Lembaga unikameral</span>
            </div>
            <GarisPadi className="mt-7 max-w-40" />
          </div>

          <dl aria-label="Ringkasan komposisi DPRD" className="grid grid-cols-3 divide-x divide-white/15 border-y border-white/15 py-4 sm:py-5">
            {[
              [ANGGOTA.length, "Anggota Dewan"],
              [DAPIL_INFO.length, "Daerah Pemilihan"],
              [jumlahPartai, "Partai Politik"],
            ].map(([jumlah, label]) => (
              <div key={label} className="px-3 first:pl-0 last:pr-0 sm:px-5">
                <dt className="sr-only">{label}</dt>
                <dd className="font-heading text-3xl font-semibold text-white sm:text-4xl">{jumlah}</dd>
                <p aria-hidden className="mt-1 text-[10px] leading-snug text-white/60 sm:text-xs">{label}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {ketua && (
        <section aria-labelledby="pimpinan-dprd" className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10">
          <div className="mb-4 border-b border-jerami pb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-daun-tua">Periode 2024–2029</p>
            <h2 id="pimpinan-dprd" className="mt-1 font-heading text-xl text-gunung sm:text-2xl">Pimpinan DPRD</h2>
            <p className="mt-1.5 text-sm text-tinta-pudar">Ketua dan Wakil Ketua DPRD Kabupaten Cianjur.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-[0.9fr_2.1fr]">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-tinta-pudar">Ketua</p>
              <KartuPimpinan anggota={ketua} utama />
            </div>
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-tinta-pudar">Wakil Ketua</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {wakilKetua.map((anggota) => <KartuPimpinan key={anggota.slug} anggota={anggota} />)}
              </div>
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="sebaran-dapil" className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-jerami pb-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-daun-tua">Wilayah pemilihan</p>
            <h2 id="sebaran-dapil" className="mt-1 font-heading text-xl text-gunung sm:text-2xl">Wilayah dan alokasi kursi</h2>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-tinta-pudar">Pilih daerah pemilihan untuk melihat anggota yang mewakili wilayah tersebut.</p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DAPIL_INFO.map((item) => (
            <KartuDapil key={item.nama} dapil={item} />
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <DaftarAnggota anggota={anggotaLain} dapilAwal={dapilValid} />
      </div>
    </>
  );
}
