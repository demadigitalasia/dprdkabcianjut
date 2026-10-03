import Link from "next/link";
import Image from "next/image";
import { connection } from "next/server";
import { AGENDA, ANGGOTA, BERITA, DAPIL_INFO, DOKUMEN, type Agenda, type Dokumen } from "@/lib/demo-data";
import { KartuArsip } from "@/components/kartu-arsip";
import { GarisPadi, ButirPadi } from "@/components/garis-padi";
import { Ikon } from "@/components/ikon";

function tanggalPendek(iso: string) {
  return new Date(`${iso}T00:00:00+07:00`).toLocaleDateString("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "short",
  });
}

function waktuAgenda(agenda: Agenda) {
  const waktu = agenda.waktu.match(/\d{2}:\d{2}/)?.[0] ?? "09:00";
  return new Date(`${agenda.tanggal}T${waktu}:00+07:00`);
}

function dokumenTerbaruPerKategori(dokumen: Dokumen[]) {
  const prioritas: Dokumen["kategori"][] = ["Anggaran", "Kinerja", "Informasi"];
  return prioritas
    .map((kategori) => dokumen
      .filter((item) => item.kategori === kategori)
      .sort((a, b) => b.tanggal.localeCompare(a.tanggal))[0])
    .filter((item): item is Dokumen => Boolean(item))
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

export default async function Beranda() {
  await connection();
  const sekarang = new Date();
  const agendaMendatang = AGENDA
    .filter((agenda) => waktuAgenda(agenda) > sekarang)
    .sort((a, b) => waktuAgenda(a).getTime() - waktuAgenda(b).getTime())
    .slice(0, 2);
  const [utama, ...lainnya] = [...BERITA].sort((a, b) => b.tanggal.localeCompare(a.tanggal)).slice(0, 4);
  const dokumenTerbaru = dokumenTerbaruPerKategori(DOKUMEN);

  return (
    <>
      {/* HERO — dark green dengan glow & teks gradien emas */}
      <section className="relative overflow-hidden bg-gunung text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-daun/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-emas/15 blur-3xl"
        />
        <Image
          src="/illustrations/lanskap-cianjur-hero-v2.webp"
          alt=""
          aria-hidden
          width={2172}
          height={724}
          sizes="(max-width: 640px) 150vw, (max-width: 1024px) 130vw, 112vw"
          className="pointer-events-none absolute -bottom-8 -right-[34vw] z-0 w-[150vw] max-w-none opacity-80 sm:-right-[25vw] sm:w-[130vw] lg:-bottom-[12%] lg:-right-[12vw] lg:w-[112vw] xl:right-[-8vw] xl:w-[min(1450px,110vw)]"
          priority
        />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-emas backdrop-blur">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emas" />
              Portal DPRD Kabupaten Cianjur
            </p>
            <h1 className="mt-6 font-heading text-4xl leading-[1.05] sm:text-6xl">
              Suara warga Cianjur,{" "}
              <span className="bg-gradient-to-r from-emas to-emas-terang bg-clip-text text-transparent">
                sampai ke wakilnya.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
              Satu pintu informasi DPRD Kabupaten Cianjur: temukan wakil Anda,
              ikuti agenda rapat, akses dokumen publik, dan siapkan masukan untuk DPRD.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/aspirasi"
                className="rounded-full bg-emas px-6 py-3 text-sm font-bold text-tinta shadow-lg shadow-emas/25 transition-transform hover:-translate-y-0.5"
              >
                Siapkan Aspirasi
              </Link>
              <Link
                href="/agenda"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                Lihat Agenda
              </Link>
            </div>

            <dl aria-label="Komposisi DPRD Kabupaten Cianjur" className="mt-8 grid max-w-sm grid-cols-2 divide-x divide-white/15 rounded-2xl border border-white/15 bg-gunung/70 px-4 py-3 backdrop-blur-sm sm:mt-10 sm:px-5 sm:py-4">
              <div>
                <dt className="sr-only">Anggota dewan</dt>
                <dd className="font-heading text-2xl text-white">{ANGGOTA.length}</dd>
                <p aria-hidden className="mt-0.5 text-xs leading-snug text-white/80">Anggota dewan</p>
              </div>
              <div className="pl-4 sm:pl-5">
                <dt className="sr-only">Daerah pemilihan</dt>
                <dd className="font-heading text-2xl text-white">{DAPIL_INFO.length}</dd>
                <p aria-hidden className="mt-0.5 text-xs leading-snug text-white/80">Daerah pemilihan</p>
              </div>
            </dl>
            <nav aria-label="Akses cepat warga" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/85">
              <Link href="/anggota" className="underline decoration-white/35 underline-offset-4 hover:text-emas">Cari anggota dewan</Link>
              <Link href="/aspirasi/lacak" className="underline decoration-white/35 underline-offset-4 hover:text-emas">Lacak nomor tiket</Link>
            </nav>
          </div>

        </div>
      </section>

      {/* Pita Agenda — kartu kuning mengambang */}
      <section aria-labelledby="agenda-terdekat" className="relative z-10 mx-auto mt-0 max-w-6xl px-4 sm:-mt-7 sm:px-6">
        <div className="rounded-2xl bg-emas p-4 text-tinta shadow-lg shadow-emas/15 sm:p-5 sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <h2 id="agenda-terdekat" className="flex shrink-0 items-center gap-2 text-sm font-bold">
              <ButirPadi /> Agenda Terdekat
            </h2>
            {agendaMendatang.length ? <ul className="flex min-w-0 flex-1 flex-col divide-y divide-tinta/15 lg:flex-row lg:divide-x lg:divide-y-0">
              {agendaMendatang.map((a) => (
                <li key={a.id} className="grid min-w-0 grid-cols-[3.5rem_minmax(0,1fr)] gap-x-3 py-3 text-sm first:pt-0 last:pb-0 lg:flex-1 lg:px-4 lg:py-0 lg:first:pl-0 lg:last:pr-0">
                  <time dateTime={`${a.tanggal}T${a.waktu.slice(0, 5)}:00+07:00`} className="row-span-2 shrink-0 font-heading font-bold">{tanggalPendek(a.tanggal)}</time>
                  <span className="min-w-0 leading-snug text-tinta">{a.judul}</span>
                  <span className="text-xs text-tinta/70">{a.waktu}</span>
                </li>
              ))}
            </ul> : <p className="flex-1 text-sm text-tinta/75">Belum ada agenda mendatang yang tercatat.</p>}
            <Link
              href="/agenda"
              className="shrink-0 text-sm font-bold underline decoration-2 underline-offset-4 hover:no-underline"
            >
              <span className="inline-flex items-center gap-1">Semua agenda <Ikon nama="arrow-right" ukuran={15} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Kabar DPRD — satu sorotan dan daftar ringkas */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-daun-tua">
              Kabar DPRD dan Sekretariat
            </p>
            <h2 className="mt-2 font-heading text-2xl text-tinta sm:text-3xl">Kabar terbaru Cianjur</h2>
            <GarisPadi className="mt-3 max-w-[160px]" />
          </div>
          <Link href="/berita" className="text-sm font-semibold text-cianjur transition-colors hover:text-gunung">
            <span className="inline-flex items-center gap-1">Semua berita <Ikon nama="arrow-right" ukuran={15} /></span>
          </Link>
        </div>
        <div className="mt-7 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <article className="min-w-0 lg:col-span-5">
            <Link href={`/berita/${utama.slug}`} className="group block">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-krem">
                {utama.gambar ? (
                  <Image src={utama.gambar} alt={utama.gambarAlt ?? utama.judul} fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                ) : (
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-pucuk via-white to-cianjur/10" />
                )}
                <span className="absolute left-3 top-3 rounded-full bg-gunung/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">Sorotan</span>
                {utama.gambarIlustrasi && <span className="absolute bottom-3 right-3 rounded-full bg-gunung/75 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">Ilustrasi</span>}
              </div>
              <div className="pt-4">
                <p className="text-xs font-medium text-tinta-pudar">{utama.kategori} <span className="mx-1.5 text-daun">·</span> <time dateTime={utama.tanggal}>{tanggalPendek(utama.tanggal)}</time></p>
                <h3 className="mt-2 font-heading text-xl leading-snug text-tinta transition-colors group-hover:text-daun-tua sm:text-2xl">{utama.judul}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-tinta-pudar">{utama.ringkasan}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-daun-tua transition-all group-hover:gap-2">Baca sorotan <Ikon nama="arrow-right" ukuran={15} /></span>
              </div>
            </Link>
          </article>

          <div className="min-w-0 lg:col-span-7">
            <div className="flex items-center justify-between border-b border-tinta/10 pb-3">
              <h3 className="font-heading text-lg text-gunung">Kabar lainnya</h3>
              <span className="text-xs font-medium text-tinta-pudar">Pembaruan lembaga</span>
            </div>
            <ul className="divide-y divide-tinta/10">
              {lainnya.slice(0, 3).map((berita) => (
                <li key={berita.slug}>
                  <Link href={`/berita/${berita.slug}`} className="group grid grid-cols-[6.25rem_minmax(0,1fr)] gap-4 py-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-5">
                    <span className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-krem">
                      {berita.gambar ? (
                        <Image src={berita.gambar} alt={berita.gambarAlt ?? berita.judul} fill sizes="112px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : <span aria-hidden className="absolute inset-0 bg-gradient-to-br from-pucuk via-white to-cianjur/10" />}
                    </span>
                    <span className="min-w-0 self-center">
                      <span className="block text-[11px] font-medium text-tinta-pudar">{berita.kategori} <span className="mx-1 text-daun">·</span> <time dateTime={berita.tanggal}>{tanggalPendek(berita.tanggal)}</time></span>
                      <span className="mt-1 block line-clamp-2 font-heading text-base leading-snug text-tinta transition-colors group-hover:text-daun-tua">{berita.judul}</span>
                      <span className="mt-1.5 hidden line-clamp-1 text-xs text-tinta-pudar sm:block">{berita.ringkasan}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Lembar Arsip */}
      <section className="bg-krem">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-daun-tua">
                Informasi Publik
              </p>
              <h2 className="mt-2 font-heading text-2xl text-tinta sm:text-3xl">Lembar Arsip</h2>
              <p className="mt-2 text-sm text-tinta-pudar">
                Pilihan terbaru dari kategori anggaran, kinerja, dan informasi publik.
              </p>
            </div>
            <Link
              href="/transparansi"
              className="text-sm font-semibold text-cianjur transition-colors hover:text-gunung"
            >
              <span className="inline-flex items-center gap-1">Semua dokumen <Ikon nama="arrow-right" ukuran={15} /></span>
            </Link>
          </div>
          <div className="mt-8 space-y-3">
            {dokumenTerbaru.map((d) => (
              <KartuArsip key={d.id} dokumen={d} />
            ))}
          </div>
        </div>
      </section>

      {/* Jalur layanan warga */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gunung p-6 text-white sm:p-9">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full bg-daun/25 blur-3xl"
          />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-emas">Layanan warga</p>
              <h2 className="mt-2 font-heading text-2xl sm:text-3xl">Sampaikan masukan untuk Cianjur</h2>
              <p className="mt-2 text-base leading-relaxed text-white/70">
                Formulir aspirasi membantu menyiapkan ringkasan dan nomor tiket lokal. Pengajuan belum masuk ke sistem penerimaan resmi DPRD; tiket hanya tersedia di browser tempat formulir dibuat.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">Untuk keluhan tentang layanan instansi pemerintah, gunakan kanal SP4N LAPOR.</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:items-start">
              <Link href="/aspirasi" className="rounded-full bg-emas px-6 py-3 text-center text-sm font-bold text-tinta transition-colors hover:bg-emas-terang">Siapkan aspirasi</Link>
              <a href="https://www.lapor.go.id" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 hover:text-emas">Buka SP4N LAPOR <Ikon nama="arrow-right" ukuran={15} /></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
