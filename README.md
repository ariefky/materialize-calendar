# Materialize Admin — Versi Next.js (App Router)

Konversi **Next.js** dari clone statis template admin
[Materialize - Bootstrap Dashboard PRO](https://themeforest.net/item/materialize-material-design-admin-template/11446068)
oleh Pixinvent (layout `vertical-menu-template-semi-dark` + front pages).

Semua 152 halaman template sudah menjadi route Next.js, self-contained, dengan
seluruh fitur jQuery/Bootstrap/plugin berjalan (menu, search Ctrl+K, kalender,
chat, datatables, charts, form wizard, template customizer, dll).

## Stack

- Next.js 15 (App Router) + React 19, JavaScript
- `output: "export"` — hasil build berupa file statis murni (bisa di GitHub Pages / Vercel / hosting apa pun)
- Aset template utuh di `public/assets/` (CSS, JS, gambar, font, JSON data)

## Struktur

```
app/
  layout.js               # shell: <html>, CSS umum template (per-halaman dimuat per-page)
  page.js                 # route "/" = Dashboard Analytics
  <route>/page.js         # 151 halaman lain (apps/calendar, dashboards/crm, auth/login, ...)
components/TemplatePage.js# client shell: render HTML halaman + inject script template berurutan
scripts/generate-pages.js # GENERATOR: public/html/*.html -> app/<route>/page.js
public/
  assets/                 # seluruh aset template (dipakai runtime)
  html/                   # clone statis asli (masih bisa diakses di /html/...)
out/                      # hasil `npm run build` (export statis; dipakai GitHub Pages)
```

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # export statis ke out/
```

## Cara kerja konversi

1. `public/html/` (clone statis) di-parse oleh `scripts/generate-pages.js`:
   body HTML, judul, atribut `<html>/<body>`, daftar script (urutan asli),
   inline script, dan CSS khusus halaman diekstrak → satu `page.js` per route.
2. `TemplatePage` (client component) merender HTML halaman lalu meng-inject
   script-scriptnya berurutan (jquery → bootstrap → plugin → main.js → script
   halaman) dan memicu `DOMContentLoaded` sintetis agar init vanilla jalan.
3. Link antar-halaman ditulis ulang ke route Next (mis. `app-calendar.html`
   → `/apps/calendar`); aset `../../assets/` → `/assets/`.
4. Navigasi memakai `<a>` biasa → full page load (perilaku sama dengan demo
   asli, menghindari duplikasi init script).

## Deployment

- **GitHub Pages**: `out/` sudah di-commit; repo ini diset Pages → branch
  `main`, folder `/out`. Setiap `npm run build` + push akan memperbarui situs.
- **Vercel / Netlify**: import repo; build command `npm run build`, output `out/`
  (Vercel otomatis mendeteksi Next.js).

## Perbedaan dari demo asli (disengaja)

1. Link ke layout lain yang tidak disertakan → URL demo asli Pixinvent.
2. `assets/json/ajax.php` → statis `assets/json/ajax-data.json` (URL di-patch di
   `assets/js/tables-datatables-advanced.js`).
3. Mapbox token di `assets/js/app-logistics-fleet.js` → placeholder (isi token
   kamu sendiri agar peta Logistics Fleet tampil).
4. Font raty & sebagian ikon jstree yang memang 404 di server demo → dibiarkan.

## Cara edit

- Konten halaman: edit `public/html/vertical-menu-template-semi-dark/<file>.html`
  lalu jalankan `npm run generate` (menulis ulang `app/<route>/page.js`) — atau
  langsung edit `app/<route>/page.js`.
- Data tabel/kanban/invoice: `public/assets/json/*.json`.
- Warna/tema default: `public/assets/vendor/css/core.css` (variabel `:root`).

## Catatan lisensi

Template ini produk komersial berlisensi. Replika ini untuk keperluan
belajar/pribadi — jangan didistribusikan ulang atau dipakai untuk proyek
komersial tanpa lisensi resmi dari Pixinvent.
