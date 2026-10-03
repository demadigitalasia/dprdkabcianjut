import Link from "next/link";
import type { Anggota } from "@/lib/demo-data";
import { PotretAnggota } from "@/components/potret-anggota";
import { Ikon } from "@/components/ikon";

export function KartuAnggota({ anggota }: { anggota: Anggota }) {
  return (
    <Link
      href={`/anggota/${anggota.slug}`}
      className="group relative flex min-h-[158px] items-start gap-3 overflow-hidden rounded-2xl border border-jerami bg-white p-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-daun/30 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gunung"
    >
      <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-transparent transition-colors group-hover:bg-daun/50" />
      <PotretAnggota nama={anggota.nama} foto={anggota.foto} className="w-[88px]" ukuranInisial="sm" />
      <span className="flex min-w-0 flex-1 flex-col self-stretch py-0.5">
        <span className="mt-1 line-clamp-2 font-heading text-[15px] font-semibold leading-snug text-tinta transition-colors group-hover:text-daun-tua">
          {anggota.nama}
        </span>
        <span className="mt-2 inline-flex w-fit rounded-full bg-pucuk px-2.5 py-1 text-[10px] font-semibold text-daun-tua">{anggota.partai}</span>
        <span className="mt-auto flex w-fit items-center gap-1.5 rounded-lg border border-jerami px-2 py-1 text-[10px] font-semibold text-gunung">
          <Ikon nama="map-pin" ukuran={12} className="text-emas-tua" />Dapil {anggota.dapil.replace("Cianjur ", "")}
        </span>
        <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-daun-tua opacity-80 transition-all group-hover:gap-2 group-hover:opacity-100">Lihat profil <Ikon nama="arrow-right" ukuran={13} /></span>
      </span>
    </Link>
  );
}
