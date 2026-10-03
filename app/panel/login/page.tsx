"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Ikon } from "@/components/ikon";

const PERAN = [
  { id: "admin", nama: "Admin sistem", cakupan: "Pengelolaan panel dan seluruh modul" },
  { id: "sekretariat", nama: "Sekretariat / PIC aspirasi", cakupan: "Verifikasi dan routing aspirasi" },
  { id: "dewan", nama: "Anggota dewan", cakupan: "Aspirasi sesuai dapil dan komisi" },
  { id: "staf", nama: "Staf dewan", cakupan: "Tampilan demo atas delegasi anggota" },
  { id: "pimpinan", nama: "Pimpinan dewan", cakupan: "Ringkasan agregat aspirasi" },
] as const;

export default function LoginPanel() {
  const router = useRouter();
  const [peran, setPeran] = useState<(typeof PERAN)[number]["id"]>("sekretariat");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function masuk(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError("Isi email dan kata sandi demo untuk melanjutkan.");
      return;
    }
    sessionStorage.setItem("panel_demo_role", peran);
    sessionStorage.setItem("panel_demo_email", email.trim());
    router.push("/panel");
  }

  return (
    <main className="grid min-h-screen bg-krem lg:grid-cols-[minmax(0,1fr)_minmax(25rem,0.8fr)]">
      <section className="relative hidden overflow-hidden bg-gunung p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div aria-hidden className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-daun/20 blur-3xl" />
        <Link href="/" className="relative inline-flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl p-1.5"><Image src="/logo-cianjur.webp" alt="" width={44} height={48} className="h-full w-auto object-contain" /></span>
          <span><span className="block font-heading font-semibold">DPRD Kabupaten Cianjur</span><span className="text-xs text-white/60">Sekretariat Dewan</span></span>
        </Link>
        <div className="relative max-w-xl pb-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emas">Ruang kerja internal</p>
          <h1 className="mt-4 font-heading text-4xl leading-tight">Kelola aspirasi dengan peran yang tepat.</h1>
          <p className="mt-4 leading-relaxed text-white/70">Demo alur kerja untuk sekretariat, anggota dewan, staf, pimpinan, dan admin sistem.</p>
        </div>
        <p className="relative text-xs text-white/50">Pratinjau antarmuka · tidak terhubung ke autentikasi resmi</p>
      </section>

      <section className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-lg">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-daun-tua hover:text-gunung"><Ikon nama="arrow-left" ukuran={15} />Kembali ke situs publik</Link>
          <div className="mt-6 rounded-2xl border border-jerami bg-white p-5 shadow-sm sm:p-8">
            <div className="lg:hidden"><p className="text-xs font-bold uppercase tracking-widest text-daun-tua">Panel aspirasi</p></div>
            <h2 className="mt-2 font-heading text-2xl text-gunung">Masuk ke panel</h2>
            <p className="mt-1 text-sm leading-relaxed text-tinta-pudar">Pilih peran untuk melihat tampilan demo yang sesuai.</p>

            <div className="mt-5 rounded-xl border border-emas/40 bg-[#fff9d9] p-3 text-xs leading-relaxed text-gunung"><strong>Mode demo.</strong> Formulir ini tidak memverifikasi akun. Gunakan data fiktif dan jangan masukkan kata sandi asli.</div>

            <form onSubmit={masuk} className="mt-5 space-y-4">
              <div>
                <label htmlFor="peran" className="text-sm font-semibold text-tinta">Peran demo</label>
                <select id="peran" value={peran} onChange={(e) => setPeran(e.target.value as typeof peran)} className="mt-1.5 h-11 w-full rounded-lg border border-tinta/15 bg-white px-3 text-sm text-tinta focus:border-daun focus:outline-none">
                  {PERAN.map((item) => <option key={item.id} value={item.id}>{item.nama}</option>)}
                </select>
                <p className="mt-1.5 text-xs text-tinta-pudar">{PERAN.find((item) => item.id === peran)?.cakupan}</p>
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-semibold text-tinta">Email</label>
                <input id="email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@contoh.go.id" className="mt-1.5 h-11 w-full rounded-lg border border-tinta/15 px-3 text-sm focus:border-daun focus:outline-none" />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-semibold text-tinta">Kata sandi demo</label>
                <input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ketik apa saja untuk demo" className="mt-1.5 h-11 w-full rounded-lg border border-tinta/15 px-3 text-sm focus:border-daun focus:outline-none" />
              </div>
              <div className="flex justify-end"><Link href="/panel/lupa-password" className="text-sm font-semibold text-daun-tua underline underline-offset-4">Lupa kata sandi?</Link></div>
              {error && <p role="alert" className="text-sm font-medium text-red-700">{error}</p>}
              <button type="submit" className="h-11 w-full rounded-lg bg-gunung px-4 text-sm font-bold text-white transition-colors hover:bg-gunung-hover">Masuk ke demo</button>
            </form>
          </div>
          <p className="mt-4 text-center text-xs text-tinta-pudar">Akses produksi membutuhkan akun dan verifikasi dari administrator.</p>
        </div>
      </section>
    </main>
  );
}
