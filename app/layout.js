// Root layout: hanya CSS UMUM template (dipakai semua halaman).
// CSS khusus halaman (vendor/css/pages/*, vendor/libs/*) dimuat per-halaman
// lewat TemplatePage (prop css) — karena ada CSS yang merusak bila global
// (mis. app-invoice-print.css menyembunyikan semua body kecuali .invoice-print).
import "./globals.css";

export const metadata = {
  title: {
    default: "Materialize - Bootstrap Dashboard PRO",
    template: "%s | Materialize",
  },
};

const CSS_LINKS = [
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
  "/materialize-calendar/assets/vendor/fonts/iconify-icons.css",
  "/materialize-calendar/assets/vendor/fonts/flag-icons.css",
  "/materialize-calendar/assets/vendor/libs/node-waves/node-waves.css",
  "/materialize-calendar/assets/vendor/libs/pickr/pickr-themes.css",
  "/materialize-calendar/assets/vendor/css/core.css",
  "/materialize-calendar/assets/css/demo.css",
  "/materialize-calendar/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css",
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {CSS_LINKS.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <link rel="icon" type="image/x-icon" href="/assets/img/favicon/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
