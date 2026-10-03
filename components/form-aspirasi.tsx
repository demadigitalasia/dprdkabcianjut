"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { GarisPadi, ButirPadi } from "@/components/garis-padi";
import { Ikon } from "@/components/ikon";

// ------------------------------------------------------------
// Data pendukung form (demo) — tema → komisi & kecamatan → dapil
// Selaras Lampiran E (Matriks Routing Aspirasi)
// ------------------------------------------------------------
const TEMA: Array<{ label: string; komisi: string }> = [
  { label: "Infrastruktur jalan, jembatan & irigasi", komisi: "Komisi III" },
  { label: "Tata ruang, perumahan & permukiman", komisi: "Komisi III" },
  { label: "Lingkungan hidup & persampahan", komisi: "Komisi III" },
  { label: "Perhubungan", komisi: "Komisi III" },
  { label: "Energi, SDA & air minum", komisi: "Komisi III" },
  { label: "Pendidikan", komisi: "Komisi IV" },
  { label: "Kesehatan", komisi: "Komisi IV" },
  { label: "Sosial & kemiskinan", komisi: "Komisi IV" },
  { label: "Pemuda, olahraga & kebudayaan", komisi: "Komisi IV" },
  { label: "Pertanian, pangan & peternakan", komisi: "Komisi II" },
  { label: "UMKM, koperasi, perindustrian & perdagangan", komisi: "Komisi II" },
  { label: "Pariwisata & ekonomi kreatif", komisi: "Komisi II" },
  { label: "Pemerintahan desa & pemberdayaan masyarakat", komisi: "Komisi I" },
  { label: "Lainnya / lintas sektor", komisi: "Komisi I" },
];

const KECAMATAN: Array<{ nama: string; dapil: string }> = [
  { nama: "Cianjur", dapil: "Cianjur 1" },
  { nama: "Cilaku", dapil: "Cianjur 1" },
  { nama: "Karangtengah", dapil: "Cianjur 1" },
  { nama: "Warungkondang", dapil: "Cianjur 2" },
  { nama: "Cibeber", dapil: "Cianjur 2" },
  { nama: "Cugenang", dapil: "Cianjur 2" },
  { nama: "Gekbrong", dapil: "Cianjur 2" },
  { nama: "Pacet", dapil: "Cianjur 3" },
  { nama: "Cikalongkulon", dapil: "Cianjur 3" },
  { nama: "Sukaresmi", dapil: "Cianjur 3" },
  { nama: "Cipanas", dapil: "Cianjur 3" },
  { nama: "Ciranjang", dapil: "Cianjur 4" },
  { nama: "Bojongpicung", dapil: "Cianjur 4" },
  { nama: "Mande", dapil: "Cianjur 4" },
  { nama: "Sukaluyu", dapil: "Cianjur 4" },
  { nama: "Haurwangi", dapil: "Cianjur 4" },
  { nama: "Sukanagara", dapil: "Cianjur 5" },
  { nama: "Campaka", dapil: "Cianjur 5" },
  { nama: "Takokak", dapil: "Cianjur 5" },
  { nama: "Kadupandak", dapil: "Cianjur 5" },
  { nama: "Pagelaran", dapil: "Cianjur 5" },
  { nama: "Campakamulya", dapil: "Cianjur 5" },
  { nama: "Cijati", dapil: "Cianjur 5" },
  { nama: "Pasirkuda", dapil: "Cianjur 5" },
  { nama: "Tanggeung", dapil: "Cianjur 6" },
  { nama: "Cibinong", dapil: "Cianjur 6" },
  { nama: "Sindangbarang", dapil: "Cianjur 6" },
  { nama: "Agrabinta", dapil: "Cianjur 6" },
  { nama: "Cidaun", dapil: "Cianjur 6" },
  { nama: "Naringgul", dapil: "Cianjur 6" },
  { nama: "Cikadu", dapil: "Cianjur 6" },
  { nama: "Leles", dapil: "Cianjur 6" },
];

const KABUPATEN_UMUM = { nama: "Kabupaten (umum)", dapil: "Umum" };

type Hasil = { tiket: string; dapil: string; komisi: string };

export function FormAspirasi() {
  const [langkah, setLangkah] = useState(1);
  const [jenis, setJenis] = useState<"" | "aspirasi" | "keluhan">("");
  const [pesanValidasi, setPesanValidasi] = useState("");
  const [tema, setTema] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [isi, setIsi] = useState("");
  const [nama, setNama] = useState("");
  const [kontak, setKontak] = useState("");
  const [consent, setConsent] = useState(false);
  const [hasil, setHasil] = useState<Hasil | null>(null);
  const namaLangkah = ["Jenis masukan", "Wilayah & topik", "Isi & kontak", "Tinjau"];

  const komisi = useMemo(
    () => TEMA.find((t) => t.label === tema)?.komisi ?? "—",
    [tema]
  );
  const dapil = useMemo(() => {
    if (!lokasi) return "—";
    if (lokasi === KABUPATEN_UMUM.nama) return "Umum (kabupaten)";
    return KECAMATAN.find((k) => k.nama === lokasi)?.dapil ?? "—";
  }, [lokasi]);

  function kirim() {
    const nomor = String(Math.floor(1000 + Math.random() * 9000));
    const tiket = `ASP-${new Date().getFullYear()}-${nomor}`;
    const entri = {
      tiket,
      jenis,
      tema,
      lokasi,
      dapil,
      komisi,
      isi,
      nama,
      status: "Diterima",
      waktu: new Date().toISOString(),
      riwayat: [{ status: "Diterima", waktu: new Date().toISOString() }],
    };
    try {
      const lama = JSON.parse(localStorage.getItem("aspirasi_tiket") ?? "[]");
      localStorage.setItem("aspirasi_tiket", JSON.stringify([entri, ...lama]));
    } catch {
      localStorage.setItem("aspirasi_tiket", JSON.stringify([entri]));
    }
    setHasil({ tiket, dapil, komisi });
  }

  function lanjutDariWilayah() {
    if (!tema || !lokasi) {
      setPesanValidasi("Pilih topik aspirasi dan kecamatan agar pengajuan dapat diarahkan.");
      return;
    }
    setPesanValidasi("");
    setLangkah(3);
  }

  function lanjutDariKontak() {
    if (!isi.trim() || !nama.trim() || !kontak.trim() || !consent) {
      setPesanValidasi("Lengkapi uraian, nama, kontak, dan persetujuan sebelum melanjutkan.");
      return;
    }
    const kontakValid = /^(?:[^\s@]+@[^\s@]+\.[^\s@]+|\+?[0-9][0-9\s().-]{7,})$/.test(kontak.trim());
    if (!kontakValid) {
      setPesanValidasi("Masukkan alamat email yang valid atau nomor WhatsApp dengan kode area.");
      return;
    }
    if (isi.trim().length < 20) {
      setPesanValidasi("Tambahkan sedikit konteks agar usulan mudah dipahami (minimal 20 karakter).");
      return;
    }
    setPesanValidasi("");
    setLangkah(4);
  }

  // ---------- Sukses ----------
  if (hasil) {
    return (
      <div className="rounded-3xl border border-daun/20 bg-pucuk p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gunung">
          Nomor tersimpan
        </p>
        <h2 className="mt-2 font-heading text-2xl text-gunung">
          Nomor tiket: {hasil.tiket}
        </h2>
        <p className="mt-3 text-sm text-tinta leading-relaxed">
          Pengajuan ini belum diterima oleh layanan DPRD. Ringkasan aspirasi hanya tersimpan di browser ini dan tidak dapat dibuka dari perangkat lain.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/aspirasi/lacak?tiket=${hasil.tiket}`}
            className="rounded-full bg-emas px-4 py-2 text-sm font-bold text-tinta shadow-sm"
          >
            Lihat tiket di browser ini
          </Link>
          <button
            type="button"
            onClick={() => {
              setHasil(null);
              setLangkah(1);
              setJenis("");
              setTema("");
              setLokasi("");
              setIsi("");
              setNama("");
              setKontak("");
              setConsent(false);
            }}
            className="rounded-full border border-tinta/10 bg-white px-4 py-2 text-sm font-semibold text-tinta"
          >
            Kirim lagi
          </button>
        </div>
      </div>
    );
  }

  return (
      <div className="rounded-3xl border border-tinta/5 bg-white p-5 shadow-xl shadow-tinta/5 sm:p-7">
      <nav aria-label="Tahapan formulir aspirasi" className="-mx-1">
        <ol className="grid grid-cols-4 gap-1 sm:gap-2">
          {namaLangkah.map((namaTahap, indeks) => {
            const nomor = indeks + 1;
            const aktif = nomor === langkah;
            const selesai = nomor < langkah;
            return (
              <li key={namaTahap}>
                <button type="button" disabled={!selesai} onClick={() => { setLangkah(nomor); setPesanValidasi(""); }} aria-current={aktif ? "step" : undefined} className={`flex w-full flex-col items-start gap-1 border-t-2 px-1.5 pt-2 text-left sm:px-2 ${aktif ? "border-daun text-gunung" : selesai ? "border-daun/50 text-daun-tua" : "border-tinta/10 text-tinta-pudar"}`}>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide sm:text-xs"><span className={`grid h-5 w-5 place-items-center rounded-full ${aktif ? "bg-gunung text-white" : selesai ? "bg-pucuk text-daun-tua" : "bg-tinta/5 text-tinta-pudar"}`}>{selesai ? <Ikon nama="check" ukuran={12} /> : nomor}</span><span className="hidden sm:inline">Langkah {nomor}</span></span>
                  <span className="text-[10px] font-medium leading-tight sm:text-xs">{namaTahap}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* LANGKAH 1 — Jenis */}
      {langkah === 1 && (
        <div className="mt-6">
          <h2 className="font-heading text-xl text-gunung">Apa yang ingin Anda sampaikan?</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              aria-pressed={jenis === "aspirasi"}
              onClick={() => { setJenis("aspirasi"); setPesanValidasi(""); }}
              className={`rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 ${
                jenis === "aspirasi"
                  ? "border-daun/50 bg-pucuk"
                  : "border-tinta/10 bg-white hover:border-tinta/30"
              }`}
            >
              <p className="font-semibold text-tinta flex items-center gap-2">
                <ButirPadi /> Aspirasi / usulan
              </p>
              <p className="mt-1 text-xs text-tinta-pudar">
                Usulan kebijakan atau kebutuhan pembangunan di wilayah Anda.
                Pilih topik dan kecamatan untuk memberi arah peninjauan.
              </p>
            </button>
            <button
              type="button"
              aria-pressed={jenis === "keluhan"}
              onClick={() => { setJenis("keluhan"); setPesanValidasi(""); }}
              className={`rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 ${
                jenis === "keluhan"
                  ? "border-cianjur/40 bg-cianjur/5"
                  : "border-tinta/10 bg-white hover:border-tinta/30"
              }`}
            >
              <p className="font-semibold text-tinta flex items-center gap-2">
                <ButirPadi /> Keluhan layanan publik
              </p>
              <p className="mt-1 text-xs text-tinta-pudar">
                Keluhan tentang layanan instansi pemerintah disampaikan melalui kanal SP4N LAPOR.
              </p>
            </button>
          </div>

          {jenis === "keluhan" && (
            <div className="mt-4 rounded-2xl border border-cianjur/20 bg-cianjur/5 p-4">
              <p className="text-sm font-semibold text-cianjur">Gunakan kanal pengaduan layanan publik</p>
              <p className="mt-1 text-sm text-tinta-pudar leading-relaxed">
                SP4N LAPOR meneruskan pengaduan kepada instansi yang berwenang. Formulir aspirasi DPRD ini tidak mengirimkan keluhan layanan.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href="https://www.lapor.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-cianjur px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
                >
                  Buka SP4N LAPOR <Ikon nama="arrow-right" ukuran={15} />
                </a>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              title={jenis !== "aspirasi" ? "Keluhan layanan publik ditangani melalui SP4N LAPOR" : undefined}
              disabled={jenis !== "aspirasi"}
              onClick={() => setLangkah(2)}
              className="rounded-full bg-emas px-5 py-2.5 text-sm font-bold text-tinta shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="inline-flex items-center gap-1.5">Lanjut <Ikon nama="arrow-right" ukuran={16} /></span>
            </button>
          </div>
        </div>
      )}

      {/* LANGKAH 2 — Tema & Lokasi */}
      {langkah === 2 && (
        <div className="mt-6">
          <h2 className="font-heading text-xl text-gunung">Tema &amp; lokasi</h2>
          <div className="mt-4 grid gap-5">
            <div>
              <label htmlFor="tema" className="text-sm font-semibold text-tinta">
                Tema aspirasi <span className="text-emas-tua">*</span>
              </label>
              <select
                id="tema"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-tinta/15 bg-white px-3 py-2.5 text-sm focus:border-daun focus:outline-none"
              >
                <option value="">— Pilih tema —</option>
                {TEMA.map((t) => (
                  <option key={t.label} value={t.label}>
                    {t.label}
                  </option>
                ))}
              </select>
              {tema && (
                <p className="mt-1.5 text-xs text-tinta-pudar">
                  Routing otomatis <Ikon nama="arrow-right" ukuran={13} className="mx-0.5 inline" /> <strong className="text-gunung">{komisi}</strong>{" "}
                  (arah awal, ditinjau petugas)
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lokasi" className="text-sm font-semibold text-tinta">
                Lokasi <span className="text-emas-tua">*</span>
              </label>
              <select
                id="lokasi"
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-tinta/15 bg-white px-3 py-2.5 text-sm focus:border-daun focus:outline-none"
              >
                <option value="">— Pilih kecamatan —</option>
                <option value={KABUPATEN_UMUM.nama}>{KABUPATEN_UMUM.nama}</option>
                {KECAMATAN.map((k) => (
                  <option key={k.nama} value={k.nama}>
                    Kec. {k.nama}
                  </option>
                ))}
              </select>
              {lokasi && (
                <p className="mt-1.5 text-xs text-tinta-pudar">
                  Routing lokasi <Ikon nama="arrow-right" ukuran={13} className="mx-0.5 inline" /> <strong className="text-gunung">{dapil}</strong>{" "}
                  (pemetaan awal wilayah)
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => setLangkah(1)}
              className="rounded-full border border-tinta/10 bg-white px-4 py-2.5 text-sm font-semibold text-tinta transition-colors hover:border-tinta/25"
            >
              <span className="inline-flex items-center gap-1.5"><Ikon nama="arrow-left" ukuran={16} />Kembali</span>
            </button>
            <button
              type="button"
              onClick={lanjutDariWilayah}
              className="rounded-full bg-emas px-5 py-2.5 text-sm font-bold text-tinta shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="inline-flex items-center gap-1.5">Lanjut <Ikon nama="arrow-right" ukuran={16} /></span>
            </button>
          </div>
        </div>
      )}

      {/* LANGKAH 3 — Isi & Kontak */}
      {langkah === 3 && (
        <div className="mt-6">
          <h2 className="font-heading text-xl text-gunung">Isi &amp; kontak</h2>
          <div className="mt-4 grid gap-5">
            <div>
              <label htmlFor="isi" className="text-sm font-semibold text-tinta">
                Uraikan aspirasi Anda <span className="text-emas-tua">*</span>
              </label>
              <textarea
                id="isi"
                rows={6}
                maxLength={1200}
                value={isi}
                onChange={(e) => setIsi(e.target.value)}
                placeholder="Contoh: Kondisi jalan di wilayah, dampaknya bagi warga, dan perubahan yang diharapkan. Hindari mencantumkan data pribadi orang lain."
                className="mt-1.5 w-full rounded-xl border border-tinta/15 bg-white px-3 py-2.5 text-sm focus:border-daun focus:outline-none"
              />
              <p className="mt-1 flex justify-between gap-3 text-xs text-tinta-pudar"><span>Jelaskan lokasi dan dampak yang dirasakan.</span><span>{isi.length}/1200</span></p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nama" className="text-sm font-semibold text-tinta">
                  Nama <span className="text-emas-tua">*</span>
                </label>
                <input
                  id="nama"
                  type="text"
                  autoComplete="name"
                  placeholder="Nama Anda"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-tinta/15 bg-white px-3 py-2.5 text-sm focus:border-daun focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="kontak" className="text-sm font-semibold text-tinta">
                  Email / WhatsApp <span className="text-emas-tua">*</span>
                </label>
                <input
                  id="kontak"
                  type="text"
                  autoComplete="off"
                  placeholder="nama@email.com atau 08…"
                  value={kontak}
                  onChange={(e) => setKontak(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-tinta/15 bg-white px-3 py-2.5 text-sm focus:border-daun focus:outline-none"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-tinta/10 bg-krem p-4 text-sm">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[#009e4f]"
              />
              <span className="text-tinta-pudar leading-relaxed">
                Saya memahami bahwa formulir ini belum mengirim pengajuan ke layanan DPRD. Saya tidak memasukkan informasi sensitif atau data pribadi orang lain.
              </span>
            </label>

          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => setLangkah(2)}
              className="rounded-full border border-tinta/10 bg-white px-4 py-2.5 text-sm font-semibold text-tinta transition-colors hover:border-tinta/25"
            >
              <span className="inline-flex items-center gap-1.5"><Ikon nama="arrow-left" ukuran={16} />Kembali</span>
            </button>
            <button
              type="button"
              onClick={lanjutDariKontak}
              className="rounded-full bg-emas px-5 py-2.5 text-sm font-bold text-tinta shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="inline-flex items-center gap-1.5">Lanjut <Ikon nama="arrow-right" ukuran={16} /></span>
            </button>
          </div>
        </div>
      )}

      {/* LANGKAH 4 — Tinjau */}
      {langkah === 4 && (
        <div className="mt-6">
          <h2 className="font-heading text-xl text-gunung">Tinjau &amp; kirim</h2>
          <dl className="mt-4 divide-y divide-tinta/10 rounded-2xl border border-tinta/10">
            <div className="grid sm:grid-cols-3 gap-1 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-tinta-pudar">Tema</dt>
              <dd className="sm:col-span-2 text-sm">{tema}</dd>
            </div>
            <div className="grid sm:grid-cols-3 gap-1 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-tinta-pudar">Lokasi</dt>
              <dd className="sm:col-span-2 text-sm">
                {lokasi} — {dapil}
              </dd>
            </div>
            <div className="grid sm:grid-cols-3 gap-1 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-tinta-pudar">Routing</dt>
              <dd className="sm:col-span-2 text-sm">
                Arah awal: {komisi} · {dapil}
              </dd>
            </div>
            <div className="grid sm:grid-cols-3 gap-1 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-tinta-pudar">Isi</dt>
              <dd className="sm:col-span-2 text-sm whitespace-pre-line">{isi}</dd>
            </div>
            <div className="grid sm:grid-cols-3 gap-1 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-tinta-pudar">Pelapor</dt>
              <dd className="sm:col-span-2 text-sm">
                {nama} · {kontak}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => setLangkah(3)}
              className="rounded-full border border-tinta/10 bg-white px-4 py-2.5 text-sm font-semibold text-tinta transition-colors hover:border-tinta/25"
            >
              <span className="inline-flex items-center gap-1.5"><Ikon nama="arrow-left" ukuran={16} />Kembali</span>
            </button>
            <button
              type="button"
              onClick={kirim}
              className="rounded-full bg-daun-tua px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-daun/25 transition-transform hover:-translate-y-0.5"
            >
              Simpan tiket di browser
            </button>
          </div>
        </div>
      )}

      {pesanValidasi && (
        <p role="alert" className="mt-5 rounded-xl border border-cianjur/20 bg-cianjur/5 px-4 py-3 text-sm font-medium text-cianjur">{pesanValidasi}</p>
      )}

      <GarisPadi className="mt-6" />
      <p className="mt-3 text-xs text-tinta-pudar">
        Formulir ini belum terhubung ke sistem penerimaan DPRD. Hindari memasukkan data sensitif; isi hanya tersimpan secara lokal di browser ini.
      </p>
    </div>
  );
}
