import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ANGGOTA } from "@/lib/demo-data";
import { PotretAnggota } from "@/components/potret-anggota";
import { Ikon } from "@/components/ikon";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const anggota = ANGGOTA.find((a) => a.slug === slug);
  if (!anggota) return { title: "Anggota" };
  return {
    title: anggota.nama,
    description: `Profil ${anggota.nama}, anggota DPRD Kabupaten Cianjur dari Dapil ${anggota.dapil.replace("Cianjur ", "")} untuk periode ${anggota.periode}.`,
  };
}

export function generateStaticParams() {
  return ANGGOTA.map((a) => ({ slug: a.slug }));
}

export default async function ProfilAnggota({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const anggota = ANGGOTA.find((a) => a.slug === slug);
  if (!anggota) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <nav aria-label="Breadcrumb" className="text-sm">
        <Link href="/anggota" className="font-semibold text-daun-tua transition-colors hover:text-gunung">Anggota Dewan</Link>
        <span aria-hidden className="mx-2 text-tinta-pudar">/</span>
        <span className="text-tinta-pudar">Profil</span>
      </nav>

      <article className="mt-5 overflow-hidden rounded-3xl border border-jerami bg-white shadow-sm">
        <div className="relative overflow-hidden bg-gunung px-5 py-7 text-white sm:px-8 sm:py-9">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-36 h-80 w-80 rounded-full bg-daun/20 blur-3xl" />
          <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
            <PotretAnggota nama={anggota.nama} foto={anggota.foto} className="w-28 rounded-2xl border-white/20 shadow-xl sm:w-36" ukuranInisial="lg" fotoClassName="object-cover object-top scale-[1.08]" />
            <div className="min-w-0">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">{anggota.jabatan ?? "Anggota DPRD Kabupaten Cianjur"}</span>
              <h1 className="mt-3 break-words font-heading text-2xl font-semibold leading-tight sm:text-4xl">
                {anggota.nama}
              </h1>
              <p className="mt-2 text-sm text-white/70">Partai {anggota.partai}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5">Dapil {anggota.dapil.replace("Cianjur ", "")}</span>
                <span className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5">Periode {anggota.periode}</span>
              </div>
            </div>
          </div>
        </div>

        <section aria-labelledby="informasi-anggota" className="p-5 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-jerami pb-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-daun-tua">Profil perwakilan</p>
              <h2 id="informasi-anggota" className="mt-1 font-heading text-xl text-gunung sm:text-2xl">Informasi keanggotaan</h2>
            </div>
            <p className="text-xs text-tinta-pudar">DPRD Kabupaten Cianjur · {anggota.periode}</p>
          </div>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Partai Politik", anggota.partai],
              ["Daerah Pemilihan", `Dapil ${anggota.dapil.replace("Cianjur ", "")}`],
              ["Masa Jabatan", anggota.periode],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-jerami bg-krem/70 p-4">
                <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-tinta-pudar">{label}</dt>
                <dd className="mt-2 text-sm font-semibold leading-snug text-tinta">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-jerami pt-5">
            <p className="text-xs text-tinta-pudar">Informasi keanggotaan DPRD Kabupaten Cianjur.</p>
            <Link href="/anggota" className="inline-flex items-center gap-1.5 rounded-full border border-gunung/15 px-4 py-2 text-sm font-semibold text-gunung transition-colors hover:border-gunung/30 hover:bg-pucuk"><Ikon nama="arrow-left" ukuran={15} />Kembali ke daftar anggota</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
