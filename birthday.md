# 🌸 Ringkasan Sistem Desain & Arsitektur Web Ulang Tahun Finda Meliana Putri (Chapter 23)

Dokumen ini merangkum seluruh arsitektur, sistem desain, skema warna, animasi 3D Three.js Extruded Hearts, serta panduan deployment ke **Vercel** untuk aplikasi web ulang tahun **Finda Meliana Putri (Chapter 23 • Ethereal Celebration)**.

---

## 🎨 1. Design System & Palette Warna

Aplikasi ini mengusung estetika **"Ethereal Celebration" (Modern, Cute, Glassmorphic, dan Clean)** yang memberikan impresi mewah, hangat, dan personal tanpa terasa seperti template AI yang kaku.

### 💖 Color Palette (Tailwind v4 Theme Tokens)
- **Background Utama**: `#FFF5FA` (Soft Blush Pink)
- **Pastel Pink**: `#FFD1DC` (Accent Light), `#FFB6C1` (Mid Tone), `#FF69B4` (Pastel Rose Accent)
- **Rose & Deep Pink**: `#E91E63` (Primary Dark), `#FCE4EC` (Card Soft Glow)
- **Warm Gold**: `#FFD700` (Sparkle & Badge Accent)
- **Soft Lavender**: `#E1BEE7` (Secondary Accent)
- **Twilight Night**: `slate-950` to `purple-950` (Section Lampion Harapan)

---

## ✒️ 2. Tipografi & Hierarki Font

Menggabungkan empat jenis huruf Google Fonts untuk hierarki visual yang seimbang:

1. **Plus Jakarta Sans (Body Text)**: Digunakan untuk teks deskripsi utama agar sangat bersih dan mudah dibaca (*clean & modern*).
2. **Poppins (UI Elements)**: Digunakan untuk tombol, label kuis, dan elemen navigasi.
3. **Playfair Display (Serif)**: Digunakan untuk semua judul utama (`h1`, `h2`, `h3`, `.font-heading`) memberikan kesan elegan "Chapter 23".
4. **Dancing Script (Cursive / Handwriting)**: Digunakan untuk kutipan, ucapan surat, dan teks polaroid (`.font-script`) memberikan sentuhan personal hangat dari sahabat.

---

## 💎 3. Latar Belakang 3D Extruded Hearts (`ParticleCanvas.tsx`)

Aplikasi ini menggunakan **Three.js WebGL Engine** khusus yang merender **3D Extruded Hearts Mesh**:
- **Geometri**: `THREE.ExtrudeGeometry` buatan khusus dengan kurva Bezier hati 3D timbul.
- **Material**: `THREE.MeshPhongMaterial` dengan pencahayaan spekular berkilau (*shininess: 90*).
- **Variasi Warna**: 5 warna pastel (`0xFFB6C1`, `0xFF69B4`, `0xE91E63`, `0xE1BEE7`, `0xFFD700`).
- **Interaksi**: Merespon pergerakan kursor mouse dengan efek rotasi paralaks halus, melayang ke atas (*upward float loop*), serta perputaran 3D yang dinamis.

---

## 🚀 4. Komponen Utama & Fitur Interaktif

### 1. **Bottom Floating Blurred Dock Navbar (`Navbar.tsx`)**
- **Posisi**: `fixed bottom-4 left-1/2 -translate-x-1/2 z-50`
- **Gaya**: Glassmorphism melayang (`backdrop-blur-xl bg-white/80 border border-white/90 shadow-dock rounded-full`)
- **Fitur**: Brand pill "Finda 23th 🌸", navigasi cepat 8 section, pemutar lagu Happy Birthday, pengatur suara (SFX Mute), dan tombol selebrasi konfeti.

### 2. **Hero Section (`HeroSection.tsx`)**
- **Kalkulasi Usia & Chapter 23**: Menghitung usia Finda secara otomatis (2026 - 2003 = **Usia 23 Tahun / Chapter 23**).
- **Elemen**: Badge "Chapter 23 • Finda's Milestone 🎂", "Ethereal Celebration ✨", foto polaroid bergaris selotip imut, dan tombol aksi selebrasi.

### 3. **Galeri Polaroid Estetik (`PhotoGallery.tsx`)**
- **Media**: Memuat 8 foto asli dari `src/assets/finda-1.jpeg` s/d `src/assets/finda-8.jpeg`.
- **Gaya**: Scrapbook polaroid dengan kemiringan acak (`-rotate-2`, `rotate-3`), selotip pastel motif, badge lokasi, dan penghitung reaksi Love.
- **Lightbox**: Fitur popup gambar besar dengan deskripsi dan tombol love interaktif.

### 4. **Kue Ulang Tahun 100% CSS/SVG & 1 Lilin Tunggal (`BirthdayCake.tsx`)**
- **Desain**: Ilustrasi kue bertingkat 3 buatan CSS & SVG murni (layer strawberry, vanila, dan red velvet lengkap dengan krim lelehan manis & buah ceri).
- **Lilin & Api Realistis**: 1 lilin tunggal berornamen pita emas dengan animasi api menyala realistis berlapis (inti putih-kuning, aura amber glow, partikel spark, dan efek asap saat padam).

### 5. **Kotak Kado & Hadiah Kejutan (`UnwrapGifts.tsx`)**
- **Desain**: Kartu kado 3D pita warna-warni dengan animasi pembukaan pita, potongan konfeti, dan rincian voucher spesial sahabat.

### 6. **Galeri Kenangan & Apresiasi (`MemoriesGallery.tsx`)**
- Apresiasi kebaikan hati, kepribadian, dan perjuangan Finda dengan filter kategori dan tombol tambah cinta.

### 7. **Kuis Sahabat Terbaik (`FindaQuiz.tsx`)**
- 5 pertanyaan kuis seputar Finda (tanggal lahir, sifat favorit, hal menyenangkan) lengkap dengan sertifikat kelulusan.

### 8. **Lampion Doa & Harapan (`WishLanterns.tsx`)**
- **Latar Belakang**: Malam pastel *twilight* bernuansa lavender-indigo.
- **Interaksi**: Lampion bersinar yang melayang tinggi di mana pesan ucapan dapat diklik dan dibaca, serta form menerbangkan lampion baru.

### 9. **Surat Ulang Tahun Spesial (`SecretLetter.tsx`)**
- Amplop bersampul lilin merah yang dapat dibuka-tutup dengan animasi lipatan surat tulisan tangan yang tulus.

### 10. **Floating Hearts Micro-Animations (`FloatingHearts.tsx`)**
- Partikel emoji Love, bunga sakura, dan cahaya (💖 🌸 ✨ 💕 🌷 🎈) yang melayang perlahan ke atas.

---

## 🎵 5. Audio Synthesizer (`sound.ts`)

Menggunakan Web Audio API murni (tanpa file audio eksternal) untuk performa cepat dan suara jernih:
- **Pop Sound**: Efek klik tombol.
- **Sparkle Sound**: Efek gemerincing chimes saat membuka hadiah/lampion.
- **Blow Sound**: Suara tiupan angin saat lilin mati.
- **Fanfare**: Melodi selebrasi konfeti.
- **Happy Birthday BGM**: Synthesizer musik box lagu *Happy Birthday To You* 4 baris penuh dengan harmoni dua oktav.

---

## ☁️ 6. Panduan Deployment ke Vercel

Proyek ini telah siap untuk dideploy ke **Vercel** secara gratis dan instan:

1. Push folder proyek `FINDA-BIRTHDAY` ke akun **GitHub** Anda.
2. Masuk ke [vercel.com](https://vercel.com/) dan impor repositori.
3. Vercel akan otomatis mengenali preset **Vite** (`npm run build` $\rightarrow$ `dist`).
4. Klik **Deploy** dan website siap diakses di domain Vercel gratis!

---

*Dibuat khusus untuk perayaan Chapter 23 Ulang Tahun Finda Meliana Putri dengan penuh kasih dari sahabat terbaik.* 💕✨
