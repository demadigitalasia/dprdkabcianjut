import Link from "next/link";
import Image from "next/image";
import type { Berita } from "@/lib/demo-data";
import { Ikon } from "@/components/ikon";

function tanggalIndo(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function KartuBerita({ berita, besar = false }: { berita: Berita; besar?: boolean }) {
  const dewan = berita.kategori === "Dewan";

  return (
    <article
      className={`group overflow-hidden rounded-2xl border border-tinta/5 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ${
        besar ? "md:col-span-2" : ""
      }`}
    >
      <Link href={`/berita/${berita.slug}`} className="block">
        <div className={`relative aspect-video overflow-hidden ${dewan ? "bg-gradient-to-br from-pucuk via-white to-pucuk" : "bg-gradient-to-br from-cianjur/10 via-white to-cianjur/5"}`}>
          {berita.gambar ? (
            <Image
              src={berita.gambar}
              alt={berita.gambarAlt ?? berita.judul}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div aria-hidden className={`absolute inset-0 overflow-hidden ${dewan ? "bg-[radial-gradient(ellipse_at_82%_105%,rgba(0,165,81,0.2),transparent_48%),linear-gradient(135deg,#e6f6ec_0%,#ffffff_52%,#eaf4f8_100%)]" : "bg-[radial-gradient(ellipse_at_82%_105%,rgba(0,91,172,0.14),transparent_48%),linear-gradient(135deg,#eaf4f8_0%,#ffffff_52%,#f3f7f9_100%)]"}`}>
              <span className="absolute -right-8 -top-16 h-48 w-48 rounded-full border border-daun/10" />
              <span className="absolute -right-2 -top-10 h-36 w-36 rounded-full border border-cianjur/10" />
              <span className="absolute bottom-4 left-4 rounded-full border border-white/80 bg-white/75 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-gunung/75 backdrop-blur-sm">DPRD Kabupaten Cianjur</span>
            </div>
          )}
          <span
            className={`absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide backdrop-blur ${
              dewan ? "text-daun-tua" : "text-cianjur"
            }`}
          >
            {berita.kategori}
          </span>
          {berita.gambarIlustrasi && (
            <span className="absolute bottom-3 right-3 rounded-full border border-white/35 bg-gunung/75 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
              Ilustrasi
            </span>
          )}
        </div>
        <div className="flex h-full min-h-52 flex-col p-5">
          <time className="text-xs text-tinta-pudar" dateTime={berita.tanggal}>
            {tanggalIndo(berita.tanggal)}
          </time>
          <h3
            className={`mt-2 font-heading text-tinta transition-colors group-hover:text-daun-tua ${
              besar ? "text-2xl" : "text-lg"
            }`}
          >
            {berita.judul}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-tinta-pudar">{berita.ringkasan}</p>
          <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-bold text-daun-tua transition-all group-hover:gap-2">
            Baca berita <Ikon nama="arrow-right" ukuran={14} />
          </span>
        </div>
      </Link>
    </article>
  );
}
