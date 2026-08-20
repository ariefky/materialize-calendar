"use client";

// Shell untuk halaman template: render HTML statis halaman, lalu inject
// script-scriptnya secara berurutan (jquery -> bootstrap -> plugin -> main.js
// -> script halaman), lalu picu DOMContentLoaded bila dokumen sudah termuat
// (agar listener vanilla seperti app-calendar.js tetap jalan).
import { useEffect, useRef } from "react";

export default function TemplatePage({ html, css = [], scripts = [], inlineScripts = [], htmlAttrs = {}, bodyAttrs = {} }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // Terapkan atribut <html> & <body> dari halaman asli (layout class, data-assets-path, dll.)
    Object.entries(htmlAttrs).forEach(([k, v]) => document.documentElement.setAttribute(k, v));
    Object.entries(bodyAttrs).forEach(([k, v]) => document.body.setAttribute(k, v));

    let cancelled = false;
    const cleanup = [];
    let i = 0;

    const runInline = (list) => {
      list.forEach((code) => {
        try {
          // document.write setelah dokumen termuat akan menimpa seluruh halaman;
          // ganti sementara dengan append ke container halaman agar script
          // tahun copyright dll. tetap muncul di posisi yang benar.
          const origWrite = document.write;
          const origWriteln = document.writeln;
          document.write = (s) => root.insertAdjacentHTML("beforeend", String(s));
          document.writeln = (s) => root.insertAdjacentHTML("beforeend", String(s) + "\n");
          try {
            // eslint-disable-next-line no-eval
            (0, eval)(code);
          } finally {
            document.write = origWrite;
            document.writeln = origWriteln;
          }
        } catch (err) {
          console.warn("inline script gagal:", err);
        }
      });
    };

    const finish = () => {
      if (cancelled) return;
      runInline(inlineScripts);
      if (document.readyState !== "loading") {
        document.dispatchEvent(new Event("DOMContentLoaded"));
      }
    };

    const loadNext = () => {
      if (cancelled) return;
      if (i >= scripts.length) {
        finish();
        return;
      }
      const src = scripts[i++];
      const s = document.createElement("script");
      s.src = src;
      s.async = false;
      s.onload = () => loadNext();
      s.onerror = () => loadNext();
      document.body.appendChild(s);
      cleanup.push(s);
    };

    loadNext();

    return () => {
      cancelled = true;
      cleanup.forEach((s) => s.remove());
    };
  }, [html, scripts, inlineScripts, htmlAttrs, bodyAttrs]);

  return (
    <>
      {css.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
