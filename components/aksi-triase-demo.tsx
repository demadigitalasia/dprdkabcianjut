"use client";

import { useState } from "react";

export function AksiTriaseDemo({ tiket }: { tiket: string }) {
  const [terus, setTerus] = useState(false);
  return <div>
    <button type="button" disabled={terus} onClick={() => setTerus(true)} className="rounded-full bg-emas px-3.5 py-1.5 text-xs font-bold text-tinta disabled:cursor-default disabled:opacity-60">{terus ? "Diteruskan" : "Teruskan"}</button>
    {terus && <p role="status" className="mt-1 max-w-36 text-xs text-daun-tua">{tiket} diteruskan ke komisi terkait.</p>}
  </div>;
}

export function AksiAnggotaDemo({ ringkas }: { ringkas: string }) {
  const [terbuka, setTerbuka] = useState(false);
  const [dicatat, setDicatat] = useState(false);
  return <div className="mt-4">
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={() => setDicatat(true)} className="rounded-full bg-emas px-3.5 py-1.5 text-xs font-bold text-tinta">{dicatat ? "Tindak lanjut dicatat" : "Catat tindak lanjut"}</button>
      <button type="button" aria-expanded={terbuka} onClick={() => setTerbuka(!terbuka)} className="rounded-full border border-tinta/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-tinta-pudar">{terbuka ? "Tutup detail" : "Detail"}</button>
    </div>
    {dicatat && <p role="status" className="mt-2 text-xs text-daun-tua">Catatan tindak lanjut berhasil disimpan.</p>}
    {terbuka && <div className="mt-3 rounded-xl bg-krem p-3 text-sm text-tinta-pudar"><strong className="text-tinta">Ringkasan aspirasi:</strong> {ringkas}</div>}
  </div>;
}
