import Image from "next/image";
import { GarisPadi } from "@/components/garis-padi";

export function PageHeader({
  label,
  judul,
  deskripsi,
  gambar,
  altGambar,
}: {
  label: string;
  judul: string;
  deskripsi?: string;
  gambar: string;
  altGambar: string;
}) {
  return (
    <div className="relative overflow-hidden border-b border-tinta/5 bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-9 sm:grid-cols-[minmax(0,1.25fr)_minmax(15rem,0.75fr)] sm:items-center sm:gap-10 sm:px-6 sm:py-12">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-pucuk px-3 py-1 text-xs font-semibold uppercase tracking-widest text-daun-tua">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-daun" />
            {label}
          </p>
          <h1 className="mt-4 font-heading text-3xl text-tinta sm:text-5xl">{judul}</h1>
          {deskripsi ? (
            <p className="mt-3 max-w-xl text-base leading-relaxed text-tinta-pudar">
              {deskripsi}
            </p>
          ) : null}
          <GarisPadi className="mt-6 max-w-[160px]" />
        </div>
        <figure className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-tinta/10 bg-krem sm:aspect-[4/3]">
          <Image
            src={gambar}
            alt={altGambar}
            fill
            sizes="(max-width: 640px) 100vw, 36vw"
            className="object-cover"
          />
          <figcaption className="absolute bottom-3 right-3 rounded-full bg-gunung/85 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            Ilustrasi
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
