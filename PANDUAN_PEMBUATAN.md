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
Undangan pernikahan biasanya butuh database (seperti MySQL/PostgreSQL) untuk menyimpan ucapan. Demi mempermudah, kita meretas cara ini agar ucapannya tersimpan dalam bentuk file (JSON) lokal.

*   **File yang dibuat**: `app/api/wishes/route.ts` & file data `wishes.json`
*   **Penjelasan**:
    - **GET Method**: Saat pengunjung membuka undangan, Next.js akan membaca isi `wishes.json` memakai perintah `fs.readFileSync`.
    - **POST Method**: Saat pengunjung mengirim ucapan, server menerima pesan tersebut (`name`, `message`, `attendance`), menambahkan ID unik, kemudian merombak file `wishes.json` secara otomatis untuk menyimpan pesan baru (`fs.writeFileSync`).

## Tahap 5: Menyusun Tampilan Utama (Interaksi UI & Animasi)
Pekerjaan terbesar terjadi di halaman utama yang merangkum semua elemen mulai dari sapaan bingkai hingga bagian akhir (Buku Tamu). Kita menggunakan library animasi **Framer Motion** untuk melengkapi semua interaksi pergerakan.

*   **File yang dimodifikasi**: `app/page.tsx`
*   **Penjelasan**:
    1.  **State Management**: Menggunakan `useState` murni React untuk melacak status musik berjalan (`isPlaying`), menu undangan sudah dibuka (`isOpened`), status pengiriman buku tamu, dan data Hitung Mundur (Hari/Jam/Menit/Detik).
    2.  **Audio Background**: Elemen `<audio>` HTML dimuat secara tersembunyi. Saat tombol "Buka Undangan" diklik, fungsi `playMusic()` akan dipanggil dan latar visual pun ikut terangkat.
    3.  **Cover Transition**: Kita menset animasi pada tombol *"Buka Undangan"* di mana saat ditekan, layar pembuka akan melaju ke atas (`exit={{ y: "-100%" }}`) memisahkan diri seperti tirai secara halus.
    4.  **Floating Navigation**: Memanfaatkan library **Lucide React** (Ikon), panel navigasi (Home, Couple, Event, dsb) dimunculkan menetap di bawah (`fixed bottom`) jika layar sudah dibuka.
    5.  **Scroll Animations (3D Feeling)**: Di setiap bagian (*Section*), kita melampirkan blok `<motion.div>` dengan konfigurasi `whileInView`. Efek canggih seperti `scale`, `filter: blur(10px)`, `rotateX` aktif secara otomatis jika bagian itu dilihat (di-scroll) oleh mata pengunjung. Layar ini menghidupkan font warna putih-gading atau krem (*Off-white* / `#f9f5f0`).
    6.  **Wedding Gift Toggle**: Pada kartu Bank (BCA & BRI), ditambahkan fungsi bawaan browser modern, yakni `navigator.clipboard.writeText(...)` untuk memunculkan teks rekening yang segera disalin saat tombol *Salin* ditekan, diakhiri dengan peringatan sukses (`alert()`).

---
### Ringkasan Konsep:
Secara keseluruhan sistem bekerja sebagai *Client Component* (`"use client"`) penuh karena sarat akan pergerakan Mouse, Sensor Scroll, Audio, Interaksi Form, serta Render DOM Three.js yang sifatnya sangat responsif di perangkat manapun.
