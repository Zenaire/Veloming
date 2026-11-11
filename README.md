# 🚴 Veloming - Platform Pelaporan Fasilitas Publik

**Veloming** adalah platform pelaporan fasilitas publik yang modern, cepat, dan transparan. Aplikasi ini memungkinkan masyarakat untuk melaporkan kerusakan atau kendala fasilitas umum, memantau progres penanganan secara *real-time*, serta melihat daftar laporan publik terkini dalam satu antarmuka yang responsif.

---

## ✨ Fitur Utama

- **🏠 Beranda Interaktif**: Halaman utama dengan pengenalan platform, alur 3 langkah pelaporan, dan statistik transparansi publik.
- **📝 Buat Laporan**:
  - Formulir pelaporan dengan validasi otomatis.
  - Dropdown pemilihan kategori modern (Infrastruktur Jalan, Penerangan Jalan, Kebersihan & Sampah, Drainase & Saluran Air, Fasilitas Umum, Lainnya).
  - Unggah foto pendukung.
  - Modal konfirmasi sukses dengan fitur salin ID Laporan ke clipboard dalam satu klik.
- **🔍 Lacak Laporan**:
  - Penelusuran instan status laporan berdasarkan ID (contoh: `VLM-2026-042`).
  - Kartu visual progres laporan (*stepper*) interaktif dengan status: `Diterima`, `Diproses`, `Selesai`, atau `Ditolak` (disertai alasan penolakan).
  - **Laporan Publik Terkini**: Daftar tiket laporan publik yang otomatis terurut dari ID terbaru (terbesar) di posisi paling atas.
- **📱 Desain Responsif**: Tampilan optimal di perangkat **Desktop**, **Tablet**, dan **Mobile (Ponsel)**.
- **💾 Local Storage Persistence**: Seluruh laporan yang dibuat tersimpan secara otomatis di peramban pengguna.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Cara Menjalankan Proyek

Pastikan di komputer Anda sudah terpasang **Node.js** (versi 18 ke atas) dan **Git**.

### 1. Clone Repository
Buka terminal dan jalankan perintah:
```bash
git clone https://github.com/username/veloming.git
cd Veloming
```
*(Ganti URL git di atas dengan URL repository Anda)*

### 2. Install Dependensi
Pasang semua paket yang dibutuhkan:
```bash
npm install
```

### 3. Jalankan Server Pengembangan
Nyalakan local development server:
```bash
npm run dev
```

Setelah perintah di atas berjalan, buka browser dan akses:
```
http://localhost:5173
```

Aplikasi Veloming siap digunakan! 🎉

---

## 📦 Build untuk Produksi (Opsional)

Jika ingin mengompilasi aplikasi untuk kebutuhan deployment:
```bash
# Kompilasi aplikasi ke folder dist
npm run build

# Menjalankan preview dari hasil build
npm run preview
```

---

## 📁 Struktur Direktori

```text
Veloming/
├── public/                 # Static assets (logo, ikon)
├── src/
│   ├── assets/             # Aset gambar & ilustrasi SVG
│   ├── components/
│   │   ├── common/         # Komponen UI umum (Button, TicketView, TicketCard, Logo)
│   │   └── layout/         # Komponen navigasi (Navbar, Footer, Layout)
│   ├── constants/          # Token warna & kategori masalah
│   ├── pages/              # Halaman web (Home, Report, Track)
│   ├── services/           # Pengelolaan data & penyimpanan localStorage
│   ├── types/              # Definisi interface TypeScript
│   ├── App.tsx             # Pengaturan router halaman
│   ├── index.css           # Styling dasar & Tailwind CSS
│   └── main.tsx            # Entry point aplikasi
├── package.json            # Konfigurasi dependensi & scripts
├── README.md               # Dokumentasi proyek
└── vite.config.ts          # Konfigurasi Vite
```

---

## 👥 Lisensi
© 2026 Veloming - Platform Pelaporan Warga dan Transparansi Publik.
