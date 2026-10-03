import { PageHeader } from "@/components/page-header";
import { ButirPadi } from "@/components/garis-padi";
import Image from "next/image";

export const metadata = { title: "Aksesibilitas" };

export default function HalamanAksesibilitas() {
  return (
    <>
      <PageHeader
        label="Komitmen Layanan"
        judul="Pernyataan Aksesibilitas"
        deskripsi="Kami berupaya agar situs ini dapat digunakan semua orang, termasuk pengguna pembaca layar dan navigasi keyboard."
        gambar="/ilustrasi-halaman/aksesibilitas-layanan.webp"
        altGambar="Ilustrasi petugas membantu warga di loket layanan yang aksesibel"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 space-y-6 text-base leading-relaxed text-tinta">
        <div className="float-right ml-5 hidden w-40 sm:block"><Image src="/illustrations/aksesibilitas.svg" alt="" aria-hidden width={420} height={300} className="h-auto w-full" /></div>
        <section>
          <h2 className="font-heading text-lg text-gunung">Standar</h2>
          <p className="mt-2">
            Target rancangan: <strong>WCAG 2.1 level AA</strong> — kontras warna yang
            cukup, struktur heading yang runtut, navigasi keyboard penuh, dan
            teks alternatif pada gambar.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg text-gunung">Umpan Balik</h2>
          <p className="mt-2">
            Menemukan hambatan akses? Laporkan melalui email{" "}
            <a className="font-semibold underline decoration-dotted underline-offset-4" href="mailto:Setwankabcianjur@gmail.com?subject=Aksesibilitas">Setwankabcianjur@gmail.com</a> dengan
            subjek &quot;Aksesibilitas&quot;.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg text-gunung">Fitur Aksesibilitas</h2>
          <ul className="mt-2 space-y-2">
            <li className="flex gap-2">
              <ButirPadi className="mt-1.5" />
              Kontras teks &amp; latar dirancang dengan memperhatikan keterbacaan.
            </li>
            <li className="flex gap-2">
              <ButirPadi className="mt-1.5" />
              Semua fungsi dapat diakses via keyboard; fokus terlihat.
            </li>
            <li className="flex gap-2">
              <ButirPadi className="mt-1.5" />
              Struktur heading hierarkis dan landmark halaman tersedia.
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
