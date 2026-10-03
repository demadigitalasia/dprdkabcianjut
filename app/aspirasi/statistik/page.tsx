import { ASPIRASI } from "@/lib/demo-data";
import { PageHeader } from "@/components/page-header";
import { GarisPadi } from "@/components/garis-padi";

export const metadata = { title: "Statistik Aspirasi" };

const AMBANG = 5; // ambang privasi n ≥ 5 (FR-13.6)

function agregat<K extends string>(data: typeof ASPIRASI, kunci: (a: (typeof ASPIRASI)[number]) => K) {
  const peta = new Map<string, number>();
  for (const a of data) {
    const k = kunci(a);
    peta.set(k, (peta.get(k) ?? 0) + 1);
  }
  const besar = [...peta.entries()]
    .filter(([, n]) => n >= AMBANG)
    .sort((a, b) => b[1] - a[1]);
  const kecil = [...peta.entries()].filter(([, n]) => n < AMBANG);
  const totalKecil = kecil.reduce((s, [, n]) => s + n, 0);
  if (totalKecil > 0) besar.push(["Lainnya (sel < 5)", totalKecil]);
  return besar;
}

function Baris({ label, nilai, maks }: { label: string; nilai: number; maks: number }) {
  return (
    <li className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-center">
      <div className="min-w-0">
        <div className="flex justify-between gap-3 text-sm">
          <span className="min-w-0 flex-1 truncate text-tinta">{label}</span>
          <span className="shrink-0 font-semibold text-gunung">{nilai}</span>
        </div>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-tinta/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-daun to-cianjur"
            style={{ width: `${Math.round((nilai / maks) * 100)}%` }}
          />
        </div>
      </div>
    </li>
  );
}

export default function HalamanStatistik() {
  const perTema = agregat(ASPIRASI, (a) => a.tema);
  const perDapil = agregat(ASPIRASI, (a) => a.dapil);
  const perStatus = agregat(ASPIRASI, (a) => a.status);
  const maksTema = Math.max(...perTema.map(([, n]) => n));
  const maksDapil = Math.max(...perDapil.map(([, n]) => n));
  const maksStatus = Math.max(...perStatus.map(([, n]) => n));

  return (
    <>
      <PageHeader
        label="Transparansi Aspirasi"
        judul="Statistik Aspirasi"
        deskripsi="Contoh tampilan agregat aspirasi untuk pratinjau. Data ini bukan laporan operasional DPRD."
        gambar="/ilustrasi-halaman/statistik-aspirasi.webp"
        altGambar="Ilustrasi staf meninjau grafik ringkasan layanan"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 space-y-10">
        <p className="text-sm text-tinta-pudar">
          Total contoh aspirasi:{" "}
          <strong className="text-tinta">{ASPIRASI.length}</strong>
        </p>

        <section>
          <h2 className="font-heading text-xl text-gunung">Per Tema</h2>
          <GarisPadi className="mt-2 max-w-[180px]" />
          <ul className="mt-4 space-y-4">
            {perTema.map(([label, n]) => (
              <Baris key={label} label={label} nilai={n} maks={maksTema} />
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl text-gunung">Per Dapil</h2>
          <GarisPadi className="mt-2 max-w-[180px]" />
          <ul className="mt-4 space-y-4">
            {perDapil.map(([label, n]) => (
              <Baris key={label} label={label} nilai={n} maks={maksDapil} />
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl text-gunung">Per Status</h2>
          <GarisPadi className="mt-2 max-w-[180px]" />
          <ul className="mt-4 space-y-4">
            {perStatus.map(([label, n]) => (
              <Baris key={label} label={label} nilai={n} maks={maksStatus} />
            ))}
          </ul>
        </section>

        <p className="text-xs text-tinta-pudar">
            Data pratinjau statis. Angka ini tidak mencerminkan laporan operasional.
        </p>
      </div>
    </>
  );
}
