"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ASPIRASI, type Aspirasi } from "@/lib/demo-data";
import { BadgeStatus } from "@/components/badge-status";

type PeranDemo = "dewan" | "staf";
const STATUS = ["Semua status", "Diterima", "Diverifikasi", "Diteruskan", "Dibahas", "Ditindaklanjuti", "Ditutup"];
const JENIS_TINDAK_LANJUT = ["Rapat komisi", "Kunjungan lapangan", "Usulan ke OPD", "Bahan reses", "Lainnya"];

function tanggal(iso: string) {
  return new Date(`${iso}T00:00:00+07:00`).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" });
}

export function DashboardAspirasiAnggota() {
  const [ready, setReady] = useState(false);
  const [peran, setPeran] = useState<PeranDemo>("dewan");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Semua status");
  const [terbuka, setTerbuka] = useState<string | null>(null);
  const [tiketAktif, setTiketAktif] = useState<Aspirasi | null>(null);
  const [jenis, setJenis] = useState(JENIS_TINDAK_LANJUT[0]);
  const [catatan, setCatatan] = useState("");
  const [hasilTindakan, setHasilTindakan] = useState<Record<string, { jenis: string; catatan: string; pelaku: string }>>({});

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const selectedRole = sessionStorage.getItem("panel_demo_role");
      setPeran(selectedRole === "staf" ? "staf" : "dewan");
      setEmail(sessionStorage.getItem("panel_demo_email") ?? "");
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  const inbox = useMemo(() => ASPIRASI
    .filter((item) => item.dapil === "Cianjur 4" || item.komisi === "Komisi I")
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal)), []);
  const daftar = useMemo(() => inbox.filter((item) => {
    const cocokStatus = status === "Semua status" || item.status === status;
    const kata = `${item.tiket} ${item.tema} ${item.ringkas} ${item.dapil} ${item.komisi}`.toLocaleLowerCase("id-ID");
    return cocokStatus && (!query.trim() || kata.includes(query.trim().toLocaleLowerCase("id-ID")));
  }), [inbox, query, status]);

  const totalAktif = inbox.filter((item) => !["Ditindaklanjuti", "Ditutup"].includes(item.status)).length;
  const baru = inbox.filter((item) => ["Diterima", "Diverifikasi"].includes(item.status)).length;
  const selesai = inbox.filter((item) => ["Ditindaklanjuti", "Ditutup"].includes(item.status)).length;

  function simpanTindakan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!tiketAktif || !catatan.trim()) return;
    setHasilTindakan((current) => ({ ...current, [tiketAktif.id]: { jenis, catatan: catatan.trim(), pelaku: peran === "staf" ? "Staf demo · untuk Anggota Demo Cianjur 4" : "Anggota demo Cianjur 4" } }));
    setTiketAktif(null);
    setCatatan("");
    setJenis(JENIS_TINDAK_LANJUT[0]);
  }

  if (!ready) return <p className="py-10 text-sm text-tinta-pudar">Menyiapkan dashboard demo…</p>;

  return (
    <div>
      <header className="rounded-2xl bg-gunung p-5 text-white sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emas">Ruang kerja aspirasi · Dapil 4 · Komisi I</p>
            <h2 className="mt-2 font-heading text-2xl sm:text-3xl">Aspirasi untuk ditindaklanjuti</h2>
            <p className="mt-2 text-sm text-white/70">{peran === "staf" ? "Staf demo · bertindak atas nama Anggota Demo Cianjur 4" : "Profil demo Anggota Cianjur 4"}</p>
          </div>
          <div className="max-w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-right sm:max-w-56">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/55">Akun demo</p>
            <p className="mt-0.5 break-all text-xs font-medium">{email}</p>
          </div>
        </div>
      </header>

      {peran === "staf" && <section aria-label="Ringkasan delegasi demo" className="mt-4 rounded-xl border border-emas/40 bg-[#fff9d9] p-4">
        <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-emas-tua">Delegasi demo</p><h3 className="mt-1 font-heading text-lg text-gunung">Untuk Anggota Demo Cianjur 4</h3><p className="mt-1 text-sm text-tinta-pudar">Cakupan contoh: aspirasi di Dapil 4 atau yang dirutekan ke Komisi I.</p></div><span className="rounded-full border border-emas/50 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emas-tua">Simulasi · tidak mengatur akses</span></div>
        <p className="mt-3 border-t border-emas/30 pt-3 text-xs leading-relaxed text-tinta-pudar">Aksi staf pada halaman ini hanya membuat catatan sementara untuk demo. Pemberian delegasi, masa berlaku, dan izin sebenarnya belum dikelola sistem.</p>
      </section>}

      <section aria-label="Ringkasan antrean" className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
        <div className="rounded-xl border border-jerami bg-white p-3 sm:p-4"><p className="min-h-8 text-[10px] font-semibold leading-tight text-tinta-pudar sm:min-h-0 sm:text-xs">Total dalam cakupan</p><p className="mt-1 font-heading text-2xl text-gunung sm:text-3xl">{inbox.length}</p><p className="mt-1 hidden text-xs text-tinta-pudar sm:block">Dapil 4 atau Komisi I</p></div>
        <div className="rounded-xl border border-jerami bg-white p-3 sm:p-4"><p className="min-h-8 text-[10px] font-semibold leading-tight text-tinta-pudar sm:min-h-0 sm:text-xs">Perlu perhatian</p><p className="mt-1 font-heading text-2xl text-emas-tua sm:text-3xl">{totalAktif}</p><p className="mt-1 hidden text-xs text-tinta-pudar sm:block">Belum ditindaklanjuti atau ditutup</p></div>
        <div className="rounded-xl border border-jerami bg-white p-3 sm:p-4"><p className="min-h-8 text-[10px] font-semibold leading-tight text-tinta-pudar sm:min-h-0 sm:text-xs">Baru masuk</p><p className="mt-1 font-heading text-2xl text-cianjur sm:text-3xl">{baru}</p><p className="mt-1 hidden text-xs text-tinta-pudar sm:block">Diterima atau diverifikasi</p></div>
      </section>
      <p className="mt-2 text-right text-xs text-tinta-pudar">{selesai} sudah ditindaklanjuti atau ditutup</p>

      <div className="mt-6 rounded-xl border border-jerami bg-white p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_13rem_auto] md:items-end">
          <div><label htmlFor="cari-aspirasi-anggota" className="text-xs font-semibold text-tinta-pudar">Cari aspirasi</label><input id="cari-aspirasi-anggota" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nomor tiket, tema, atau ringkasan" className="mt-1 h-11 w-full rounded-lg border border-tinta/15 px-3 text-sm outline-none focus:border-daun focus:ring-2 focus:ring-daun/10" /></div>
          <div><label htmlFor="filter-status-anggota" className="text-xs font-semibold text-tinta-pudar">Status</label><select id="filter-status-anggota" value={status} onChange={(event) => setStatus(event.target.value)} className="mt-1 h-11 w-full rounded-lg border border-tinta/15 bg-white px-3 text-sm outline-none focus:border-daun">{STATUS.map((item) => <option key={item}>{item}</option>)}</select></div>
          <button type="button" onClick={() => { setQuery(""); setStatus("Semua status"); }} disabled={!query && status === "Semua status"} className="h-11 rounded-lg border border-tinta/15 px-4 text-sm font-semibold text-tinta-pudar hover:bg-krem disabled:opacity-40">Reset</button>
        </div>
        <p className="mt-3 text-xs text-tinta-pudar">Menampilkan {daftar.length} dari {inbox.length} aspirasi · terbaru lebih dahulu</p>
      </div>

      <section aria-label="Daftar aspirasi" className="mt-4 space-y-3">
        {daftar.map((item) => {
          const detailTerbuka = terbuka === item.id;
          const tindakan = hasilTindakan[item.id];
          return <article key={item.id} className={`rounded-xl border bg-white p-4 sm:p-5 ${detailTerbuka ? "border-daun/40" : "border-jerami"}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs font-semibold text-daun-tua">{item.tiket}</p>
                <h3 className="mt-1 font-heading text-lg leading-snug text-gunung">{item.tema}</h3>
                <p className="mt-1 text-sm leading-relaxed text-tinta-pudar">{item.ringkas}</p>
              </div>
              <BadgeStatus status={item.status} />
            </div>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-jerami pt-3 text-xs text-tinta-pudar"><span><strong className="font-semibold text-tinta">Wilayah</strong> {item.dapil}</span><span><strong className="font-semibold text-tinta">Komisi</strong> {item.komisi}</span><span><strong className="font-semibold text-tinta">Masuk</strong> {tanggal(item.tanggal)}</span></div>
            {tindakan && <div className="mt-3 rounded-lg border border-daun/20 bg-pucuk/60 p-3 text-sm"><p className="text-xs font-bold uppercase tracking-wider text-daun-tua">Catatan tindak lanjut demo</p><p className="mt-1 font-semibold text-gunung">{tindakan.jenis}</p><p className="mt-1 text-tinta-pudar">{tindakan.catatan}</p><p className="mt-2 text-[11px] text-tinta-pudar">{tindakan.pelaku} · hanya tersimpan selama sesi halaman ini.</p></div>}
            {detailTerbuka && <div className="mt-4 grid gap-3 rounded-lg bg-krem p-4 sm:grid-cols-2"><div><p className="text-[10px] font-bold uppercase tracking-wider text-tinta-pudar">Ringkasan yang tersedia</p><p className="mt-1 text-sm text-tinta">{item.ringkas}</p></div><div><p className="text-[10px] font-bold uppercase tracking-wider text-tinta-pudar">Informasi yang belum tersedia</p><p className="mt-1 text-sm text-tinta-pudar">Uraian lengkap, kecamatan/desa, lampiran, dan riwayat status tidak ada pada data demo ini.</p></div></div>}
            <div className="mt-4 flex flex-wrap gap-2">
              {!["Ditindaklanjuti", "Ditutup"].includes(item.status) ? <button type="button" onClick={() => { setTiketAktif(item); setJenis(JENIS_TINDAK_LANJUT[0]); setCatatan(""); }} className="min-h-10 rounded-lg bg-emas px-3.5 py-2 text-xs font-bold text-tinta hover:bg-emas-terang">{peran === "staf" ? "Catat untuk Anggota" : "Catat tindak lanjut"}</button> : <span className="inline-flex min-h-10 items-center rounded-lg bg-krem px-3.5 py-2 text-xs font-semibold text-tinta-pudar">Tindak lanjut selesai</span>}
              <button type="button" aria-expanded={detailTerbuka} onClick={() => setTerbuka(detailTerbuka ? null : item.id)} className="min-h-10 rounded-lg border border-tinta/15 px-3.5 py-2 text-xs font-semibold text-tinta-pudar hover:bg-krem">{detailTerbuka ? "Tutup detail" : "Lihat detail"}</button>
            </div>
          </article>;
        })}
        {daftar.length === 0 && <div className="rounded-xl border border-dashed border-tinta/20 bg-white px-6 py-10 text-center"><h3 className="font-heading text-lg text-gunung">Tidak ada aspirasi yang cocok</h3><p className="mt-1 text-sm text-tinta-pudar">Coba kata kunci atau status yang berbeda.</p><button type="button" onClick={() => { setQuery(""); setStatus("Semua status"); }} className="mt-4 rounded-lg bg-gunung px-4 py-2 text-sm font-semibold text-white">Hapus filter</button></div>}
      </section>

      <p className="mt-5 rounded-lg border border-emas/40 bg-[#fff9d9] p-3 text-xs leading-relaxed text-gunung"><strong>Data dan tindakan simulasi.</strong> Catatan tidak tersimpan ke server dan tidak memicu notifikasi kepada warga.</p>

      {tiketAktif && <div role="presentation" className="fixed inset-0 z-50 grid place-items-end bg-black/40 p-0 sm:place-items-center sm:p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setTiketAktif(null); }}>
        <section role="dialog" aria-modal="true" aria-labelledby="judul-dialog-tindak" className="max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl sm:max-w-lg sm:rounded-2xl sm:p-6">
          <p className="text-xs font-mono font-semibold text-daun-tua">{tiketAktif.tiket}</p><h2 id="judul-dialog-tindak" className="mt-1 font-heading text-xl text-gunung">{peran === "staf" ? "Catat untuk Anggota Demo" : "Catat tindak lanjut demo"}</h2><p className="mt-1 text-sm text-tinta-pudar">{peran === "staf" ? "Staf demo · atas nama Anggota Demo Cianjur 4" : "Anggota demo Cianjur 4"} · {tiketAktif.ringkas}</p>
          <form onSubmit={simpanTindakan} className="mt-5 space-y-4">
            <div><label htmlFor="jenis-tindak" className="text-sm font-semibold text-tinta">Jenis tindak lanjut</label><select id="jenis-tindak" value={jenis} onChange={(event) => setJenis(event.target.value)} className="mt-1.5 h-11 w-full rounded-lg border border-tinta/15 bg-white px-3 text-sm">{JENIS_TINDAK_LANJUT.map((item) => <option key={item}>{item}</option>)}</select></div>
            <div><label htmlFor="catatan-tindak" className="text-sm font-semibold text-tinta">Catatan</label><textarea id="catatan-tindak" required rows={4} value={catatan} onChange={(event) => setCatatan(event.target.value)} placeholder="Tuliskan langkah atau hasil yang ingin ditampilkan pada demo…" className="mt-1.5 w-full rounded-lg border border-tinta/15 p-3 text-sm outline-none focus:border-daun" /></div>
            <p className="rounded-lg bg-[#fff9d9] p-3 text-xs leading-relaxed text-gunung">Catatan ini hanya disimpan sementara pada tampilan demo; tidak dikirim ke sistem atau warga.</p>
            <div className="flex justify-end gap-2"><button type="button" onClick={() => setTiketAktif(null)} className="min-h-10 rounded-lg border border-tinta/15 px-4 text-sm font-semibold text-tinta-pudar">Batal</button><button type="submit" className="min-h-10 rounded-lg bg-gunung px-4 text-sm font-bold text-white">Tampilkan catatan</button></div>
          </form>
        </section>
      </div>}
    </div>
  );
}
