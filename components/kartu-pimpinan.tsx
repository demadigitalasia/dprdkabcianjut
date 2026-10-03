import Link from "next/link";
import type { Anggota } from "@/lib/demo-data";
import { PotretAnggota } from "@/components/potret-anggota";
import { Ikon } from "@/components/ikon";

export function KartuPimpinan({ anggota, utama = false }: { anggota: Anggota; utama?: boolean }) {
  return (
    <Link
      href={`/anggota/${anggota.slug}`}
      className={`group flex min-w-0 items-center gap-4 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gunung ${utama ? "border-gunung/20 bg-gunung text-white sm:p-5" : "border-jerami bg-white text-tinta"}`}
    >
      <PotretAnggota
        nama={anggota.nama}
        foto={anggota.foto}
        className={`w-[78px] rounded-xl sm:w-[88px] ${utama ? "border-white/20" : ""}`}
        ukuranInisial="sm"
        fotoClassName="object-cover object-top scale-[1.08]"
      />
      <span className="min-w-0">
        <span className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] ${utama ? "bg-emas text-gunung" : "bg-pucuk text-daun-tua"}`}>
          {anggota.jabatan}
        </span>
        <span className={`mt-2 block break-words font-heading font-semibold leading-snug ${utama ? "text-base sm:text-lg" : "text-sm"}`}>
          {anggota.nama}
        </span>
        <span className={`mt-1 block text-[11px] ${utama ? "text-white/65" : "text-tinta-pudar"}`}>{anggota.partai} <span aria-hidden>·</span> Dapil {anggota.dapil.replace("Cianjur ", "")}</span>
        <span className={`mt-2 inline-flex items-center gap-1 text-[10px] font-bold transition-all group-hover:gap-2 ${utama ? "text-emas" : "text-daun-tua"}`}>
          Lihat profil <Ikon nama="arrow-right" ukuran={14} />
        </span>
      </span>
    </Link>
  );
}
