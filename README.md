# Materialize — Halaman Calendar (Replika Statis)

Replika setia halaman **app-calendar** dari template admin
[Materialize - Bootstrap Dashboard PRO](https://themeforest.net/item/materialize-material-design-admin-template/11446068)
oleh Pixinvent, versi `vertical-menu-template-semi-dark`.

Sumber: https://demos.pixinvent.com/materialize-html-admin-template/html/vertical-menu-template-semi-dark/app-calendar.html

## Isi

- `index.html` — halaman kalender lengkap (sidebar menu, navbar + search, FullCalendar, form Add/Update Event, filter event)
- `assets/` — seluruh CSS, JS, gambar, dan JSON yang dibutuhkan, diunduh langsung dari server demo (self-contained, tanpa dependensi eksternal selain Google Fonts Inter & link GTM yang dibiarkan apa adanya)

## Menjalankan

Tinggal buka `index.html`, atau serve statis:

```bash
python3 -m http.server 8000
```

Semua fitur asli berfungsi: navigasi sidebar, search (Ctrl+K), ganti view Month/Week/Day/List, klik tanggal & event untuk tambah/edit, filter event, toggle tema.

## Catatan

- Link menu sidebar mengarah ke halaman demo asli Pixinvent (URL absolut) supaya tetap berfungsi — halaman-halaman lain template tidak disertakan di repo ini.
- Template ini produk komersial berlisensi. Replika ini untuk keperluan belajar/pribadi; jangan didistribusikan ulang atau dipakai untuk proyek komersial tanpa lisensi resmi dari Pixinvent.
