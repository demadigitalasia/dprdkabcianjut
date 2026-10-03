// ============================================================
// DATA KONTEN — Website DPRD Kabupaten Cianjur
// Data keanggotaan, berita, dan layanan publik DPRD Kabupaten Cianjur.
// ============================================================

export type Anggota = {
  slug: string;
  nama: string;
  foto?: string;
  partai: string;
  dapil: string;
  periode: string;
  jabatan?: "Ketua" | "Wakil Ketua";
};

export type Berita = {
  slug: string;
  judul: string;
  kategori: "Dewan" | "Sekretariat";
  tanggal: string;
  ringkasan: string;
  isi: string[];
  gambar?: string;
  gambarAlt?: string;
  gambarIlustrasi?: boolean;
  dewanTerkait?: string[];
};

export type Dokumen = {
  id: string;
  judul: string;
  kategori: "Anggaran" | "Kinerja" | "PPID" | "Informasi";
  tahun: number;
  nomor: string;
  ukuran: string;
  tanggal: string;
  berkas?: string;
};

export type Agenda = {
  id: string;
  judul: string;
  jenis: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
  status: "Akan datang" | "Selesai";
};

export type Aspirasi = {
  id: string;
  tiket: string;
  tema: string;
  komisi: string;
  dapil: string;
  status:
    | "Diterima"
    | "Diverifikasi"
    | "Diteruskan"
    | "Dibahas"
    | "Ditindaklanjuti"
    | "Ditutup";
  tanggal: string;
  ringkas: string;
};

export const PERIODE = "2024–2029";

// ------------------------------------------------------------
// ANGGOTA — DPRD Kabupaten Cianjur periode 2024–2029
// ------------------------------------------------------------
export const DAPIL_INFO: Array<{ nama: string; kursi: number; wilayah: string[] }> = [
  { nama: "Cianjur 1", kursi: 9, wilayah: ["Cianjur", "Cilaku", "Karangtengah"] },
  { nama: "Cianjur 2", kursi: 8, wilayah: ["Warungkondang", "Cibeber", "Cugenang", "Gekbrong"] },
  { nama: "Cianjur 3", kursi: 9, wilayah: ["Pacet", "Cikalongkulon", "Sukaresmi", "Cipanas"] },
  { nama: "Cianjur 4", kursi: 8, wilayah: ["Ciranjang", "Bojongpicung", "Mande", "Sukaluyu", "Haurwangi"] },
  { nama: "Cianjur 5", kursi: 8, wilayah: ["Sukanagara", "Campaka", "Takokak", "Kadupandak", "Pagelaran", "Campakamulya", "Cijati", "Pasirkuda"] },
  { nama: "Cianjur 6", kursi: 8, wilayah: ["Tanggeung", "Cibinong", "Sindangbarang", "Agrabinta", "Cidaun", "Naringgul", "Cikadu", "Leles"] },
];

const DAFTAR_ANGGOTA: Array<[string, string, number]> = [
  ["Gopar Hendra Gunawan", "PKB", 1], ["Ridwansyah", "PKB", 2], ["Aziz Muslim", "PKB", 3], ["Dede Badri", "PKB", 4], ["Fuad Faizal", "PKB", 5], ["Lepi Ali Firmansyah, S.Pd, M.P", "PKB", 6],
  ["Ganjar Ramadhan, S.Pd", "Gerindra", 1], ["Irfan Aulia", "Gerindra", 2], ["Gugun Gunawan", "Gerindra", 3], ["Andri Suryadinata", "Gerindra", 4], ["Asep Deni Mulyadi", "Gerindra", 4], ["Angga Linoseva Nur Ansori", "Gerindra", 5], ["Diki Ismail", "Gerindra", 6],
  ["Aldi Yudistira", "PDIP", 1], ["Fahmi Zulfahmi", "PDIP", 2], ["Ati Rosmiati", "PDIP", 3], ["Hj. Susilawati, SH, M.K.P", "PDIP", 4], ["Bayu Eka Prayoga", "PDIP", 5], ["Rian Putra Wiwitan", "PDIP", 6],
  ["Muhammad Zulfahmi", "Golkar", 1], ["Atep Hermawan", "Golkar", 2], ["Irwan", "Golkar", 2], ["Asep Iwan", "Golkar", 3], ["Lukmanul Hakim", "Golkar", 3], ["Ir. Hj. Metty Triantika, M.T.", "Golkar", 4], ["Muhammad Isnaeni", "Golkar", 5], ["Usep Saepuloh Zen", "Golkar", 5], ["Igun Hendra", "Golkar", 6], ["Hendra Hendarin", "Golkar", 6],
  ["Muhammad Risman Santana", "NasDem", 1], ["Bayu Maulana Pamungkas", "NasDem", 2], ["Usep Setiawan", "NasDem", 3], ["Esih Sukaesih", "NasDem", 4], ["Teti Sri Hayati", "NasDem", 5], ["Rustam Effendi", "NasDem", 6],
  ["Wahyudin", "PKS", 1], ["Freddy Fitriadi", "PKS", 2], ["Imronah", "PKS", 3], ["Lucky Soleh Lukmanulhakim", "PKS", 4], ["Asep Riyatman", "PKS", 5],
  ["Hendi Mulyana", "PAN", 1], ["Cahya Ibrahim", "PAN", 3], ["Yoga Natanusa", "PAN", 4], ["Hendang Purnamasari", "PAN", 6],
  ["Lilis Boy", "Demokrat", 1], ["Lina Agustina", "Demokrat", 2], ["Lika Nurhayati", "Demokrat", 3], ["Farhan Faturohman", "Demokrat", 5], ["Asep Ritman", "Demokrat", 6],
  ["Titim Patimah", "PPP", 1],
];

function slugAnggota(nama: string) {
  return nama.toLocaleLowerCase("id-ID").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

export const ANGGOTA: Anggota[] = DAFTAR_ANGGOTA.map(([nama, partai, nomorDapil]) => ({
  slug: nama === "Ir. Hj. Metty Triantika, M.T." ? "metty-triantika"
    : nama === "Ganjar Ramadhan, S.Pd" ? "ganjar-ramadhan"
    : nama === "Hj. Susilawati, SH, M.K.P" ? "susilawati"
    : nama === "Lepi Ali Firmansyah, S.Pd, M.P" ? "lepi-ali-firmansyah"
    : slugAnggota(nama),
  nama, partai, dapil: `Cianjur ${nomorDapil}`, periode: PERIODE,
  ...(nama === "Ir. Hj. Metty Triantika, M.T." && { foto: "/anggota/metty-triantika.jpg" }),
  ...(nama === "Ganjar Ramadhan, S.Pd" && { foto: "/anggota/ganjar-ramadhan.jpg" }),
  ...(nama === "Lepi Ali Firmansyah, S.Pd, M.P" && { foto: "/anggota/lepi-ali-firmansyah.jpg" }),
  ...(nama === "Hj. Susilawati, SH, M.K.P" && { foto: "/anggota/susilawati.jpg" }),
  ...((nama === "Ir. Hj. Metty Triantika, M.T." && { jabatan: "Ketua" as const })
    || (["Ganjar Ramadhan, S.Pd", "Hj. Susilawati, SH, M.K.P", "Lepi Ali Firmansyah, S.Pd, M.P"].includes(nama) && { jabatan: "Wakil Ketua" as const })),
}));

export const PIMPINAN_DPRD = ANGGOTA.filter((anggota) => anggota.jabatan);

// ------------------------------------------------------------
// BERITA — 13 item
// ------------------------------------------------------------
export const BERITA: Berita[] = [
  {
    slug: "rapat-paripurna-penetapan-perda-keolahragaan",
    judul: "Rapat Paripurna Penetapan Perda Keolahragaan",
    kategori: "Dewan",
    tanggal: "2026-09-07",
    ringkasan:
      "DPRD Kabupaten Cianjur menetapkan Perda Keolahragaan dalam rapat paripurna yang dihadiri pimpinan dan anggota dewan.",
    gambar: "/berita/rapat-paripurna-keolahragaan.webp",
    gambarAlt: "Ilustrasi rapat paripurna DPRD Kabupaten Cianjur",
    gambarIlustrasi: true,
    isi: [
      "DPRD Kabupaten Cianjur menggelar rapat paripurna penetapan Rancangan Peraturan Daerah tentang Keolahragaan. Rapat dipimpin langsung oleh Ketua DPRD dan dihadiri seluruh anggota serta perwakilan eksekutif.",
      "Dalam pembahasannya, komisi terkait menyampaikan sejumlah catatan mengenai pembinaan atlet daerah dan ketersediaan sarana olahraga di tiap kecamatan.",
      "Perda ini diharapkan menjadi dasar penguatan pembinaan olahraga prestasi maupun olahraga masyarakat di Kabupaten Cianjur.",
    ],
  },
  {
    slug: "dprd-cianjur-bahas-transparansi-anggaran-2027",
    judul: "DPRD Cianjur Bahas Transparansi Anggaran 2027",
    kategori: "Dewan",
    tanggal: "2026-08-19",
    ringkasan:
      "Badan Anggaran menggelar pembahasan awal kebijakan anggaran tahun 2027 dengan menekankan keterbukaan dokumen.",
    gambar: "/berita/rapat-anggaran-2027.webp",
    gambarAlt: "Ilustrasi rapat pembahasan anggaran bersama anggota dewan",
    gambarIlustrasi: true,
    isi: [
      "Badan Anggaran DPRD Kabupaten Cianjur memulai pembahasan awal kebijakan umum anggaran tahun 2027 bersama mitra eksekutif.",
      "Anggota menekankan pentingnya publikasi dokumen anggaran yang mudah diakses masyarakat melalui kanal resmi.",
      "Hasil pembahasan akan menjadi bahan penyusunan rekomendasi dewan.",
    ],
  },
  {
    slug: "komisi-iii-tinjau-jalan-rusak-pacet",
    judul: "Komisi III Tinjau Jalan Rusak di Kecamatan Pacet",
    kategori: "Dewan",
    tanggal: "2026-06-22",
    ringkasan:
      "Kunjungan lapangan Komisi III menemukan titik-titik kerusakan jalan yang menjadi keluhan warga.",
    gambar: "/berita/tinjau-jalan-pacet.webp",
    gambarAlt: "Ilustrasi warga dan anggota dewan meninjau jalan di kawasan Pacet",
    gambarIlustrasi: true,
    isi: [
      "Komisi III DPRD Kabupaten Cianjur melakukan kunjungan lapangan ke Kecamatan Pacet untuk meninjau kondisi jalan penghubung antar desa.",
      "Temuan lapangan akan dibahas bersama dinas terkait untuk mendorong perbaikan prioritas.",
    ],
  },
  {
    slug: "kunjungan-kerja-dprd-hulu-sungai-selatan",
    judul: "Kunjungan Kerja DPRD Kabupaten Hulu Sungai Selatan",
    kategori: "Sekretariat",
    tanggal: "2026-04-02",
    ringkasan:
      "Sekretariat DPRD menerima kunjungan kerja untuk berbagi praktik tata kelola informasi publik.",
    gambar: "/berita/kunjungan-kerja-kalsel.webp",
    gambarAlt: "Ilustrasi pertemuan kunjungan kerja di ruang rapat pemerintahan",
    gambarIlustrasi: true,
    isi: [
      "Sekretariat DPRD Kabupaten Cianjur menerima kunjungan kerja dari DPRD Kabupaten Hulu Sungai Selatan.",
      "Diskusi mencakup pengelolaan dokumentasi, keterbukaan informasi, dan layanan aspirasi masyarakat.",
    ],
  },
  {
    slug: "musrenbang-kabupaten-cianjur",
    judul: "Musyawarah Perencanaan Pembangunan Kabupaten Cianjur",
    kategori: "Dewan",
    tanggal: "2026-04-01",
    ringkasan:
      "Forum strategis penyusunan rencana pembangunan daerah yang partisipatif, menghimpun usulan dan aspirasi masyarakat.",
    gambar: "/musrenbang-2026.webp",
    dewanTerkait: [
      "irfan-aulia",
      "metty-triantika",
      "susilawati",
      "aziz-muslim",
    ],
    isi: [
      "Musyawarah Perencanaan Pembangunan (Musrenbang) Kabupaten Cianjur dilaksanakan sebagai forum strategis dalam rangka penyusunan rencana pembangunan daerah yang partisipatif dan berkelanjutan. Kegiatan ini dihadiri oleh unsur pemerintah daerah, DPRD, perangkat daerah, tokoh masyarakat, akademisi, serta berbagai pemangku kepentingan lainnya. Melalui Musrenbang, berbagai usulan dan aspirasi masyarakat dihimpun, dibahas, dan diselaraskan dengan prioritas pembangunan daerah guna mewujudkan pembangunan yang tepat sasaran. Forum ini juga menjadi momentum untuk memperkuat sinergi antara pemerintah dan masyarakat dalam mendukung percepatan pembangunan di Kabupaten Cianjur, baik di bidang infrastruktur, ekonomi, sosial, maupun pelayanan publik.",
    ],
  },
  {
    slug: "rapat-paripurna-lkpj-2025",
    judul: "Rapat Paripurna DPRD Kabupaten Cianjur",
    kategori: "Dewan",
    tanggal: "2026-03-30",
    ringkasan:
      "Rapat paripurna penyampaian Nota Pengantar LKPJ Bupati Tahun 2025 dan pembentukan Panitia Khusus pembahas LKPJ.",
    gambar: "/rapat-paripurna-2026-03-30.webp",
    dewanTerkait: ["metty-triantika", "lepi-ali-firmansyah", "ganjar-ramadhan"],
    isi: [
      "Rapat Paripurna DPRD Kabupaten Cianjur dilaksanakan pada hari Senin, 30 Maret 2026, bertempat di Ruang Rapat Paripurna Gedung DPRD Kabupaten Cianjur. Rapat dipimpin oleh Ketua DPRD Kabupaten Cianjur dan dihadiri oleh para Wakil Ketua, Anggota DPRD, Wakil Bupati Cianjur, serta perwakilan perangkat daerah terkait.",
      "Dengan agenda:",
      "1. Penyampaian Nota Pengantar Bupati Cianjur mengenai Laporan Keterangan Pertanggungjawaban (LKPJ) Bupati Cianjur Tahun 2025;",
      "2. Pembentukan Panitia Khusus DPRD Kabupaten Cianjur pembahas Laporan Keterangan Pertanggungjawaban (LKPJ) Bupati Tahun 2025.",
      "Pembentukan pansus ini menjadi bagian penting dalam fungsi pengawasan DPRD terhadap jalannya pemerintahan daerah. Penyampaian LKPJ merupakan bagian penting dalam sistem pemerintahan daerah sebagai bentuk pertanggungjawaban kepala daerah kepada DPRD dan masyarakat atas pelaksanaan program pembangunan selama satu tahun anggaran.",
      "“Proses evaluasi melalui LKPJ ini menjadi wujud nyata akuntabilitas pemerintah daerah. Oleh karena itu, sinergi lintas sektor sangat diperlukan dalam upaya membangun Cianjur yang lebih maju, harmonis, dan religius,” ujar Ramzi.",
      "Rapat paripurna ini diharapkan menjadi momentum penting dalam memperkuat fungsi pengawasan DPRD terhadap jalannya pemerintahan, sekaligus mendorong terciptanya kebijakan yang lebih responsif terhadap kebutuhan masyarakat Kabupaten Cianjur.",
    ],
  },
  {
    slug: "peringatan-hut-dharma-wanita-persatuan",
    judul: "Peringatan HUT Dharma Wanita Persatuan Ke-26",
    kategori: "Sekretariat",
    tanggal: "2025-12-10",
    ringkasan:
      "Anggota Dharma Wanita Persatuan Sekretariat DPRD mengikuti rangkaian kegiatan peringatan HUT ke-26.",
    gambar: "/berita/dharma-wanita-kegiatan.webp",
    gambarAlt: "Ilustrasi kegiatan kebersamaan Dharma Wanita di Cianjur",
    gambarIlustrasi: true,
    isi: [
      "Peringatan HUT Dharma Wanita Persatuan ke-26 tingkat Kabupaten Cianjur diisi dengan senam bersama, bazar, dan kegiatan sosial.",
    ],
  },
  {
    slug: "apel-ketupat-lodaya-2025",
    judul: "Apel Ketupat Lodaya 2025 di Cianjur",
    kategori: "Dewan",
    tanggal: "2025-06-11",
    ringkasan:
      "Apel kesiapsiagaan menjelang Idul Fitri melibatkan jajaran pemerintah daerah dan dewan.",
    gambar: "/berita/apel-ketupat-lodaya.webp",
    gambarAlt: "Ilustrasi apel kesiapsiagaan lintas instansi di Cianjur",
    gambarIlustrasi: true,
    isi: [
      "Apel Ketupat Lodaya digelar untuk memastikan kesiapan pelayanan publik dan keamanan selama libur Idul Fitri.",
    ],
  },
  {
    slug: "hari-lahir-pancasila",
    judul: "Peringatan Hari Lahir Pancasila Tingkat Kabupaten",
    kategori: "Dewan",
    tanggal: "2025-06-10",
    ringkasan:
      "Upacara Hari Lahir Pancasila diikuti jajaran pemerintah daerah dan pimpinan dewan.",
    gambar: "/berita/upacara-hari-pancasila.webp",
    gambarAlt: "Ilustrasi upacara peringatan Hari Lahir Pancasila",
    gambarIlustrasi: true,
    isi: [
      "Peringatan Hari Lahir Pancasila menjadi momentum memperkuat nilai kebangsaan dan pelayanan publik.",
    ],
  },
  {
    slug: "satu-abad-cianjur-berparlemen",
    judul: "1 Abad Cianjur Berparlemen",
    kategori: "Dewan",
    tanggal: "2026-01-31",
    ringkasan:
      "Refleksi perjalanan satu abad parlemen di Kabupaten Cianjur dan tantangan ke depan.",
    gambar: "/berita/satu-abad-parlemen-cianjur.webp",
    gambarAlt: "Ilustrasi ruang sidang parlemen dengan suasana peringatan bersejarah",
    gambarIlustrasi: true,
    isi: [
      "Perjalanan satu abad parlemen di Kabupaten Cianjur merupakan narasi panjang transformasi kedaulatan rakyat.",
      "Peringatan ini menjadi refleksi atas peran dewan dalam memperjuangkan aspirasi masyarakat.",
    ],
  },
  {
    slug: "rdp-komisi-i-pedagang-seger-alam",
    judul: "RDP Komisi I Bersama Pedagang Seger Alam Puncak",
    kategori: "Dewan",
    tanggal: "2026-06-22",
    ringkasan:
      "Komisi I menampung keluhan pedagang terkait penataan kawasan wisata Puncak.",
    gambar: "/berita/rdp-pedagang-puncak.webp",
    gambarAlt: "Ilustrasi dialog anggota dewan dengan pedagang kawasan Puncak",
    gambarIlustrasi: true,
    isi: [
      "Komisi I menggelar rapat dengar pendapat bersama perwakilan pedagang kawasan Seger Alam Puncak.",
      "Hasil rapat menjadi bahan koordinasi dengan perangkat daerah terkait.",
    ],
  },
  {
    slug: "koordinasi-dan-konsultasi-dprd-kota-sukabumi",
    judul: "Koordinasi dan Konsultasi Sekretariat DPRD Kota Sukabumi",
    kategori: "Sekretariat",
    tanggal: "2026-01-14",
    ringkasan:
      "Berbagi praktik pengelolaan sekretariat dan layanan informasi antara dua daerah.",
    gambar: "/berita/koordinasi-setwan-sukabumi.webp",
    gambarAlt: "Ilustrasi pertemuan koordinasi sekretariat DPRD antardaerah",
    gambarIlustrasi: true,
    isi: [
      "Sekretariat DPRD Kabupaten Cianjur menerima kunjungan koordinasi dari Sekretariat DPRD Kota Sukabumi.",
      "Pertemuan membahas tata kelola kesekretariatan dan penguatan layanan publik.",
    ],
  },
  {
    slug: "sinergitas-forkopimda-kunjungan-kapolres",
    judul: "Sinergitas Forkopimda: Kunjungan Silaturahmi Kapolres",
    kategori: "Dewan",
    tanggal: "2026-01-12",
    ringkasan:
      "Kapolres Cianjur bersilaturahmi ke jajaran pimpinan DPRD untuk memperkuat sinergi.",
    gambar: "/berita/kunjungan-kapolres-dprd.webp",
    gambarAlt: "Ilustrasi pertemuan koordinasi pimpinan daerah di Cianjur",
    gambarIlustrasi: true,
    isi: [
      "Kapolres Cianjur melaksanakan kunjungan silaturahmi ke jajaran Pimpinan DPRD Kabupaten Cianjur.",
      "Pertemuan membahas sinergi pelayanan dan keamanan daerah.",
    ],
  },
];

// ------------------------------------------------------------
// DOKUMEN — 15 item
// ------------------------------------------------------------
export const DOKUMEN: Dokumen[] = [
  { id: "d1", judul: "Perda Kabupaten Cianjur Nomor 5 Tahun 2026 tentang Keolahragaan", kategori: "Informasi", tahun: 2026, nomor: "5", ukuran: "2,1 MB", tanggal: "2026-07-22" },
  { id: "d2", judul: "Perda Kabupaten Cianjur Nomor 4 Tahun 2026 tentang Penyertaan Modal Daerah kepada PDAM Tirta Mukti", kategori: "Informasi", tahun: 2026, nomor: "4", ukuran: "1,8 MB", tanggal: "2026-07-03" },
  { id: "d3", judul: "Perda Kabupaten Cianjur Nomor 2 Tahun 2026 tentang Pemberdayaan dan Perlindungan Perempuan", kategori: "Informasi", tahun: 2026, nomor: "2", ukuran: "1,5 MB", tanggal: "2026-07-03" },
  { id: "d4", judul: "Perda Kabupaten Cianjur Nomor 1 Tahun 2026 tentang Kesehatan", kategori: "Informasi", tahun: 2026, nomor: "1", ukuran: "2,4 MB", tanggal: "2026-07-03" },
  { id: "d5", judul: "Laporan Keterangan Pertanggungjawaban (LKPJ) Bupati Tahun Anggaran 2025", kategori: "Kinerja", tahun: 2026, nomor: "LKPJ-2025", ukuran: "8,6 MB", tanggal: "2026-03-31" },
  { id: "d6", judul: "Rancangan APBD Kabupaten Cianjur Tahun Anggaran 2027", kategori: "Anggaran", tahun: 2026, nomor: "RAPBD-2027", ukuran: "12,3 MB", tanggal: "2026-09-01" },
  { id: "d7", judul: "Realisasi APBD Kabupaten Cianjur Tahun Anggaran 2025 (LRA)", kategori: "Anggaran", tahun: 2026, nomor: "LRA-2025", ukuran: "9,7 MB", tanggal: "2026-03-31" },
  { id: "d8", judul: "Ringkasan APBD Kabupaten Cianjur Tahun Anggaran 2026", kategori: "Anggaran", tahun: 2026, nomor: "APBD-2026", ukuran: "3,2 MB", tanggal: "2026-01-05" },
  { id: "d9", judul: "Laporan Kinerja DPRD Kabupaten Cianjur Tahun 2025", kategori: "Kinerja", tahun: 2026, nomor: "LAKIP-DPRD-2025", ukuran: "4,5 MB", tanggal: "2026-02-28" },
  { id: "d10", judul: "Daftar Informasi Publik DPRD Kabupaten Cianjur 2026", kategori: "PPID", tahun: 2026, nomor: "DIP-2026", ukuran: "1,2 MB", tanggal: "2026-01-15" },
  { id: "d11", judul: "Laporan Pengelolaan Aspirasi Masyarakat Triwulan II 2026", kategori: "Kinerja", tahun: 2026, nomor: "ASP-Q2-2026", ukuran: "2,8 MB", tanggal: "2026-07-10" },
  { id: "d12", judul: "Risalah Rapat Paripurna Penetapan Perda Keolahragaan", kategori: "Informasi", tahun: 2026, nomor: "RIS-05-2026", ukuran: "1,9 MB", tanggal: "2026-07-22" },
  { id: "d13", judul: "Ringkasan APBD Kabupaten Cianjur Tahun Anggaran 2025", kategori: "Anggaran", tahun: 2025, nomor: "APBD-2025", ukuran: "3,0 MB", tanggal: "2025-01-06" },
  { id: "d14", judul: "Laporan Kinerja DPRD Kabupaten Cianjur Tahun 2024", kategori: "Kinerja", tahun: 2025, nomor: "LAKIP-DPRD-2024", ukuran: "4,1 MB", tanggal: "2025-02-27" },
  { id: "d15", judul: "Standar Operasional Prosedur Layanan Informasi DPRD", kategori: "PPID", tahun: 2025, nomor: "SOP-INFO-2025", ukuran: "0,9 MB", tanggal: "2025-05-20" },
];

// ------------------------------------------------------------
// AGENDA — 10 item
// ------------------------------------------------------------
export const AGENDA: Agenda[] = [
  { id: "a1", judul: "Rapat Paripurna Penyampaian RAPBD 2027", jenis: "Paripurna", tanggal: "2026-11-10", waktu: "09:00 WIB", lokasi: "Gedung DPRD", status: "Akan datang" },
  { id: "a2", judul: "Rapat Badan Musyawarah", jenis: "Bamus", tanggal: "2026-11-03", waktu: "14:00 WIB", lokasi: "Ruang Bamus", status: "Akan datang" },
  { id: "a3", judul: "RDP Komisi II — Evaluasi Pasar Rakyat", jenis: "RDP", tanggal: "2026-10-27", waktu: "10:00 WIB", lokasi: "Ruang Komisi II", status: "Akan datang" },
  { id: "a4", judul: "Kunjungan Kerja Komisi IV ke Puskesmas", jenis: "Kunjungan Kerja", tanggal: "2026-10-20", waktu: "08:30 WIB", lokasi: "Kecamatan Kadupandak", status: "Akan datang" },
  { id: "a5", judul: "Rapat Pansus LKPJ", jenis: "Pansus", tanggal: "2026-09-15", waktu: "09:00 WIB", lokasi: "Ruang Pansus", status: "Selesai" },
  { id: "a6", judul: "Rapat Paripurna Penetapan Perda Keolahragaan", jenis: "Paripurna", tanggal: "2026-09-07", waktu: "09:00 WIB", lokasi: "Gedung DPRD", status: "Selesai" },
  { id: "a7", judul: "RDP Komisi I — Penataan Kawasan Puncak", jenis: "RDP", tanggal: "2026-06-22", waktu: "09:00 WIB", lokasi: "Ruang Komisi I", status: "Selesai" },
  { id: "a8", judul: "Rapat Dengar Pendapat Komisi III", jenis: "RDP", tanggal: "2026-01-22", waktu: "13:00 WIB", lokasi: "Ruang Komisi III", status: "Selesai" },
  { id: "a9", judul: "Rapat Badan Anggaran — Pembahasan Awal KUA-PPAS", jenis: "Banggar", tanggal: "2026-08-19", waktu: "14:00 WIB", lokasi: "Ruang Banggar", status: "Selesai" },
  { id: "a10", judul: "Reses Masa Sidang I", jenis: "Reses", tanggal: "2026-12-01", waktu: "08:00 WIB", lokasi: "6 Dapil", status: "Akan datang" },
];

// ------------------------------------------------------------
// ASPIRASI — 30 contoh (untuk statistik & panel)
// ------------------------------------------------------------
export const ASPIRASI: Aspirasi[] = [
  { id: "s1", tiket: "ASP-2026-0001", tema: "Infrastruktur jalan, jembatan & irigasi", komisi: "Komisi III", dapil: "Cianjur 3", status: "Ditindaklanjuti", tanggal: "2026-09-01", ringkas: "Jalan penghubung desa rusak berat" },
  { id: "s2", tiket: "ASP-2026-0002", tema: "Pendidikan", komisi: "Komisi IV", dapil: "Cianjur 5", status: "Diteruskan", tanggal: "2026-09-02", ringkas: "Usulan bantuan transportasi pelajar" },
  { id: "s3", tiket: "ASP-2026-0003", tema: "Pertanian, pangan & peternakan", komisi: "Komisi II", dapil: "Cianjur 2", status: "Dibahas", tanggal: "2026-09-03", ringkas: "Kelangkaan pupuk bersubsidi" },
  { id: "s4", tiket: "ASP-2026-0004", tema: "Kesehatan", komisi: "Komisi IV", dapil: "Cianjur 1", status: "Ditindaklanjuti", tanggal: "2026-09-05", ringkas: "Penambahan jam layanan puskesmas" },
  { id: "s5", tiket: "ASP-2026-0005", tema: "Lingkungan hidup & persampahan", komisi: "Komisi III", dapil: "Cianjur 4", status: "Diverifikasi", tanggal: "2026-09-06", ringkas: "Pengelolaan sampah pasar belum optimal" },
  { id: "s6", tiket: "ASP-2026-0006", tema: "UMKM, koperasi, perindustrian & perdagangan", komisi: "Komisi II", dapil: "Cianjur 1", status: "Diteruskan", tanggal: "2026-09-08", ringkas: "Pendampingan sertifikasi UMKM" },
  { id: "s7", tiket: "ASP-2026-0007", tema: "Infrastruktur jalan, jembatan & irigasi", komisi: "Komisi III", dapil: "Cianjur 6", status: "Diterima", tanggal: "2026-09-09", ringkas: "Jembatan desa perlu perbaikan" },
  { id: "s8", tiket: "ASP-2026-0008", tema: "Sosial & kemiskinan", komisi: "Komisi IV", dapil: "Cianjur 5", status: "Dibahas", tanggal: "2026-09-10", ringkas: "Verifikasi DTKS belum merata" },
  { id: "s9", tiket: "ASP-2026-0009", tema: "Kesehatan", komisi: "Komisi IV", dapil: "Cianjur 3", status: "Ditindaklanjuti", tanggal: "2026-09-11", ringkas: "Ketersediaan obat di puskesmas" },
  { id: "s10", tiket: "ASP-2026-0010", tema: "Pemerintahan desa & pemberdayaan masyarakat", komisi: "Komisi I", dapil: "Cianjur 2", status: "Diteruskan", tanggal: "2026-09-12", ringkas: "Pendampingan administrasi dana desa" },
  { id: "s11", tiket: "ASP-2026-0011", tema: "Infrastruktur jalan, jembatan & irigasi", komisi: "Komisi III", dapil: "Cianjur 1", status: "Ditutup", tanggal: "2026-08-01", ringkas: "Drainase jalan protokol" },
  { id: "s12", tiket: "ASP-2026-0012", tema: "Pendidikan", komisi: "Komisi IV", dapil: "Cianjur 4", status: "Ditutup", tanggal: "2026-08-03", ringkas: "Ruang kelas rusak" },
  { id: "s13", tiket: "ASP-2026-0013", tema: "Pertanian, pangan & peternakan", komisi: "Komisi II", dapil: "Cianjur 5", status: "Ditindaklanjuti", tanggal: "2026-08-05", ringkas: "Irigasi tersier petani Pandanwangi" },
  { id: "s14", tiket: "ASP-2026-0014", tema: "Perhubungan", komisi: "Komisi III", dapil: "Cianjur 3", status: "Dibahas", tanggal: "2026-08-07", ringkas: "Angkutan umum jalur selatan" },
  { id: "s15", tiket: "ASP-2026-0015", tema: "Kesehatan", komisi: "Komisi IV", dapil: "Cianjur 6", status: "Diteruskan", tanggal: "2026-08-09", ringkas: "Posyandu kekurangan kader" },
  { id: "s16", tiket: "ASP-2026-0016", tema: "Energi, SDA & air minum", komisi: "Komisi III", dapil: "Cianjur 4", status: "Ditindaklanjuti", tanggal: "2026-08-11", ringkas: "Air bersih desa belum merata" },
  { id: "s17", tiket: "ASP-2026-0017", tema: "Pemuda, olahraga & kebudayaan", komisi: "Komisi IV", dapil: "Cianjur 1", status: "Ditutup", tanggal: "2026-08-13", ringkas: "Fasilitas olahraga warga" },
  { id: "s18", tiket: "ASP-2026-0018", tema: "UMKM, koperasi, perindustrian & perdagangan", komisi: "Komisi II", dapil: "Cianjur 2", status: "Dibahas", tanggal: "2026-08-15", ringkas: "Pasar rakyat perlu revitalisasi" },
  { id: "s19", tiket: "ASP-2026-0019", tema: "Lingkungan hidup & persampahan", komisi: "Komisi III", dapil: "Cianjur 5", status: "Diteruskan", tanggal: "2026-08-17", ringkas: "TPA dan pengelolaan limbah" },
  { id: "s20", tiket: "ASP-2026-0020", tema: "Sosial & kemiskinan", komisi: "Komisi IV", dapil: "Cianjur 3", status: "Ditindaklanjuti", tanggal: "2026-08-19", ringkas: "Bantuan sosial tepat sasaran" },
  { id: "s21", tiket: "ASP-2026-0021", tema: "Infrastruktur jalan, jembatan & irigasi", komisi: "Komisi III", dapil: "Cianjur 6", status: "Dibahas", tanggal: "2026-07-02", ringkas: "Jalan usaha tani" },
  { id: "s22", tiket: "ASP-2026-0022", tema: "Pendidikan", komisi: "Komisi IV", dapil: "Cianjur 2", status: "Ditutup", tanggal: "2026-07-04", ringkas: "Beasiswa siswa berprestasi" },
  { id: "s23", tiket: "ASP-2026-0023", tema: "Pertanian, pangan & peternakan", komisi: "Komisi II", dapil: "Cianjur 4", status: "Ditindaklanjuti", tanggal: "2026-07-06", ringkas: "Harga gabah saat panen" },
  { id: "s24", tiket: "ASP-2026-0024", tema: "Kesehatan", komisi: "Komisi IV", dapil: "Cianjur 1", status: "Diteruskan", tanggal: "2026-07-08", ringkas: "Layanan rujukan BPJS" },
  { id: "s25", tiket: "ASP-2026-0025", tema: "Tata ruang, perumahan & permukiman", komisi: "Komisi III", dapil: "Cianjur 3", status: "Dibahas", tanggal: "2026-07-10", ringkas: "Kawasan kumuh perkotaan" },
  { id: "s26", tiket: "ASP-2026-0026", tema: "Pemerintahan desa & pemberdayaan masyarakat", komisi: "Komisi I", dapil: "Cianjur 5", status: "Ditutup", tanggal: "2026-07-12", ringkas: "Pelatihan aparatur desa" },
  { id: "s27", tiket: "ASP-2026-0027", tema: "UMKM, koperasi, perindustrian & perdagangan", komisi: "Komisi II", dapil: "Cianjur 6", status: "Ditindaklanjuti", tanggal: "2026-07-14", ringkas: "Akses permodalan UMKM" },
  { id: "s28", tiket: "ASP-2026-0028", tema: "Kesehatan", komisi: "Komisi IV", dapil: "Cianjur 2", status: "Diterima", tanggal: "2026-09-20", ringkas: "Stunting dan gizi anak" },
  { id: "s29", tiket: "ASP-2026-0029", tema: "Infrastruktur jalan, jembatan & irigasi", komisi: "Komisi III", dapil: "Cianjur 4", status: "Diverifikasi", tanggal: "2026-09-22", ringkas: "Lampu penerangan jalan" },
  { id: "s30", tiket: "ASP-2026-0030", tema: "Pariwisata & ekonomi kreatif", komisi: "Komisi II", dapil: "Cianjur 3", status: "Diterima", tanggal: "2026-09-25", ringkas: "Promosi wisata desa" },
];

export const STATISTIK_PENGUNJUNG = {
  hariIni: 342,
  mingguIni: 2140,
  bulanIni: 8965,
  total: 24150,
};
