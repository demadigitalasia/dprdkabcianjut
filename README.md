# Demo — Website DPRD Kabupaten Cianjur

Purwarupa (demo) klikabel dengan **data dummy (fiktif)** — bukan situs resmi.
Dibangun dengan **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4**,
mengikuti arah desain **"Beasan"** dari suite perencanaan.

> Brief lengkap: [`../docs/demo/brief-demo.md`](../docs/demo/brief-demo.md)

## Menjalankan

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Build produksi:

```bash
pnpm build && pnpm start
```

## Halaman

| Rute | Isi |
|---|---|
| `/` | Beranda (hero editorial, agenda, berita, lembar arsip, statistik) |
| `/anggota` + `/anggota/[slug]` | Profil contoh, filter dapil/fraksi/komisi, pencarian + profil |
| `/berita` + `/berita/[slug]` | Daftar berita contoh dengan filter/pencarian & detail |
| `/agenda` | Agenda contoh + unduhan `.ics` simulasi |
| `/transparansi` | Arsip contoh (filter kategori/tahun) + PDF demo |
| `/aspirasi` | Form multi-langkah simulasi + gerbang SP4N |
| `/aspirasi/lacak` | Lacak tiket simulasi (localStorage browser yang sama) |
| `/aspirasi/statistik` | Statistik agregat (ambang n ≥ 5) |
| `/kontak`, `/aksesibilitas` | Kontak & pernyataan aksesibilitas |
| `/panel/aspirasi` | Panel triage Setwan (mock) |
| `/panel/aspirasi-saya` | Daftar aspirasi anggota (mock) |
| `/panel/aspirasi-pimpinan` | Ringkasan pimpinan (mock) |

## Guardrail (wajib dijaga)

1. **Hanya data dummy** — dilarang menambahkan data pribadi nyata.
2. `noindex` aktif (`app/robots.ts` + metadata) — demo tidak boleh terindeks.
3. Data dalam purwarupa ini bersifat fiktif dan belum terhubung ke layanan resmi.
4. Tanpa backend/database — tiket aspirasi disimulasikan di `localStorage`; jangan memasukkan data pribadi.
5. Hosting demo: **Vercel**. Produksi: self-host di wilayah Indonesia (rencana).

> **Lambang:** berkas resmi ada di `public/logo-cianjur.webp` dan dipakai pada
> `header.tsx` & `footer.tsx` melalui `next/image`. Komponen ilustrasi SVG
> (`components/logo-cianjur.tsx`) disimpan sebagai cadangan/referensi.

## Deploy ke Vercel

1. Push folder ini ke repositori GitHub.
2. Di Vercel: **New Project → Import repo** → framework terdeteksi otomatis (Next.js).
3. Tidak perlu environment variable.
4. Deploy — bagikan URL demo secara terbatas.

## Struktur

```
app/          # Rute (App Router)
components/   # UI "Beasan" (Garis Padi, kartu, form, dsb.)
lib/demo-data # Data dummy bertipe (anggota, berita, dokumen, agenda, aspirasi)
```
