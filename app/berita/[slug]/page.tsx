import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ANGGOTA, BERITA } from "@/lib/demo-data";
import { GarisPadi } from "@/components/garis-padi";
import { PlaceholderFoto } from "@/components/placeholder-foto";
import { AvatarInisial } from "@/components/avatar-inisial";
import { Ikon } from "@/components/ikon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const berita = BERITA.find((b) => b.slug === slug);
  if (!berita) return { title: "Berita" };
  return { title: berita.judul, description: berita.ringkasan };
}

export function generateStaticParams() {
  return BERITA.map((b) => ({ slug: b.slug }));
}

function tanggalPanjang(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function DetailBerita({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const berita = BERITA.find((b) => b.slug === slug);
  if (!berita) notFound();

  const dewanTerkait = (berita.dewanTerkait ?? [])
    .map((s) => ANGGOTA.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const beritaLain = BERITA.filter((item) => item.slug !== berita.slug)
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/berita" className="text-sm font-semibold text-cianjur hover:text-gunung">
        <span className="inline-flex items-center gap-1.5"><Ikon nama="arrow-left" ukuran={15} />Semua berita</span>
      </Link>

      <div className="mt-6 flex items-center gap-2 text-xs text-tinta-pudar">
        <span className="font-semibold text-gunung">{berita.kategori}</span>
        <span aria-hidden>·</span>
        <time dateTime={berita.tanggal}>{tanggalPanjang(berita.tanggal)}</time>
      </div>

      <h1 className="mt-2 font-heading text-3xl leading-tight text-tinta sm:text-4xl">
        {berita.judul}
      </h1>

      {berita.gambar ? (
        <figure className="relative mt-6 aspect-video overflow-hidden rounded-3xl border border-tinta/5">
          <Image
            src={berita.gambar}
            alt={berita.gambarAlt ?? berita.judul}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          {berita.gambarIlustrasi && <figcaption className="absolute bottom-4 right-4 rounded-full border border-white/35 bg-gunung/75 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-sm">Ilustrasi</figcaption>}
        </figure>
      ) : (
        <PlaceholderFoto className="mt-6 aspect-video rounded-3xl border border-tinta/5" />
      )}

      <div className="mt-8 space-y-4 text-base leading-relaxed text-tinta">
        {berita.isi.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {dewanTerkait.length > 0 && (
        <section className="mt-10">
          <h2 className="font-heading text-xl text-tinta">Dewan Terkait</h2>
          <GarisPadi className="mt-3 max-w-[140px]" />
          <ul className="mt-4 flex flex-wrap gap-3">
            {dewanTerkait.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/anggota/${a.slug}`}
                  className="flex items-center gap-3 rounded-full border border-tinta/10 bg-white py-1.5 pl-1.5 pr-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <AvatarInisial nama={a.nama} size="sm" />
                  <span className="text-sm font-semibold text-tinta">
                    {a.nama}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {beritaLain.length > 0 && (
        <section aria-labelledby="berita-lain" className="mt-10 border-t border-jerami pt-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-daun-tua">Kabar terbaru</p>
          <h2 id="berita-lain" className="mt-1 font-heading text-xl text-gunung">Berita lainnya</h2>
          <ul className="mt-4 divide-y divide-jerami rounded-2xl border border-jerami bg-white px-4">
            {beritaLain.map((item) => (
              <li key={item.slug}>
                <Link href={`/berita/${item.slug}`} className="group flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span className="text-sm font-semibold leading-snug text-tinta transition-colors group-hover:text-daun-tua">{item.judul}</span>
                  <time className="shrink-0 text-xs text-tinta-pudar" dateTime={item.tanggal}>{tanggalPanjang(item.tanggal)}</time>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-10">
        <GarisPadi />
        <p className="mt-4 text-xs text-tinta-pudar">
          Sumber: Humas Sekretariat DPRD Kabupaten Cianjur.
        </p>
      </div>
    </div>
  );
}
