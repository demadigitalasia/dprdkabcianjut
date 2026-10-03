import Link from "next/link";

export default function NotFound() {
  return <div className="mx-auto grid min-h-[55vh] max-w-3xl content-center px-4 py-16 text-center sm:px-6">
    <p className="text-xs font-bold uppercase tracking-[0.2em] text-daun-tua">Halaman tidak ditemukan</p>
    <h1 className="mt-3 font-heading text-4xl text-gunung sm:text-5xl">Sepertinya halaman ini belum ada.</h1>
    <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-tinta-pudar">Tautan mungkin berubah atau alamatnya keliru. Kembali ke beranda untuk melanjutkan.</p>
    <Link href="/" className="mx-auto mt-7 rounded-full bg-emas px-5 py-3 text-sm font-bold text-tinta">Kembali ke beranda</Link>
  </div>;
}
