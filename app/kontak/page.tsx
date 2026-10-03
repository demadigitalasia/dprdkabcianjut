import Image from "next/image";
import { Ikon } from "@/components/ikon";

export const metadata = { title: "Kontak" };

const ALAMAT = "Jl. K. H. Abdullah Bin Nuh KM. 1, Cianjur";
const TELEPON = "+62263272150";
const EMAIL = "Setwankabcianjur@gmail.com";
const TAUTAN_PETA = "https://maps.google.com/?q=Jl.+K.+H.+Abdullah+Bin+Nuh+KM.+1+Cianjur";

export default function HalamanKontak() {
  return (
    <>
      <section aria-labelledby="kontak-title" className="relative isolate overflow-hidden bg-gunung text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_12%,rgba(245,210,0,0.14),transparent_26%),radial-gradient(ellipse_at_12%_100%,rgba(0,165,81,0.22),transparent_34%),linear-gradient(116deg,#062f26_0%,#0a3d2e_52%,#124937_100%)]" />
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-64 -z-10 size-[34rem] rounded-full border border-white/[0.07]" />
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-48 -z-10 size-[26rem] rounded-full border border-emas/[0.09]" />
        <div aria-hidden className="pointer-events-none absolute -right-8 -top-32 -z-10 size-[18rem] rounded-full border border-white/[0.06]" />
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-9 sm:px-6 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:py-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-emas">
              <Ikon nama="map-pin" ukuran={14} /> Layanan warga · Cianjur
            </p>
            <h1 id="kontak-title" className="mt-5 max-w-2xl font-heading text-3xl leading-tight text-white sm:text-5xl">
              Hubungi Sekretariat DPRD Kabupaten <span className="text-emas">Cianjur</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              Pilih saluran untuk menghubungi sekretariat atau rencanakan kunjungan ke kantor.
            </p>

            <div className="mt-6 grid max-w-xl gap-3 sm:grid-cols-2">
              <a href={`tel:${TELEPON}`} className="group flex min-h-14 items-center gap-3 rounded-xl border border-emas/80 bg-gradient-to-br from-emas via-emas to-[#e9c600] px-4 py-3 text-gunung shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gunung/10"><Ikon nama="phone" ukuran={19} /></span>
                <span><span className="block text-[10px] font-bold uppercase tracking-wider text-gunung/75">Telepon sekretariat</span><span className="mt-0.5 block text-sm font-bold">(0263) 272150</span></span>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex min-h-14 min-w-0 items-center gap-3 rounded-xl border border-white/20 bg-white/[0.08] px-4 py-3 text-white shadow-inner shadow-white/[0.04] transition duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emas">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10"><Ikon nama="mail" ukuran={19} /></span>
                <span className="min-w-0"><span className="block text-[10px] font-bold uppercase tracking-wider text-white/85">Email sekretariat</span><span className="mt-0.5 block break-words text-xs font-semibold leading-snug sm:text-[13px]">{EMAIL}</span></span>
              </a>
            </div>

            <a href="#lokasi" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/90 underline decoration-white/40 underline-offset-4 transition-colors hover:text-emas">
              <Ikon nama="map-pin" ukuran={17} /> Alamat dan jam kunjungan <Ikon nama="arrow-right" ukuran={15} />
            </a>
          </div>

          <figure className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] border border-white/25 bg-gunung-hover shadow-2xl shadow-black/25 ring-1 ring-inset ring-white/10 lg:aspect-[4/3]">
            <Image
              src="/ilustrasi-halaman/kontak-setwan.webp"
              alt="Ilustrasi warga berbicara dengan petugas sekretariat di meja layanan"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gunung/25 via-transparent to-daun-tua/35 mix-blend-multiply" />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gunung/65 via-gunung/10 to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-emas/20" />
            <figcaption className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-gunung/85 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
              Ilustrasi layanan warga
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="lokasi" aria-label="Informasi kunjungan" className="mx-auto grid max-w-6xl scroll-mt-24 gap-5 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1.15fr_0.85fr]">
        <article aria-labelledby="lokasi-title" className="rounded-2xl border border-jerami bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-pucuk text-daun-tua"><Ikon nama="map-pin" ukuran={22} /></span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-daun-tua">Kantor Sekretariat</p>
              <h2 id="lokasi-title" className="mt-1 font-heading text-xl text-gunung sm:text-2xl">Alamat dan rute</h2>
              <address className="mt-3 max-w-xl text-base not-italic leading-relaxed text-tinta">{ALAMAT}</address>
              <a href={TAUTAN_PETA} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-gunung px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-gunung-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cianjur">
                Buka petunjuk arah <Ikon nama="arrow-up-right" ukuran={15} />
              </a>
            </div>
          </div>
        </article>

        <article aria-labelledby="jam-title" className="rounded-2xl border border-jerami bg-[#f5f8f6] p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-pucuk text-daun-tua"><Ikon nama="calendar" ukuran={21} /></span>
            <div><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-daun-tua">Waktu pelayanan</p><h2 id="jam-title" className="font-heading text-xl text-gunung">Jam layanan</h2></div>
          </div>
          <dl className="mt-5 divide-y divide-tinta/10 text-sm">
            <div className="flex items-center justify-between gap-3 py-3"><dt className="font-medium text-tinta">Senin–Kamis</dt><dd className="shrink-0 font-semibold text-gunung">08.00–16.00</dd></div>
            <div className="flex items-center justify-between gap-3 py-3"><dt className="font-medium text-tinta">Jumat</dt><dd className="shrink-0 font-semibold text-gunung">08.00–16.30</dd></div>
            <div className="flex items-center justify-between gap-3 py-3"><dt className="font-medium text-tinta-pudar">Sabtu, Minggu &amp; hari libur</dt><dd className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-tinta-pudar">Tutup</dd></div>
          </dl>
          <p className="mt-2 border-t border-tinta/10 pt-3 text-xs text-tinta-pudar">Waktu Indonesia Barat (WIB)</p>
          <a href="/aspirasi" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-daun-tua underline decoration-daun/40 underline-offset-4 hover:text-gunung">Sampaikan aspirasi secara online <Ikon nama="arrow-right" ukuran={15} /></a>
        </article>
      </section>
    </>
  );
}
