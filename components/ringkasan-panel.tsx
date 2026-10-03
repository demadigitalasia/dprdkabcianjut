"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ASPIRASI } from "@/lib/demo-data";
import { Ikon } from "@/components/ikon";

type Role = "admin" | "sekretariat" | "dewan" | "staf" | "pimpinan";
type KartuMenu = { judul: string; uraian: string; href: string; labelAksi: string };

const PENGATURAN_ROLE: Record<Role, { judul: string; uraian: string; cards: KartuMenu[] }> = {
  admin: {
    judul: "Ringkasan sistem",
    uraian: "Pilih ruang kerja untuk melihat alur aspirasi dan ringkasan yang tersedia dalam pratinjau ini.",
    cards: [
      { judul: "Verifikasi aspirasi", uraian: "Tinjau antrean baru dan contoh routing ke komisi atau dapil.", href: "/panel/aspirasi", labelAksi: "Buka antrean" },
      { judul: "Aspirasi anggota", uraian: "Lihat contoh daftar tindak lanjut dalam lingkup anggota.", href: "/panel/aspirasi-saya", labelAksi: "Buka daftar" },
      { judul: "Ringkasan pimpinan", uraian: "Lihat distribusi aspirasi menurut status, komisi, dan dapil.", href: "/panel/aspirasi-pimpinan", labelAksi: "Lihat ringkasan" },
    ],
  },
  sekretariat: {
    judul: "Ruang kerja sekretariat",
    uraian: "Mulai dari antrean yang perlu diperiksa dan dirutekan oleh PIC aspirasi.",
    cards: [{ judul: "Antrean verifikasi", uraian: "Tinjau aspirasi baru atau yang menunggu verifikasi sebelum penentuan tujuan.", href: "/panel/aspirasi", labelAksi: "Periksa antrean" }],
  },
  dewan: {
    judul: "Ruang kerja anggota dewan",
    uraian: "Tinjau aspirasi dalam ruang lingkup penugasan anggota dan catat langkah tindak lanjut.",
    cards: [{ judul: "Aspirasi anggota", uraian: "Cari aspirasi, periksa status, dan tambahkan catatan tindak lanjut pada tampilan pratinjau.", href: "/panel/aspirasi-saya", labelAksi: "Buka aspirasi" }],
  },
  staf: {
    judul: "Ruang kerja staf dewan",
    uraian: "Lihat contoh pekerjaan delegasi yang ditampilkan untuk staf pendukung anggota.",
    cards: [{ judul: "Aspirasi delegasi", uraian: "Tinjau aspirasi dalam cakupan delegasi contoh dan siapkan catatan untuk anggota.", href: "/panel/aspirasi-saya", labelAksi: "Buka delegasi" }],
  },
  pimpinan: {
    judul: "Pemantauan pimpinan",
    uraian: "Lihat gambaran agregat aspirasi menurut status, komisi, dan daerah pemilihan.",
    cards: [{ judul: "Ringkasan aspirasi", uraian: "Pantau sebaran data pada ringkasan baca-saja.", href: "/panel/aspirasi-pimpinan", labelAksi: "Lihat ringkasan" }],
  },
};

const ROLE_LABEL: Record<Role, string> = {
  admin: "Admin sistem",
  sekretariat: "Sekretariat / PIC aspirasi",
  dewan: "Anggota dewan",
  staf: "Staf dewan",
  pimpinan: "Pimpinan dewan",
};

export function RingkasanPanel() {
  const [role, setRole] = useState<Role>("sekretariat");
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const currentRole = sessionStorage.getItem("panel_demo_role") as Role | null;
      if (currentRole && currentRole in PENGATURAN_ROLE) setRole(currentRole);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  const konfigurasi = PENGATURAN_ROLE[role];
  const antrean = ASPIRASI.filter((item) => ["Diterima", "Diverifikasi"].includes(item.status));
  const dalamCakupan = ASPIRASI.filter((item) => item.dapil === "Cianjur 4" || item.komisi === "Komisi I");
  const sedangDiproses = ASPIRASI.filter((item) => ["Diteruskan", "Dibahas"].includes(item.status));
  const selesai = ASPIRASI.filter((item) => ["Ditindaklanjuti", "Ditutup"].includes(item.status));
  const metrik = role === "sekretariat"
    ? [[antrean.length, "Menunggu verifikasi"], [sedangDiproses.length, "Diteruskan / dibahas"], [selesai.length, "Ditindaklanjuti / ditutup"]]
    : role === "dewan" || role === "staf"
      ? [[dalamCakupan.length, "Dalam cakupan contoh"], [dalamCakupan.filter((item) => ["Diterima", "Diverifikasi"].includes(item.status)).length, "Perlu perhatian"], [dalamCakupan.filter((item) => ["Ditindaklanjuti", "Ditutup"].includes(item.status)).length, "Ditindaklanjuti / ditutup"]]
      : role === "pimpinan"
        ? [[ASPIRASI.length, "Seluruh catatan"], [sedangDiproses.length, "Diteruskan / dibahas"], [selesai.length, "Ditindaklanjuti / ditutup"]]
        : [[Object.keys(ROLE_LABEL).length, "Peran tersedia"], [3, "Modul aspirasi"], [ASPIRASI.length, "Catatan contoh"]];

  return (
    <div>
      <header className="rounded-2xl bg-gunung p-5 text-white sm:p-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emas">{ROLE_LABEL[role]}</p>
        <h1 className="mt-2 font-heading text-2xl sm:text-3xl">{konfigurasi.judul}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">{konfigurasi.uraian}</p>
      </header>

      <div className="mt-4 rounded-xl border border-emas/40 bg-[#fff9d9] p-4 text-xs leading-relaxed text-gunung">
        <strong>Data pratinjau.</strong> Angka antrean berasal dari dataset contoh yang sama dengan halaman modul. Tenggat dan pembaruan otomatis belum tersedia.
      </div>

      <section aria-label="Indikator ringkasan" className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {metrik.map(([jumlah, label]) => (
          <article key={label} className="rounded-xl border border-jerami bg-white p-4">
            <p className="font-heading text-2xl tabular-nums text-gunung sm:text-3xl">{jumlah}</p>
            <p className="mt-1 text-xs font-medium text-tinta-pudar">{label}</p>
          </article>
        ))}
      </section>

      <section aria-labelledby="judul-pekerjaan" className="mt-7">
        <div className="mb-3 border-b border-jerami pb-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-daun-tua">Akses sesuai peran</p>
          <h2 id="judul-pekerjaan" className="mt-1 font-heading text-xl text-gunung">Ruang kerja yang tersedia</h2>
        </div>
        <ul className="grid gap-3 lg:grid-cols-2">
          {konfigurasi.cards.map((kartu) => (
            <li key={kartu.href}>
              <Link href={kartu.href} className="group flex h-full flex-col rounded-2xl border border-jerami bg-white p-5 transition-colors hover:border-daun/40 hover:bg-pucuk/40">
                <h3 className="font-heading text-lg text-gunung">{kartu.judul}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-tinta-pudar">{kartu.uraian}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-daun-tua">{kartu.labelAksi}<Ikon nama="arrow-right" ukuran={16} className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
