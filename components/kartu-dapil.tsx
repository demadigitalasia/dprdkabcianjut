import Link from "next/link";
import { Ikon } from "@/components/ikon";

type DapilInfo = {
  nama: string;
  kursi: number;
  wilayah: string[];
};

export function KartuDapil({ dapil }: { dapil: DapilInfo }) {
  return (
    <Link
      href={`/anggota?dapil=${encodeURIComponent(dapil.nama)}#direktori-anggota`}
      className="group relative flex min-h-44 flex-col overflow-hidden rounded-2xl border border-jerami bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-daun/35 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gunung"
      aria-label={`Lihat anggota dan wilayah Dapil ${dapil.nama.replace("Cianjur ", "")}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <span aria-hidden className="font-heading text-4xl font-semibold leading-none text-daun/20 transition-colors group-hover:text-daun/40">{dapil.nama.replace("Cianjur ", "")}</span>
          <h3 className="font-heading text-sm font-semibold text-gunung">Daerah Pemilihan</h3>
        </div>
        <span className="rounded-full bg-pucuk px-2.5 py-1 text-[11px] font-bold text-daun-tua">{dapil.kursi} kursi</span>
      </div>
      <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.12em] text-tinta-pudar">Wilayah cakupan</p>
      <p className="mt-1.5 text-xs leading-relaxed text-tinta">{dapil.wilayah.join(" · ")}</p>
      <span className="mt-auto flex items-center justify-between border-t border-jerami pt-3 text-[11px] font-semibold text-daun-tua">
        Lihat wakil dapil ini <Ikon nama="arrow-right" ukuran={15} className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
