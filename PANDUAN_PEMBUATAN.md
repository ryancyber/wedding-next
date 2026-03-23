# Panduan Pembuatan Web Undangan Pernikahan (Bugis Theme)

Dokumen ini menjelaskan tahapan lengkap bagaimana website undangan pernikahan ini dibangun langkah demi langkah berdasarkan kode yang telah ditulis. Panduan ini dibuat agar Anda mudah memahami logika di balik fungsionalitas dan tampilan estetika yang ada.

---

## Tahap 1: Konfigurasi Dasar dan Tema Global
Pada tahap awal, kita menyiapkan fondasi warna dan jenis huruf (tipografi) yang akan digunakan di seluruh halaman (Tema khas Bugis: Merah Maroon & Emas).

*   **File yang dimodifikasi**: `app/globals.css`
*   **Penjelasan**: 
    - Kita menggunakan Tailwind CSS versi 4 (`@import "tailwindcss"`).
    - Variabel warna inti seperti `--bugis-red` (`#5c141d`), `--bugis-gold` (`#deaf5c`), dan `--bugis-dark` (`#3a0d11`) dideklarasikan di `:root`.
    - Kita menyematkan warna dan jenis font ini ke Tailwind menggunakan direktif `@theme inline` agar bisa dipanggil semudah `bg-[#5c141d]` atau `text-[#deaf5c]`.
    - Kita juga menambahkan *utility* `.no-scrollbar` untuk menyembunyikan garis gulir bawaan browser.

## Tahap 2: Pengaturan Font Estetik (Tipografi)
Website undangan yang elegan membutuhkan font klasik (serif) dan font miring/kaligrafi (script) yang indah.

*   **File yang dimodifikasi**: `app/layout.tsx`
*   **Penjelasan**: 
    - Menggunakan fitur `next/font/google` untuk memuat **Playfair Display** (sebagai font serif utama untuk sub-judul) dan **Dancing Script** (sebagai font kaligrafi estetis untuk nama mempelai & judul utama).
    - Font ini dimuat secara optimal tanpa membuat halaman lambat, lalu kita suntikkan variabel kembaliannya ke dalam tag `<body>` agar seluruh website bisa menggunakannya (`font-serif` dan `font-script`).

## Tahap 3: Pembuatan Latar Belakang 3D (Particle/Bintang)
Untuk memberikan kesan halaman yang "hidup" dan interaktif layaknya presentasi kelas atas, kita menggunakan `Three.js` (React Three Fiber).

*   **File yang dibuat**: `components/ParticleBackground.tsx`
*   **Penjelasan**: 
    - Menggunakan library `@react-three/fiber` dan `@react-three/drei`.
    - Kita membuat komponen `<RotatingStars />` yang men-generate 5000 partikel bintang secara acak yang bergerak/berotasi terus-menerus melalui *hook* `useFrame`.
    - Latar belakang ini dilapisi transparan (`opacity-40`) dan `pointer-events-none` (tidak menutupi klik tombol lain) agar berada tepat di belakang UI undangan.

## Tahap 4: Logika API Buku Tamu (Guestbook Tanpa Database)
Undangan pernikahan biasanya butuh database (seperti MySQL/PostgreSQL) untuk menyimpan ucapan. Demi mempermudah, kita menggunakan **Next.js API Routes** agar ucapannya tersimpan dalam bentuk file (JSON) di server.

*   **File yang dibuat**: `app/api/wishes/route.ts` & file data `wishes.json`
*   **Penjelasan**:
    - **GET Method**: Membaca file `wishes.json` menggunakan library `fs/promises` dan mengembalikan data dalam format JSON ke Client.
    - **POST Method**: Menerima input dari pengunjung (`name`, `message`, `attendance`), menambahkan ID unik & timestamp, lalu menyimpannya kembali ke file JSON.
    - **Client-side Fetch**: Di `app/page.tsx`, kita mengganti logika `localStorage` dengan perintah `fetch('/api/wishes')` agar data ucapan bersifat global bagi semua pengunjung, bukan sekadar tersimpan di browser masing-masing.

## Tahap 5: Menyusun Tampilan Utama (Interaksi UI & Animasi)
Pekerjaan terbesar terjadi di halaman utama yang merangkum semua elemen mulai dari sapaan bingkai hingga bagian akhir (Buku Tamu). Kita menggunakan library animasi **Framer Motion** untuk melengkapi semua interaksi pergerakan.

*   **File yang dimodifikasi**: `app/page.tsx`
*   **Penjelasan**:
    1.  **State Management**: Menggunakan `useState` murni React untuk melacak status musik berjalan (`isPlaying`), menu undangan sudah dibuka (`isOpened`), status pengiriman buku tamu, dan data Hitung Mundur.
    2.  **Audio Background**: Elemen `<audio>` HTML dimuat secara tersembunyi. Saat tombol "Buka Undangan" diklik, fungsi `playMusic()` akan dipanggil dan latar visual pun ikut terangkat.
    3.  **Cover Transition**: Animasi tombol *"Buka Undangan"* yang mengangkat layar pembuka ke atas (`exit={{ y: "-100%" }}`).
    4.  **Floating Navigation**: Memanfaatkan library **Lucide React** (Ikon), panel navigasi (Home, Couple, Event, dsb) dimunculkan di bagian bawah (`fixed bottom`).
    5.  **Scroll Animations & Decorative Borders**: Di setiap bagian (*Section*), kita melampirkan blok `<motion.div>` dengan konfigurasi `whileInView`. Estetika diperkuat dengan penambahan **SVG Zig-zag Border** (`path d="M0 20 L10 10 L20 20 L30 10 L40 20"`) pada bagian bawah setiap section untuk memberikan nuansa pola etnik Bugis yang khas.
    6.  **Wedding Gift Toggle**: Fitur salin nomor rekening menggunakan `navigator.clipboard.writeText(...)` pada kartu Bank (BCA & BRI).

## Tahap 6: Persiapan Deployment (GitHub Pages)
Agar website undangan ini bisa diakses publik (online) melalui layanan **GitHub Pages**, kita perlu melakukan pengaturan build statis karena GitHub Pages tidak memiliki server Node.js khusus.

*   **File yang dimodifikasi**: `next.config.ts` dan `app/page.tsx`
*   **Penjelasan**:
    - Di `next.config.ts`, kita menyalakan `output: 'export'` agar Next.js membungkus proyek menjadi murni HTML/CSS/JS statis, menghilangkan beban server rendering.
    - Menambahkan `basePath: '/wedding-next'` untuk menyelaraskan tautan karena di GitHub URL yang tercipta adalah format `namaanda.github.io/wedding-next/`.
    - Mengaktifkan `images: { unoptimized: true }` karena optimasi aset rasio gambar dari Vercel internal tidak didukung di file statis biasa.
    - Di dalam `app/page.tsx`, path musik `"/JOKOWI - SEVENTEEN JKT48 (COVER AI).mp3"` ditambahkan *prefix* `basePath` menjadi `"/wedding-next/JOKOWI..."`. Tanpa tambahan `/wedding-next/` ini, browser akan tersesat mencari musik di `github.io/JOKOWI...` alih-alih di folder spesifik repo.

---
### Ringkasan Konsep:
Secara keseluruhan sistem bekerja sebagai *Client Component* (`"use client"`) penuh karena sarat akan pergerakan Mouse, Sensor Scroll, Audio, Interaksi Form, serta Render DOM Three.js yang sifatnya sangat responsif di perangkat manapun.
