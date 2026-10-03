import { Ikon } from "@/components/ikon";

type Kategori = "Anggaran" | "Kinerja" | "PPID" | "Informasi";

export function FormPencarianArsip({
  query,
  kategori,
  tahun,
}: {
  query: string;
  kategori?: Kategori;
  tahun?: number;
}) {
  return (
    <form action="/transparansi" className="relative mt-5 flex max-w-2xl gap-2 sm:mt-6">
      {kategori && <input type="hidden" name="kategori" value={kategori} />}
      {tahun && <input type="hidden" name="tahun" value={tahun} />}
      <label htmlFor="cari-arsip" className="sr-only">Cari judul, nomor, kategori, atau tahun dokumen</label>
      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-tinta/15 bg-white px-3.5 shadow-sm focus-within:border-daun focus-within:ring-2 focus-within:ring-daun/15">
        <Ikon nama="search" ukuran={18} />
        <input
          id="cari-arsip"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Cari judul atau nomor dokumen"
          className="h-11 min-w-0 flex-1 bg-transparent text-sm text-tinta outline-none placeholder:text-tinta-pudar/80"
        />
      </div>
      <button type="submit" className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-gunung px-4 text-sm font-semibold text-white transition-colors hover:bg-gunung-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cianjur">
        <Ikon nama="search" ukuran={16} /><span className="hidden sm:inline">Cari arsip</span><span className="sm:hidden">Cari</span>
      </button>
    </form>
  );
}
