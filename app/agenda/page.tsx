import { connection } from "next/server";
import { AGENDA, type Agenda } from "@/lib/demo-data";
import { BadgeStatus } from "@/components/badge-status";
import { GarisPadi } from "@/components/garis-padi";
import { Ikon } from "@/components/ikon";
import { TombolKalender } from "@/components/tombol-kalender";

export const metadata = { title: "Agenda" };

function tanggalHariIniJakarta() {
  const bagian = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const nilai = Object.fromEntries(bagian.map(({ type, value }) => [type, value]));
  return `${nilai.year}-${nilai.month}-${nilai.day}`;
}

function waktuAgenda(a: Agenda) {
  const waktu = a.waktu.match(/\d{2}:\d{2}/)?.[0] ?? "09:00";
  return new Date(`${a.tanggal}T${waktu}:00+07:00`);
}

function formatTanggal(iso: string, options: Intl.DateTimeFormatOptions) {
  return new Date(`${iso}T00:00:00+07:00`).toLocaleDateString("id-ID", {
    timeZone: "Asia/Jakarta",
    ...options,
  });
}

function kelompokAgenda(agenda: Agenda[], sekarang: Date) {
  return agenda.reduce<{ mendatang: Agenda[]; selesai: Agenda[] }>(
    (hasil, item) => {
      (waktuAgenda(item) > sekarang ? hasil.mendatang : hasil.selesai).push(item);
      return hasil;
    },
    { mendatang: [], selesai: [] },
  );
}

function KartuAgenda({ agenda, unggulan = false, status, adaAksi = false }: { agenda: Agenda; unggulan?: boolean; status: "Akan datang" | "Selesai"; adaAksi?: boolean }) {
  const hari = formatTanggal(agenda.tanggal, { day: "2-digit" });
  const bulan = formatTanggal(agenda.tanggal, { month: "short" }).replace(".", "");

  return (
    <li
      className={`grid gap-4 rounded-2xl border p-4 sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:p-5 ${
        unggulan
          ? "border-emas/70 bg-gradient-to-br from-[#fffdf4] to-white shadow-[0_12px_32px_rgba(20,54,43,0.08)]"
          : "border-tinta/10 bg-white shadow-sm"
      }`}
    >
      <div className="flex items-center gap-3 sm:block sm:border-r sm:border-tinta/10 sm:pr-4">
        <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-pucuk text-daun-tua sm:h-[4.5rem] sm:w-[4.5rem]">
          <span className="font-heading text-2xl leading-none">{hari}</span>
          <span className="mt-1 text-[11px] font-bold uppercase tracking-wider">{bulan}</span>
        </div>
        <div className="sm:mt-2">
          <p className="text-xs font-medium leading-tight text-tinta-pudar">
            {formatTanggal(agenda.tanggal, { weekday: "long", year: "numeric" })}
          </p>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-gunung">
            <Ikon nama="calendar" ukuran={14} /> {agenda.waktu}
          </p>
        </div>
      </div>

      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-pucuk px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-daun-tua">
            {agenda.jenis}
          </span>
          <BadgeStatus status={status} />
        </div>
        <h3 className={`font-heading leading-snug text-tinta ${unggulan ? "text-lg sm:text-xl" : "text-base"}`}>
          {agenda.judul}
        </h3>
        <p className="mt-2 flex items-start gap-1.5 text-sm text-tinta-pudar">
          <Ikon nama="map-pin" ukuran={15} />
          <span>{agenda.lokasi}</span>
        </p>
      </div>

      {adaAksi ? (
        <div className="sm:justify-self-end">
          <TombolKalender agenda={agenda} />
        </div>
      ) : null}
    </li>
  );
}

export default async function HalamanAgenda() {
  // Agenda status depends on today's Jakarta date, so resolve it for each request.
  await connection();
  const sekarang = new Date();
  const hariIni = tanggalHariIniJakarta();
  const { mendatang, selesai } = kelompokAgenda(AGENDA, sekarang);
  mendatang.sort((a, b) => waktuAgenda(a).getTime() - waktuAgenda(b).getTime());
  selesai.sort((a, b) => waktuAgenda(b).getTime() - waktuAgenda(a).getTime());
  const agendaUnggulan = mendatang[0];
  const agendaBerikutnya = mendatang.slice(1);

  return (
    <>
      <header className="relative overflow-hidden border-b border-tinta/10 bg-gradient-to-br from-[#f7fbf7] via-white to-[#f5f8ed]">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-daun/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-11 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-pucuk px-3 py-1 text-xs font-semibold uppercase tracking-widest text-daun-tua">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-daun" />
              Jadwal kegiatan
            </p>
            <h1 className="mt-4 font-heading text-3xl leading-tight text-tinta sm:text-5xl">Sidang dan kegiatan DPRD</h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-tinta-pudar sm:text-lg">
              Ikuti jadwal rapat, kunjungan kerja, dan kegiatan DPRD Kabupaten Cianjur.
            </p>
            <GarisPadi className="mt-6 max-w-[160px]" />
          </div>

          <aside className="rounded-2xl border border-daun/10 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-daun-tua">Agenda akan datang</p>
            <p className="mt-2 font-heading text-2xl text-gunung">{mendatang.length} kegiatan</p>
            <p className="mt-1 text-sm text-tinta-pudar">{formatTanggal(hariIni, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
          </aside>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-12 px-4 py-10 sm:px-6 sm:py-14">
        <section aria-labelledby="agenda-mendatang">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-daun-tua">Jadwal terdekat</p>
              <h2 id="agenda-mendatang" className="mt-1 font-heading text-2xl text-gunung">Akan datang</h2>
            </div>
            <p className="text-sm text-tinta-pudar">Diurutkan dari tanggal terdekat</p>
          </div>
          {agendaUnggulan ? (
            <>
              <ul className="space-y-3">
                <KartuAgenda agenda={agendaUnggulan} unggulan status="Akan datang" adaAksi />
                {agendaBerikutnya.map((a) => <KartuAgenda key={a.id} agenda={a} status="Akan datang" adaAksi />)}
              </ul>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-tinta/15 bg-krem px-6 py-10 text-center">
              <p className="font-heading text-lg text-gunung">Belum ada jadwal mendatang</p>
              <p className="mt-1 text-sm text-tinta-pudar">Silakan lihat kembali untuk pembaruan agenda DPRD.</p>
            </div>
          )}
        </section>

        <section aria-labelledby="agenda-selesai">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-t border-tinta/10 pt-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-tinta-pudar">Arsip kegiatan</p>
              <h2 id="agenda-selesai" className="mt-1 font-heading text-2xl text-gunung">Agenda selesai</h2>
            </div>
            <p className="text-sm text-tinta-pudar">Terbaru lebih dahulu</p>
          </div>
          {selesai.length ? (
            <ul className="space-y-3">
              {selesai.map((a) => <KartuAgenda key={a.id} agenda={a} status="Selesai" />)}
            </ul>
          ) : (
            <p className="rounded-2xl bg-krem p-5 text-sm text-tinta-pudar">Belum ada agenda yang selesai.</p>
          )}
        </section>
      </main>
    </>
  );
}
