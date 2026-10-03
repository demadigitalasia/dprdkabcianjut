import { ASPIRASI } from "@/lib/demo-data";

export const metadata = { title: "Ringkasan Pimpinan (Panel Demo)" };

const AMBANG_AGREGAT = 5;

function agregat(kunci: (aspirasi: (typeof ASPIRASI)[number]) => string) {
  const hasil = new Map<string, number>();
  for (const aspirasi of ASPIRASI) {
    const label = kunci(aspirasi);
    hasil.set(label, (hasil.get(label) ?? 0) + 1);
  }
  return [...hasil.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "id-ID"));
}

function BarisAgregat({ label, nilai, total, maks }: { label: string; nilai: number; total: number; maks: number }) {
  const persen = Math.round((nilai / total) * 100);
  const lebar = Math.max(4, Math.round((nilai / maks) * 100));
  return (
    <li className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5">
      <span className="min-w-0 truncate text-sm font-medium text-tinta">{label}</span>
      <span className="text-right text-sm font-semibold tabular-nums text-gunung">{nilai}<span className="ml-1 text-xs font-normal text-tinta-pudar">({persen}%)</span></span>
      <div className="col-span-2 h-2 overflow-hidden rounded-full bg-tinta/5" role="img" aria-label={`${label}: ${nilai} aspirasi, ${persen} persen dari total`}>
        <div className="h-full rounded-full bg-gradient-to-r from-daun to-cianjur" style={{ width: `${lebar}%` }} />
      </div>
    </li>
  );
}

function rentangTanggal() {
  const tanggal = ASPIRASI.map((item) => item.tanggal).sort();
  const format = (iso: string) => new Date(`${iso}T00:00:00+07:00`).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Jakarta" });
  return `${format(tanggal[0])}–${format(tanggal[tanggal.length - 1])}`;
}

export default function PanelPimpinan() {
  const perKomisi = agregat((item) => item.komisi);
  const perDapil = agregat((item) => item.dapil);
  const perStatus = agregat((item) => item.status);
  const hitung = new Map(perStatus);
  const baru = (hitung.get("Diterima") ?? 0) + (hitung.get("Diverifikasi") ?? 0);
  const proses = (hitung.get("Diteruskan") ?? 0) + (hitung.get("Dibahas") ?? 0);
  const selesai = (hitung.get("Ditindaklanjuti") ?? 0) + (hitung.get("Ditutup") ?? 0);
  const statusGabungan = [["Baru / verifikasi", baru], ["Diteruskan", hitung.get("Diteruskan") ?? 0], ["Dibahas", hitung.get("Dibahas") ?? 0], ["Ditindaklanjuti", hitung.get("Ditindaklanjuti") ?? 0], ["Ditutup", hitung.get("Ditutup") ?? 0]] as Array<[string, number]>;
  const maksStatus = Math.max(...statusGabungan.map(([, nilai]) => nilai));
  const maksKomisi = Math.max(...perKomisi.map(([, nilai]) => nilai));
  const maksDapil = Math.max(...perDapil.map(([, nilai]) => nilai));
  const tampilKomisi = perKomisi.filter(([, nilai]) => nilai >= AMBANG_AGREGAT);
  const tampilDapil = perDapil.filter(([, nilai]) => nilai >= AMBANG_AGREGAT);
  const selKecil = perKomisi.filter(([, n]) => n < AMBANG_AGREGAT).length + perDapil.filter(([, n]) => n < AMBANG_AGREGAT).length;

  return (
    <div>
      <header className="rounded-2xl bg-gunung p-5 text-white sm:p-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emas">Ringkasan pimpinan · read-only</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div><h2 className="font-heading text-2xl sm:text-3xl">Gambaran aspirasi warga</h2><p className="mt-1 text-sm text-white/70">Distribusi menurut status, komisi, dan daerah pemilihan.</p></div>
          <div className="rounded-lg border border-white/15 bg-white/5 px-3 py-2"><p className="text-[10px] font-bold uppercase tracking-wider text-white/55">Rentang data contoh</p><p className="mt-1 text-sm font-semibold">{rentangTanggal()}</p></div>
        </div>
      </header>

      <div className="mt-4 rounded-xl border border-emas/40 bg-[#fff9d9] p-4 text-sm leading-relaxed text-gunung"><p><strong>Data simulasi statis.</strong> {ASPIRASI.length} contoh aspirasi dalam rentang di atas; angka tidak berasal dari sistem operasional dan tidak diperbarui otomatis.</p></div>

      <section aria-label="Indikator ringkasan" className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-xl border border-jerami bg-white p-4"><p className="text-xs font-semibold text-tinta-pudar">Total contoh</p><p className="mt-1 font-heading text-3xl tabular-nums text-gunung">{ASPIRASI.length}</p><p className="mt-1 text-[11px] text-tinta-pudar">Semua status</p></div>
        <div className="rounded-xl border border-jerami bg-white p-4"><p className="text-xs font-semibold text-tinta-pudar">Baru / verifikasi</p><p className="mt-1 font-heading text-3xl tabular-nums text-cianjur">{baru}</p><p className="mt-1 text-[11px] text-tinta-pudar">Diterima + diverifikasi</p></div>
        <div className="rounded-xl border border-jerami bg-white p-4"><p className="text-xs font-semibold text-tinta-pudar">Diteruskan / dibahas</p><p className="mt-1 font-heading text-3xl tabular-nums text-emas-tua">{proses}</p><p className="mt-1 text-[11px] text-tinta-pudar">Dalam pembahasan</p></div>
        <div className="rounded-xl border border-jerami bg-white p-4"><p className="text-xs font-semibold text-tinta-pudar">Ditindaklanjuti / ditutup</p><p className="mt-1 font-heading text-3xl tabular-nums text-daun-tua">{selesai}</p><p className="mt-1 text-[11px] text-tinta-pudar">Tahap akhir</p></div>
      </section>

      <section aria-labelledby="status-aspirasi" className="mt-7 rounded-xl border border-jerami bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-2 border-b border-jerami pb-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-daun-tua">Komposisi antrean</p><h3 id="status-aspirasi" className="mt-1 font-heading text-xl text-gunung">Aspirasi menurut status</h3></div><p className="text-xs text-tinta-pudar">Jumlah dan proporsi dari total</p></div>
        <ul className="mt-4 grid gap-x-8 gap-y-4 md:grid-cols-2">{statusGabungan.map(([label, nilai]) => <BarisAgregat key={label} label={label} nilai={nilai} total={ASPIRASI.length} maks={maksStatus} />)}</ul>
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section aria-labelledby="per-komisi" className="rounded-xl border border-jerami bg-white p-4 sm:p-5">
          <div className="border-b border-jerami pb-3"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-daun-tua">Distribusi kerja</p><h3 id="per-komisi" className="mt-1 font-heading text-xl text-gunung">Per komisi</h3></div>
          <ul className="mt-4 space-y-4">{tampilKomisi.map(([label, nilai]) => <BarisAgregat key={label} label={label} nilai={nilai} total={ASPIRASI.length} maks={maksKomisi} />)}</ul>
          {tampilKomisi.length < perKomisi.length && <p className="mt-4 rounded-lg bg-krem p-3 text-xs leading-relaxed text-tinta-pudar">Kategori berjumlah di bawah {AMBANG_AGREGAT} disembunyikan sesuai ambang agregat demo.</p>}
        </section>
        <section aria-labelledby="per-dapil" className="rounded-xl border border-jerami bg-white p-4 sm:p-5">
          <div className="border-b border-jerami pb-3"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-daun-tua">Sebaran wilayah</p><h3 id="per-dapil" className="mt-1 font-heading text-xl text-gunung">Per daerah pemilihan</h3></div>
          <ul className="mt-4 space-y-4">{tampilDapil.map(([label, nilai]) => <BarisAgregat key={label} label={label} nilai={nilai} total={ASPIRASI.length} maks={maksDapil} />)}</ul>
          {tampilDapil.length < perDapil.length && <p className="mt-4 rounded-lg bg-krem p-3 text-xs leading-relaxed text-tinta-pudar">Kategori berjumlah di bawah {AMBANG_AGREGAT} disembunyikan sesuai ambang agregat demo.</p>}
        </section>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-tinta-pudar">Status berjumlah kecil digabung sebagai “Baru / verifikasi”. Ambang agregat minimum {AMBANG_AGREGAT} diterapkan pada breakdown komisi dan dapil untuk konsistensi demonstrasi privasi; penerapan kebijakan produksi perlu ditentukan oleh pengelola data.</p>
      {selKecil > 0 && <span className="sr-only">Ada kategori berukuran kecil yang disembunyikan.</span>}
    </div>
  );
}
