# Materialize — Template Admin Lengkap (Replika Statis)

Replika lengkap **seluruh fitur** template admin
[Materialize - Bootstrap Dashboard PRO](https://themeforest.net/item/materialize-material-design-admin-template/11446068)
oleh Pixinvent — layout `vertical-menu-template-semi-dark`, termasuk halaman depan (front pages).

Sumber: https://demos.pixinvent.com/materialize-html-admin-template/html/vertical-menu-template-semi-dark/index.html

## Isi

- `index.html` — redirect ke halaman utama template (`html/vertical-menu-template-semi-dark/index.html`)
- `html/vertical-menu-template-semi-dark/` — 147 halaman admin:
  Dashboards (eCommerce, CRM, Analytics, Logistics, Academy), Apps (Email, Chat, Calendar, Kanban, eCommerce, Academy, Logistics, Invoice, Users, Roles & Permissions), Pages (FAQ, Pricing, Profile, Misc), Authentications (login/register/forgot/reset, basic & cover), Wizard, Modal, Cards, UI, Extended UI, Icons, Forms, Tables, Datatables, Charts (Apex & ChartJS), Leaflet Maps
- `html/front-pages/` — 6 halaman publik: Landing, Pricing, Payment, Checkout, Help Center
- `assets/` — seluruh CSS, JS, gambar, font, dan JSON data (1080+ file, self-contained)

## Menjalankan

Buka `index.html`, atau serve statis:

```bash
python3 -m http.server 8000
```

Semua fitur berfungsi: navigasi sidebar & search (Ctrl+K), kalender, chat, email, kanban, datatables (data dari JSON lokal), chart, leaflet, form wizard, template customizer (ganti warna/tema/layout real-time), dll.

## Perbedaan dari demo asli (disengaja, agar tetap berfungsi di hosting statis)

1. Link menu ke layout lain yang tidak disertakan (horizontal-menu-template, vertical-menu-template, dll.) dan dokumentasi → diarahkan ke URL demo asli Pixinvent.
2. `assets/json/ajax.php` (endpoint server-side datatables) → diganti file statis `assets/json/ajax-data.json` + URL di `assets/js/tables-datatables-advanced.js` diubah (responsnya identik).
3. Font raty & beberapa ikon jstree yang memang 404 di server demo asli → dibiarkan (perilaku sama dengan sumber).
4. Mapbox token di `assets/js/app-logistics-fleet.js` diganti `pk.placeholder-mapbox-token` (token asli demo diblokir GitHub Push Protection). Isi token Mapbox kamu sendiri di file itu agar peta halaman Logistics Fleet tampil.

## Catatan lisensi

Template ini produk komersial berlisensi (Themeforest). Replika ini untuk keperluan belajar/pribadi — jangan didistribusikan ulang atau dipakai untuk proyek komersial tanpa lisensi resmi dari Pixinvent.

## Cara edit

- Semua halaman adalah HTML statis biasa di `html/vertical-menu-template-semi-dark/` — bisa diedit langsung lalu commit.
- Data tabel/kanban/invoice dll. ada di `assets/json/*.json`.
- Warna & tema default: CSS variable di `assets/vendor/css/core.css` (root `:root`).
