# React + TypeScript + Vite

React + Vite

Template ini menyediakan konfigurasi awal yang sederhana untuk membangun aplikasi React menggunakan Vite. Template dirancang agar proses pengembangan dapat dimulai dengan cepat, sekaligus menyediakan fitur Hot Module Replacement (HMR) dan konfigurasi dasar Oxlint untuk membantu menjaga kualitas kode.

Dengan template ini, Anda dapat langsung membuat komponen React, menjalankan development server, serta mendapatkan pembaruan pada browser secara otomatis ketika kode diubah.

Fitur Utama

Template ini sudah menyediakan beberapa fitur utama:

React — digunakan sebagai library utama untuk membangun antarmuka pengguna.
Vite — digunakan sebagai build tool dan development server yang cepat.
Hot Module Replacement (HMR) — memungkinkan perubahan kode ditampilkan secara langsung tanpa harus melakukan reload halaman secara manual.
Oxlint — digunakan untuk melakukan pemeriksaan kode (linting) dan membantu menemukan potensi masalah dalam source code.
Plugin React resmi — menyediakan integrasi React dengan Vite melalui pilihan compiler yang berbeda.
Plugin React yang Tersedia

Saat ini terdapat dua plugin React resmi yang dapat digunakan dalam template ini. Keduanya memiliki tujuan yang sama, yaitu mengintegrasikan React dengan Vite, tetapi menggunakan teknologi compiler yang berbeda.

1. @vitejs/plugin-react

Plugin ini menggunakan Oxc sebagai bagian dari proses transformasi kode.

Oxc merupakan kumpulan tool JavaScript dan TypeScript yang ditulis menggunakan Rust dan dirancang untuk memberikan performa tinggi.

Dokumentasi dan source code plugin:

{"fallbackMarkdown":"@vitejs/plugin-react di GitHub","reference":{"matched_text":"","prefix":null,"start_idx":1884,"end_idx":1996,"safe_urls":[],"refs":[],"alt":"@vitejs/plugin-react di GitHub","prompt_text":"@vitejs/plugin-react di GitHub","type":"url","item":{"title":"@vitejs/plugin-react di GitHub","url":"https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react?utm_source=chatgpt.com","attribution":"github.com","pub_date":null,"snippet":null,"attribution_segments":null,"supporting_websites":null,"refs":[],"hue":null,"attributions":null},"layout":null,"title":"@vitejs/plugin-react di GitHub","logo":null},"showLoginRequiredCard":false}

Informasi lebih lanjut mengenai Oxc:

{"fallbackMarkdown":"Dokumentasi Oxc
","reference":{"matched_text":"","prefix":null,"start_idx":2036,"end_idx":2073,"safe_urls":[],"refs":[],"alt":"Dokumentasi Oxc
","prompt_text":"Dokumentasi Oxc
","type":"url","item":{"title":"Dokumentasi Oxc","url":"https://oxc.rs/?utm_source=chatgpt.com","attribution":"oxc.rs","pub_date":null,"snippet":null,"attribution_segments":null,"supporting_websites":null,"refs":[],"hue":null,"attributions":null},"layout":null,"title":"Dokumentasi Oxc","logo":null},"showLoginRequiredCard":false}

2. @vitejs/plugin-react-swc

Plugin ini menggunakan SWC sebagai compiler untuk memproses kode React.

SWC merupakan compiler JavaScript/TypeScript berbasis Rust yang dikenal memiliki performa tinggi dan dapat digunakan sebagai alternatif terhadap toolchain JavaScript tradisional.

Dokumentasi dan source code plugin:

{"fallbackMarkdown":"@vitejs/plugin-react-swc di GitHub","reference":{"matched_text":"","prefix":null,"start_idx":2404,"end_idx":2524,"safe_urls":[],"refs":[],"alt":"@vitejs/plugin-react-swc di GitHub","prompt_text":"@vitejs/plugin-react-swc di GitHub","type":"url","title":"@vitejs/plugin-react-swc di GitHub","item":{"title":"@vitejs/plugin-react-swc di GitHub","url":"https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc?utm_source=chatgpt.com","attribution":"github.com","pub_date":null,"snippet":null,"attribution_segments":null,"supporting_websites":null,"refs":[],"hue":null,"attributions":null},"layout":null,"logo":null},"showLoginRequiredCard":false}

Informasi lebih lanjut mengenai SWC:

{"fallbackMarkdown":"Dokumentasi SWC
","reference":{"matched_text":"","prefix":null,"start_idx":2564,"end_idx":2601,"safe_urls":[],"refs":[],"alt":"Dokumentasi SWC
","prompt_text":"Dokumentasi SWC
","type":"url","item":{"title":"Dokumentasi SWC","url":"https://swc.rs/?utm_source=chatgpt.com","attribution":"swc.rs","pub_date":null,"snippet":null,"attribution_segments":null,"supporting_websites":null,"refs":[],"hue":null,"attributions":null},"layout":null,"title":"Dokumentasi SWC","logo":null},"showLoginRequiredCard":false}

Secara umum, Anda cukup memilih salah satu plugin tersebut sesuai kebutuhan project. Tidak perlu menggunakan keduanya secara bersamaan.

React Compiler

React Compiler belum diaktifkan secara default pada template ini.

Alasannya adalah React Compiler dapat memberikan dampak tambahan terhadap performa proses development maupun build, terutama karena compiler melakukan analisis dan transformasi terhadap kode React.

Untuk project sederhana atau tahap awal pengembangan, konfigurasi default tanpa React Compiler biasanya sudah cukup.

Jika project Anda membutuhkan React Compiler, Anda dapat mengaktifkannya dengan mengikuti dokumentasi resmi React:

{"fallbackMarkdown":"React Compiler — Installation
","reference":{"matched_text":"","prefix":null,"start_idx":3267,"end_idx":3354,"safe_urls":[],"refs":[],"alt":"React Compiler — Installation
","prompt_text":"React Compiler — Installation
","type":"url","item":{"title":"React Compiler — Installation","url":"https://react.dev/learn/react-compiler/installation?utm_source=chatgpt.com","attribution":"react.dev","pub_date":null,"snippet":null,"attribution_segments":null,"supporting_websites":null,"refs":[],"hue":null,"attributions":null},"layout":null,"title":"React Compiler — Installation","logo":null},"showLoginRequiredCard":false}

Sebelum mengaktifkan React Compiler, sebaiknya pertimbangkan kebutuhan aplikasi dan dampaknya terhadap waktu development serta proses build.

Memperluas Konfigurasi Oxlint

Template ini juga menyediakan konfigurasi dasar Oxlint untuk membantu melakukan pemeriksaan terhadap source code.

Untuk project production yang lebih besar dan kompleks, disarankan untuk menggunakan aturan linting yang lebih lengkap, termasuk type-aware linting.

Type-aware linting memungkinkan linter melakukan pemeriksaan yang mempertimbangkan informasi tipe dari kode TypeScript. Dengan demikian, beberapa jenis kesalahan yang tidak dapat dideteksi hanya melalui pemeriksaan sintaks atau pola kode dapat ditemukan lebih awal.

Mengaktifkan Type-Aware Linting

Jika project menggunakan TypeScript dan membutuhkan pemeriksaan yang lebih mendalam, Anda dapat memasang oxlint-tsgolint.

Setelah package tersebut dipasang, konfigurasi .oxlintrc.json perlu disesuaikan agar aturan type-aware dapat digunakan.

Contoh alur konfigurasinya:

Install oxlint-tsgolint sebagai dependency development.
Buka file .oxlintrc.json.
Tambahkan konfigurasi yang diperlukan untuk mengaktifkan type-aware linting.
Jalankan Oxlint kembali untuk memastikan konfigurasi berjalan dengan benar.
Perbaiki warning atau error yang ditemukan sebelum melakukan build production.

Penggunaan type-aware linting sangat disarankan untuk aplikasi production yang menggunakan TypeScript karena dapat membantu meningkatkan konsistensi, keamanan, dan kualitas source code.

Rekomendasi Penggunaan

Untuk project React sederhana, Anda dapat menggunakan konfigurasi bawaan template tanpa melakukan perubahan besar.

Untuk aplikasi yang akan digunakan di production, pertimbangkan untuk:

Menggunakan TypeScript untuk meningkatkan keamanan tipe.
Mengaktifkan aturan Oxlint yang lebih ketat.
Menggunakan type-aware linting jika project menggunakan TypeScript.
Mengevaluasi kebutuhan React Compiler sebelum mengaktifkannya.
Menjalankan linting secara rutin selama proses development.
Memastikan proses linting dan build berjalan dengan baik sebelum aplikasi di-deploy.

Dengan konfigurasi tersebut, template React + Vite dapat dikembangkan secara bertahap dari project sederhana menjadi aplikasi production yang lebih besar, terstruktur, dan mudah dipelihara.

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

Referensi Aturan Oxlint

Oxlint menyediakan berbagai aturan (lint rules) yang dapat digunakan untuk memeriksa kualitas, konsistensi, dan potensi masalah pada source code.

Setiap aturan memiliki tujuan dan tingkat pemeriksaan yang berbeda. Anda dapat memilih aturan yang sesuai dengan kebutuhan project, mulai dari aturan dasar untuk menemukan kesalahan umum hingga aturan yang lebih ketat untuk aplikasi production.

Untuk melihat daftar lengkap aturan yang tersedia, termasuk kategori, deskripsi, konfigurasi, dan cara penggunaannya, lihat dokumentasi resmi Oxlint:

{"fallbackMarkdown":"Oxlint Rules Documentation
","reference":{"matched_text":"","prefix":null,"start_idx":741,"end_idx":818,"safe_urls":[],"refs":[],"alt":"Oxlint Rules Documentation
","prompt_text":"Oxlint Rules Documentation
","type":"url","item":{"title":"Oxlint Rules Documentation","url":"https://oxc.rs/docs/guide/usage/linter/rules?utm_source=chatgpt.com","attribution":"oxc.rs","pub_date":null,"snippet":null,"attribution_segments":null,"supporting_websites":null,"refs":[],"hue":null,"attributions":null},"logo":null,"layout":null,"title":"Oxlint Rules Documentation"},"showLoginRequiredCard":false}

Dokumentasi tersebut dapat digunakan sebagai referensi ketika ingin:

Mengetahui aturan linting yang tersedia.
Memahami fungsi dan tujuan masing-masing aturan.
Melihat aturan berdasarkan kategori tertentu.
Menentukan aturan mana yang perlu diaktifkan atau dinonaktifkan.
Menyesuaikan konfigurasi Oxlint dengan standar coding dalam project.
Menerapkan konfigurasi linting yang lebih ketat untuk aplikasi production.
