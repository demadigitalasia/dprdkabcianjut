import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { FormAspirasi } from "@/components/form-aspirasi";
import { Ikon } from "@/components/ikon";

export const metadata = { title: "Aspirasi Warga" };

const TAHAP = [
  ["01", "Diterima", "Warga mengirim usulan dan memilih wilayah serta topik."],
  ["02", "Diperiksa Setwan", "Kelengkapan dan arah penanganan ditinjau."],
  ["03", "Dibahas", "Aspirasi diarahkan untuk pembahasan sesuai kewenangan."],
  ["04", "Ada kabar lanjutan", "Perkembangan dapat diperiksa menggunakan nomor tiket."],
];

export default function HalamanAspirasi() {
  return (
    <>
      <PageHeader
        label="Partisipasi Warga Cianjur"
        judul="Sampaikan aspirasi untuk Cianjur"
        deskripsi="Pilih topik dan kecamatan agar usulan lebih mudah dipahami dan diarahkan untuk ditinjau."
        gambar="/ilustrasi-halaman/aspirasi-forum-warga.webp"
        altGambar="Warga berdiskusi dalam forum kampung di Cianjur"
      />

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.8fr)] lg:gap-12 lg:py-14">
        <div className="min-w-0">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-daun-tua">Kanal aspirasi DPRD</p>
              <h2 className="mt-1 font-heading text-2xl text-gunung">Ceritakan kebutuhan di wilayah Anda</h2>
            </div>
            <Link href="/aspirasi/lacak" className="inline-flex items-center gap-2 rounded-full border border-tinta/10 bg-white px-4 py-2.5 text-sm font-semibold text-gunung transition-colors hover:border-daun/40 hover:bg-pucuk">
              <Ikon nama="search" ukuran={16} /> Lacak tiket
            </Link>
          </div>

          <FormAspirasi />
        </div>

        <aside className="space-y-5 lg:pt-1">
          <div className="overflow-hidden rounded-3xl bg-gunung p-6 text-white shadow-lg shadow-gunung/10 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emas">Dari usulan ke pembahasan</p>
            <h2 className="mt-2 font-heading text-xl">Bagaimana aspirasi diarahkan?</h2>
            <ol className="mt-6 space-y-0">
              {TAHAP.map(([nomor, judul, uraian], indeks) => (
                <li key={nomor} className="relative flex gap-4 pb-5 last:pb-0">
                  {indeks < TAHAP.length - 1 && <span aria-hidden className="absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-px bg-white/20" />}
                  <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-emas/50 bg-white/5 font-heading text-xs font-bold text-emas">{nomor}</span>
                  <span className="pt-1">
                    <span className="block text-sm font-semibold">{judul}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-white/65">{uraian}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-white/15 pt-4 text-xs leading-relaxed text-white/60">
              Topik dan kecamatan membantu memberi arah awal. Penetapan penanganan tetap perlu ditinjau oleh petugas.
            </p>
          </div>

          <div className="rounded-3xl border border-jerami bg-krem p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-daun-tua">Pilih kanal yang tepat</p>
            <h2 className="mt-2 font-heading text-lg text-gunung">Usulan atau keluhan layanan?</h2>
            <p className="mt-2 text-sm leading-relaxed text-tinta-pudar">
              Usulan kebijakan dan pembangunan dapat disampaikan di formulir ini. Keluhan tentang layanan instansi pemerintah disampaikan melalui SP4N LAPOR.
            </p>
            <a href="https://www.lapor.go.id" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gunung underline decoration-daun/50 underline-offset-4 hover:text-daun-tua">
              Buka SP4N LAPOR <Ikon nama="arrow-right" ukuran={15} />
            </a>
          </div>

          <div className="rounded-2xl border border-tinta/10 bg-white px-5 py-4">
            <p className="text-sm font-semibold text-tinta">Perlu mengecek pengajuan?</p>
            <p className="mt-1 text-sm leading-relaxed text-tinta-pudar">Gunakan nomor tiket pada halaman pelacakan. Pada formulir ini, tiket hanya tersedia di browser yang sama.</p>
            <Link href="/aspirasi/lacak" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-cianjur hover:text-gunung">Lacak aspirasi <Ikon nama="arrow-right" ukuran={15} /></Link>
          </div>
        </aside>
      </section>
    </>
  );
}
