"use client";

import Link from "next/link";
import { useState } from "react";
import { Ikon } from "@/components/ikon";

export default function LupaPasswordPanel() {
  const [email, setEmail] = useState("");
  const [dikirim, setDikirim] = useState(false);
  return (
    <main className="grid min-h-screen place-items-center bg-krem px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-jerami bg-white p-6 shadow-sm sm:p-8">
        <Link href="/panel/login" className="inline-flex items-center gap-1.5 text-sm font-semibold text-daun-tua"><Ikon nama="arrow-left" ukuran={15} />Kembali ke login</Link>
        <p className="mt-6 text-xs font-bold uppercase tracking-widest text-daun-tua">Pemulihan akun</p>
        <h1 className="mt-2 font-heading text-2xl text-gunung">Lupa kata sandi?</h1>
        <p className="mt-2 text-sm leading-relaxed text-tinta-pudar">Masukkan email akun untuk melihat alur pemulihan dalam demo.</p>
        <div className="mt-5 rounded-xl border border-emas/40 bg-[#fff9d9] p-3 text-xs leading-relaxed text-gunung"><strong>Simulasi saja.</strong> Tidak ada email pemulihan yang dikirim.</div>
        {dikirim ? (
          <p role="status" className="mt-5 rounded-lg bg-pucuk p-4 text-sm leading-relaxed text-gunung">Jika akun dengan alamat <strong>{email}</strong> terdaftar, instruksi pemulihan akan dikirim. Pada demo ini, pesan tersebut tidak benar-benar dikirim.</p>
        ) : (
          <form onSubmit={(event) => { event.preventDefault(); if (email.trim()) setDikirim(true); }} className="mt-5 space-y-4">
            <div><label htmlFor="email-pemulihan" className="text-sm font-semibold text-tinta">Email akun</label><input id="email-pemulihan" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nama@contoh.go.id" className="mt-1.5 h-11 w-full rounded-lg border border-tinta/15 px-3 text-sm focus:border-daun focus:outline-none" /></div>
            <button type="submit" className="h-11 w-full rounded-lg bg-gunung px-4 text-sm font-bold text-white hover:bg-gunung-hover">Tampilkan konfirmasi demo</button>
          </form>
        )}
      </section>
    </main>
  );
}
