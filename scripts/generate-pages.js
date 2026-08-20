/* Generator: ubah public/html (clone statis template) menjadi
   halaman Next.js (app/<route>/page.js). Tiap halaman merender HTML body-nya
   lewat komponen TemplatePage + daftar script yang di-inject berurutan. */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BASE = "/materialize-calendar"; // GitHub Pages project subpath
const HTML_DIR = path.join(ROOT, "public", "html", "vertical-menu-template-semi-dark");
const FRONT_DIR = path.join(ROOT, "public", "html", "front-pages");
const APP_DIR = path.join(ROOT, "app");
const GEN_MARKER = path.join(__dirname, ".generated.json");

/* ---------- route map ---------- */
function routeFor(file) {
  const base = file.replace(/\.html$/, "");
  const segs = (s) => s.split("-").filter(Boolean).join("/");
  if (base === "index") return "/";
  const rules = [
    [/^dashboards-(.+)$/, (x) => `dashboards/${x}`],
    [/^app-(.+)$/, (x) => `apps/${segs(x)}`],
    [/^auth-(.+)$/, (x) => `auth/${x}`],
    [/^pages-(.+)$/, (x) => `pages/${x}`],
    [/^wizard-ex-(.+)$/, (x) => `wizard/${x}`],
    [/^cards-(.+)$/, (x) => `cards/${x}`],
    [/^ui-(.+)$/, (x) => `ui/${x}`],
    [/^extended-ui-(.+)$/, (x) => `extended-ui/${x}`],
    [/^icons-(.+)$/, (x) => `icons/${x}`],
    [/^form-layouts-(.+)$/, (x) => `forms/layouts/${x}`],
    [/^form-wizard-(.+)$/, (x) => `forms/wizard/${x}`],
    [/^form-(.+)$/, (x) => `forms/${x}`],
    [/^forms-(.+)$/, (x) => `forms/${x}`],
    [/^tables-(.+)$/, (x) => `tables/${x}`],
    [/^charts-(.+)$/, (x) => `charts/${x}`],
    [/^maps-(.+)$/, (x) => `maps/${x}`],
    [/^layouts-(.+)$/, (x) => `layouts/${x}`],
  ];
  for (const [re, fn] of rules) {
    const m = base.match(re);
    if (m) return fn(m[1]);
  }
  return segs(base); // fallback: modal-examples -> modal/examples
}

function routeForFile(relHtml) {
  if (relHtml.startsWith("front-pages/")) {
    const name = path.basename(relHtml).replace(/\.html$/, "");
    return `front-pages/${name}`;
  }
  return routeFor(path.basename(relHtml));
}

/* ---------- parse satu halaman ---------- */
function parsePage(filePath, relHtml) {
  const raw = fs.readFileSync(filePath, "utf-8");

  const attrs = (tag) => {
    const m = raw.match(new RegExp(`<${tag}\\b([^>]*)>`, "i"));
    const out = {};
    if (!m) return out;
    const re = /([a-zA-Z0-9-]+)="([^"]*)"/g;
    let mm;
    while ((mm = re.exec(m[1]))) out[mm[1]] = mm[2];
    return out;
  };

  let htmlAttrs = attrs("html");
  if (htmlAttrs["data-assets-path"]) htmlAttrs["data-assets-path"] = "/assets/";
  const bodyAttrs = attrs("body");

  const title = (raw.match(/<title>([^<]*)<\/title>/i) || [])[1] || "Materialize";

  // link stylesheet khusus halaman (head asli)
  const css = [];
  const linkRe = /<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/gi;
  let lm;
  while ((lm = linkRe.exec(raw))) {
    let href = lm[1];
    if (href.startsWith("../../assets/")) href = BASE + "/" + href.replace("../../assets/", "assets/");
    else if (href.startsWith("../")) href = BASE + "/" + href.replace("../", "");
    else if (href.startsWith("http") || href.startsWith("//")) { /* biarkan eksternal */ }
    else if (href.startsWith("/")) href = BASE + href;
    else href = BASE + "/" + href;
    css.push(href);
  }

  // script: external (src) vs inline (teks)
  const scripts = [];
  const inlineScripts = [];
  const scriptRe = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = scriptRe.exec(raw))) {
    const src = (m[1].match(/src="([^"]+)"/) || [])[1];
    if (src) {
      if (src.startsWith("../../assets/")) scripts.push(BASE + "/" + src.replace("../../assets/", "assets/"));
      else if (!src.startsWith("http") && !src.startsWith("//") && !src.startsWith(BASE)) scripts.push(src);
    } else if (m[2].trim()) {
      inlineScripts.push(m[2]);
    }
  }

  // body inner HTML
  const bodyMatch = raw.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  let body = bodyMatch ? bodyMatch[1] : raw;

  // buang semua <script> (sudah dikumpulkan)
  body = body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  body = body.replace(/<script\b[^>]*\/>/gi, "");

  // tulis ulang aset & link halaman
  body = body.replace(/((?:src|href)=")\.\.\/\.\.\/assets\//g, `$1${BASE}/assets/`);
  body = body.replace(/data-assets-path="\.\.\/\.\.\/assets\/"/g, `data-assets-path="${BASE}/assets/"`);
  body = body.replace(/((?:src|href)=")([^"]*\.html)(#[^"]*)?"/g, (all, pre, file, hash) => {
    const route = routeForFile(file.startsWith("../") ? file.replace("../", "") : file);
    const href = route.startsWith("/") ? route : "/" + route;
    return `${pre}${BASE}${href}${hash || ""}"`;
  });

  return { route: routeForFile(relHtml), title, css, htmlAttrs, bodyAttrs, scripts, inlineScripts, body };
}

/* ---------- generate page.js ---------- */
function writePage(page) {
  const outDir = path.join(APP_DIR, page.route === "/" ? "" : page.route);
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "page.js");
  const js = `import TemplatePage from "@/components/TemplatePage";

export const metadata = { title: ${JSON.stringify(page.title)} };

export default function Page() {
  return (
    <TemplatePage
      html={${JSON.stringify(page.body)}}
      css={${JSON.stringify(page.css)}}
      scripts={${JSON.stringify(page.scripts)}}
      inlineScripts={${JSON.stringify(page.inlineScripts)}}
      htmlAttrs={${JSON.stringify(page.htmlAttrs)}}
      bodyAttrs={${JSON.stringify(page.bodyAttrs)}}
    />
  );
}
`;
  fs.writeFileSync(outFile, js, "utf-8");
  return outFile;
}

/* ---------- main ---------- */
// bersihkan hasil generate sebelumnya
if (fs.existsSync(GEN_MARKER)) {
  const prev = JSON.parse(fs.readFileSync(GEN_MARKER, "utf-8"));
  for (const f of prev.files) {
    try { fs.unlinkSync(f); } catch (e) {}
  }
}

const files = [];
for (const f of fs.readdirSync(HTML_DIR).filter((x) => x.endsWith(".html"))) {
  files.push(["vertical", path.join(HTML_DIR, f), f]);
}
for (const f of fs.readdirSync(FRONT_DIR).filter((x) => x.endsWith(".html"))) {
  files.push(["front", path.join(FRONT_DIR, f), "front-pages/" + f]);
}

const generated = [];
for (const [kind, fp, rel] of files) {
  const page = parsePage(fp, rel);
  const outFile = writePage(page);
  generated.push(outFile);
  console.log(`${kind.padEnd(7)} ${page.route.padEnd(42)} scripts=${page.scripts.length} inline=${page.inlineScripts.length}`);
}

fs.writeFileSync(GEN_MARKER, JSON.stringify({ files: generated }));
console.log(`\nTotal: ${generated.length} halaman Next.js di-generate.`);
