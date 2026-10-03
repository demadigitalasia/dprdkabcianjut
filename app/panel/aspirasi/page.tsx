import { ASPIRASI } from "@/lib/demo-data";
import { BadgeStatus } from "@/components/badge-status";
import { AksiTriaseDemo } from "@/components/aksi-triase-demo";

export const metadata = { title: "Triage Aspirasi (Panel)" };

export default function PanelTriage() {
  const antrean = ASPIRASI.filter((a) =>
    ["Diterima", "Diverifikasi"].includes(a.status)
  );

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl text-gunung">
            Antrean Triage — PIC Aspirasi Setwan
          </h2>
          <p className="mt-1 text-sm text-tinta-pudar">
            Verifikasi, moderasi, lalu teruskan ke komisi + anggota dapil.
          </p>
        </div>
        <p className="text-sm text-tinta-pudar">
          {antrean.length} menunggu · SLA routing ≤ 2 hari kerja
        </p>
      </div>

      <ul className="mt-6 grid gap-3 md:hidden" aria-label="Antrean aspirasi">
        {antrean.map((a) => (
          <li key={a.id} className="rounded-2xl border border-tinta/10 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs font-semibold text-gunung">{a.tiket}</p>
                <h3 className="mt-1 font-semibold text-tinta">{a.tema}</h3>
              </div>
              <BadgeStatus status={a.status} />
            </div>
            <p className="mt-3 text-sm text-tinta-pudar">{a.komisi} <span aria-hidden>·</span> {a.dapil}</p>
            <div className="mt-4 border-t border-tinta/10 pt-3">
              <AksiTriaseDemo tiket={a.tiket} />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-tinta/5 bg-white shadow-sm md:block">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-tinta/10 bg-krem text-left text-xs uppercase tracking-wide text-tinta-pudar">
              <th scope="col" className="px-4 py-3">Tiket</th>
              <th scope="col" className="px-4 py-3">Tema</th>
              <th scope="col" className="px-4 py-3">Dapil</th>
              <th scope="col" className="px-4 py-3">Usulan Routing</th>
              <th scope="col" className="px-4 py-3">Status</th>
              <th scope="col" className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {antrean.map((a) => (
              <tr key={a.id} className="border-b border-tinta/5 last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-gunung">{a.tiket}</td>
                <td className="px-4 py-3">{a.tema}</td>
                <td className="px-4 py-3">{a.dapil}</td>
                <td className="px-4 py-3">
                  {a.komisi} <span className="text-tinta-pudar">+ anggota {a.dapil}</span>
                </td>
                <td className="px-4 py-3">
                  <BadgeStatus status={a.status} />
                </td>
                <td className="px-4 py-3">
                  <AksiTriaseDemo tiket={a.tiket} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-tinta-pudar">
        Verifikasi &amp; moderasi dilakukan oleh PIC Aspirasi Setwan. Setiap koreksi routing tercatat pada log audit.
      </p>
    </div>
  );
}
