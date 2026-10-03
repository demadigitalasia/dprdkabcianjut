import type { Dokumen } from "@/lib/demo-data";
import { Ikon } from "@/components/ikon";
import { TombolUnduh } from "@/components/tombol-unduh";

function tanggalIndo(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const AKSEN_KATEGORI: Record<Dokumen["kategori"], { kartu: string; lencana: string }> = {
  Anggaran: { kartu: "border-l-emas", lencana: "bg-emas/25 text-emas-tua" },
  Kinerja: { kartu: "border-l-daun", lencana: "bg-pucuk text-daun-tua" },
  PPID: { kartu: "border-l-cianjur", lencana: "bg-cianjur/10 text-cianjur" },
  Informasi: { kartu: "border-l-gunung", lencana: "bg-gunung/10 text-gunung" },
};

export function KartuArsip({ dokumen, varian = "ringkas" }: { dokumen: Dokumen; varian?: "ringkas" | "arsip" }) {
  if (varian === "arsip") {
    const aksen = AKSEN_KATEGORI[dokumen.kategori];
    return (
      <article className={`group flex min-w-0 flex-col rounded-xl border border-jerami border-l-[3px] ${aksen.kartu} bg-white p-4 transition-colors hover:border-daun/40 sm:p-5`}>
        <div className="flex items-start justify-between gap-3">
          <span className={`inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${aksen.lencana}`}>{dokumen.kategori}</span>
          <span className="shrink-0 font-mono text-[11px] text-tinta-pudar">{dokumen.nomor}</span>
        </div>
        <h3 className="mt-3 flex-1 font-heading text-base leading-snug text-tinta sm:text-lg">{dokumen.judul}</h3>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-jerami pt-3 text-xs text-tinta-pudar">
          <span className="font-semibold text-gunung">{dokumen.tahun}</span>
          {dokumen.berkas && <span>PDF · {dokumen.ukuran}</span>}
          <span>Tanggal <time dateTime={dokumen.tanggal}>{tanggalIndo(dokumen.tanggal)}</time></span>
        </div>
        <div className="mt-3 border-t border-jerami pt-3"><TombolUnduh berkas={dokumen.berkas} /></div>
      </article>
    );
  }

  const aksen = AKSEN_KATEGORI[dokumen.kategori];
  return (
    <article className={`flex items-start gap-4 rounded-2xl border border-tinta/5 border-l-[3px] ${aksen.kartu} bg-white p-4 shadow-sm transition-all hover:shadow-lg`}>
      <span
        aria-hidden
        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-daun/10"
      >
        <Ikon nama="download" ukuran={19} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className={`rounded-full px-2.5 py-0.5 font-bold ${aksen.lencana}`}>
            {dokumen.kategori}
          </span>
          <span className="text-tinta-pudar">
            {dokumen.tahun} · No. {dokumen.nomor}
          </span>
        </div>
        <h3 className="mt-2 font-heading text-base leading-snug text-tinta">{dokumen.judul}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-tinta-pudar">
          {dokumen.berkas && <span>PDF · {dokumen.ukuran}</span>}
          <span aria-hidden>·</span>
          <span>Tanggal <time dateTime={dokumen.tanggal}>{tanggalIndo(dokumen.tanggal)}</time></span>
          <TombolUnduh berkas={dokumen.berkas} />
        </div>
      </div>
    </article>
  );
}
