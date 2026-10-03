import { Ikon } from "@/components/ikon";

export function TombolUnduh({ berkas }: { berkas?: string }) {
  if (!berkas) {
    return (
      <span className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-krem px-3 text-xs font-semibold text-tinta-pudar">
        <Ikon nama="download" ukuran={14} /> Berkas digital belum tersedia
      </span>
    );
  }

  return (
    <a href={berkas} download className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-gunung px-3 text-xs font-bold text-white transition-colors hover:bg-gunung-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cianjur">
      <Ikon nama="download" ukuran={14} /> Unduh dokumen
    </a>
  );
}
