"use client";

import { useMemo, useState } from "react";
import type { Anggota } from "@/lib/demo-data";
import { KartuAnggota } from "@/components/kartu-anggota";
import { Ikon } from "@/components/ikon";

export function DaftarAnggota({ anggota, dapilAwal = "" }: { anggota: Anggota[]; dapilAwal?: string }) {
  const [kata, setKata] = useState("");
  const [dapil, setDapil] = useState(dapilAwal);
  const [partai, setPartai] = useState("");
  const dapilList = useMemo(() => [...new Set(anggota.map((a) => a.dapil))].sort((a, b) => a.localeCompare(b, "id-ID", { numeric: true })), [anggota]);
  const partaiList = useMemo(() => [...new Set(anggota.map((a) => a.partai))].sort((a, b) => a.localeCompare(b, "id-ID")), [anggota]);
  const hasil = anggota.filter((a) =>
    a.nama.toLocaleLowerCase("id-ID").includes(kata.trim().toLocaleLowerCase("id-ID")) &&
    (!dapil || a.dapil === dapil) &&
    (!partai || a.partai === partai)
  ).sort((a, b) => a.nama.localeCompare(b.nama, "id-ID"));
  const filterAktif = Boolean(kata || dapil || partai);

  function hapusFilter() {
    setKata("");
    setDapil("");
    setPartai("");
  }

  return (
    <section aria-labelledby="direktori-anggota">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3 sm:mb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-daun-tua">Periode 2024–2029</p>
          <h2 id="direktori-anggota" className="mt-1 font-heading text-2xl text-gunung sm:text-3xl">Anggota DPRD Lainnya</h2>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-tinta-pudar">Cari anggota berdasarkan nama, partai politik, atau daerah pemilihan.</p>
        </div>
        <p className="rounded-full border border-jerami bg-white px-3 py-1.5 text-xs font-semibold text-gunung">{anggota.length} anggota</p>
      </div>
      <div className="rounded-3xl border border-jerami bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_auto]">
          <label className="text-xs font-semibold text-tinta-pudar">
            Cari anggota
            <span className="relative mt-1.5 block">
              <Ikon nama="search" ukuran={17} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
              <input value={kata} onChange={(e) => setKata(e.target.value)} placeholder="Nama anggota" className="h-11 w-full rounded-xl border border-tinta/15 bg-white pl-10 pr-3 text-sm font-normal text-tinta outline-none transition-colors placeholder:text-tinta-pudar/70 focus:border-daun focus:ring-2 focus:ring-daun/10" />
            </span>
          </label>
          <label className="text-xs font-semibold text-tinta-pudar">Daerah pemilihan
            <select value={dapil} onChange={(e) => setDapil(e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-tinta/15 bg-white px-3 text-sm font-normal text-tinta outline-none focus:border-daun focus:ring-2 focus:ring-daun/10">
              <option value="">Semua dapil</option>{dapilList.map((x) => <option key={x} value={x}>{x}</option>)}
            </select>
          </label>
          <label className="text-xs font-semibold text-tinta-pudar">Partai politik
            <select value={partai} onChange={(e) => setPartai(e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-tinta/15 bg-white px-3 text-sm font-normal text-tinta outline-none focus:border-daun focus:ring-2 focus:ring-daun/10">
              <option value="">Semua partai</option>{partaiList.map((x) => <option key={x} value={x}>{x}</option>)}
            </select>
          </label>
          <div className="flex items-end">
            <button type="button" onClick={hapusFilter} disabled={!filterAktif} className="h-11 w-full rounded-xl border border-tinta/10 px-3 text-sm font-semibold text-tinta-pudar transition-colors hover:border-tinta/25 hover:text-gunung disabled:cursor-default disabled:opacity-40 xl:w-auto">Reset</button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-b border-jerami pb-3">
        <p className="text-sm text-tinta-pudar" aria-live="polite">Menampilkan <strong className="font-semibold text-gunung">{hasil.length}</strong> dari {anggota.length} anggota</p>
        <p className="text-xs text-tinta-pudar">Diurutkan berdasarkan nama</p>
      </div>

      {hasil.length ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {hasil.map((a) => <KartuAnggota key={a.slug} anggota={a} />)}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-tinta/15 bg-krem px-6 py-10 text-center">
          <p className="font-heading text-lg text-gunung">Anggota tidak ditemukan</p>
          <p className="mt-1 text-sm text-tinta-pudar">Periksa nama atau ubah pilihan filter.</p>
          <button type="button" onClick={hapusFilter} className="mt-4 rounded-full bg-gunung px-4 py-2 text-sm font-semibold text-white">Hapus semua filter</button>
        </div>
      )}
    </section>
  );
}
