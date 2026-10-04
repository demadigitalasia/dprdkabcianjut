import Image from "next/image";
import Link from "next/link";
import type { Anggota } from "@/lib/demo-data";
import { AvatarInisial } from "@/components/avatar-inisial";
import { Ikon } from "@/components/ikon";

export function SorotanPimpinan({
  ketua,
  wakilKetua,
}: {
  ketua: Anggota;
  wakilKetua: Anggota[];
}) {
  const daftarPimpinan = [ketua, ...wakilKetua];

  return (
    <section aria-labelledby="pimpinan-beranda" className="bg-[#f5f7f9]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:py-16">
        <header className="text-center">
          <p className="mx-auto inline-flex items-center rounded-full bg-emas/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-daun-tua">
            Pimpinan · Periode 2024–2029
          </p>
          <h2 id="pimpinan-beranda" className="mt-3 font-heading text-3xl font-semibold text-tinta sm:text-4xl">
            Pimpinan DPRD
          </h2>
          <p className="mt-2 text-sm text-tinta-pudar">Ketua dan Wakil Ketua DPRD Kabupaten Cianjur.</p>
          <Link
            href="/anggota#pimpinan-dprd"
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-daun-tua transition-colors hover:text-gunung focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gunung"
          >
            Seluruh profil pimpinan <Ikon nama="arrow-right" ukuran={14} />
          </Link>
        </header>

        <ul className="mt-6 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-4 [scrollbar-width:thin] [scrollbar-color:#8ba99a_transparent] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-8 lg:grid-cols-4 lg:gap-4 xl:gap-5">
          {daftarPimpinan.map((anggota) => (
            <li key={anggota.slug} className="w-[78vw] max-w-[19rem] shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink">
              <Link
                href={`/anggota/${anggota.slug}`}
                aria-label={`${anggota.jabatan} ${anggota.nama}, Partai ${anggota.partai}, Dapil ${anggota.dapil.replace("Cianjur ", "")}`}
                className={`group relative block aspect-[3/4] overflow-hidden rounded-[1.4rem] border bg-[#e8efeb] shadow-[0_10px_26px_rgba(13,48,39,0.10)] transition-[transform,box-shadow,border-color] duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_18px_36px_rgba(13,48,39,0.18)] motion-reduce:transition-none ${anggota.jabatan === "Ketua" ? "border-emas/70" : "border-white/80"} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gunung`}
              >
                {anggota.foto ? (
                  <Image
                    src={anggota.foto}
                    alt={`Potret ${anggota.nama}`}
                    fill
                    sizes="(max-width: 639px) 78vw, (max-width: 1023px) 45vw, 25vw"
                    className="scale-[1.07] object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.11] motion-reduce:transition-none"
                  />
                ) : (
                  <span className="absolute inset-0 grid place-items-center bg-[radial-gradient(ellipse_at_70%_8%,rgba(245,210,0,0.24),transparent_45%),linear-gradient(155deg,#e6f6ec_0%,#fff_55%,#edf5f7_100%)]">
                    <AvatarInisial nama={anggota.nama} size="lg" />
                  </span>
                )}
                <span aria-hidden className="absolute inset-0 bg-gradient-to-b from-gunung/5 via-transparent via-45% to-gunung/95" />
                <span aria-hidden className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-daun via-emas to-cianjur transition-all duration-300 motion-reduce:transition-none ${anggota.jabatan === "Ketua" ? "h-1.5 opacity-100" : "opacity-80 group-hover:opacity-100"}`} />
                {anggota.jabatan === "Ketua" && (
                  <span className="absolute left-4 top-4 rounded-full border border-emas/45 bg-gunung/45 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-emas backdrop-blur-sm">
                    Ketua DPRD
                  </span>
                )}

                <span className="absolute inset-x-3 bottom-5 text-center text-white sm:inset-x-2.5 sm:bottom-4 lg:inset-x-3 lg:bottom-5">
                  <span className="mx-auto flex min-h-[2.35em] max-w-full items-end justify-center break-words font-heading text-base font-semibold leading-tight [text-shadow:0_1px_5px_rgba(0,0,0,0.7)] sm:text-sm lg:text-base xl:text-lg">
                    {anggota.nama}
                  </span>
                  <span aria-hidden className="mx-auto my-2 flex w-14 items-center justify-center gap-1.5 text-emas">
                    <span className="h-px flex-1 bg-emas/80" />
                    <span className="text-[13px] leading-none">★</span>
                    <span className="h-px flex-1 bg-emas/80" />
                  </span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-white sm:text-[9px] lg:text-[10px]">
                    {anggota.jabatan}
                  </span>
                  <span className="mt-1.5 block text-[11px] leading-snug text-white/85 sm:text-[10px] lg:text-[11px]">
                    Partai {anggota.partai} <span aria-hidden>·</span> Dapil {anggota.dapil.replace("Cianjur ", "")}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
