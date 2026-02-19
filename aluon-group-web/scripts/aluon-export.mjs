import fs from "fs";
import path from "path";
import { load } from "cheerio";

const OUT_DIR = path.join(process.cwd(), "exports", "aluon");
const IMG_DIR = path.join(process.cwd(), "public", "imported", "aluon");
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(IMG_DIR, { recursive: true });

const urls = [
  "https://alu-on.co.il/",
  "https://alu-on.co.il/about",
  "https://alu-on.co.il/projects",
  "https://alu-on.co.il/articles",
  "https://alu-on.co.il/contact",
  "https://alu-on.co.il/claddings/aluminum",
  "https://alu-on.co.il/claddings/alucobond",
  "https://alu-on.co.il/claddings/hpl",
  "https://alu-on.co.il/claddings/curtain-walls",
  "https://alu-on.co.il/articles/alucobond-facade-cladding-guide",
  "https://alu-on.co.il/articles/hpl-exterior-cladding-israel",
  "https://alu-on.co.il/articles/curtain-wall-systems-architectural-guide",
];

function safeFileName(url) {
  return url.replace("https://alu-on.co.il/", "").replace(/\//g, "__") || "home";
}

async function downloadImage(imgUrl) {
  try {
    const u = new URL(imgUrl);
    const filename = path.basename(u.pathname).split("?")[0] || "img";
    const outPath = path.join(IMG_DIR, filename);

    if (fs.existsSync(outPath)) return `/imported/aluon/${filename}`;

    const res = await fetch(imgUrl);
    if (!res.ok) return null;

    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(outPath, buf);
    return `/imported/aluon/${filename}`;
  } catch {
    return null;
  }
}

async function scrape(url) {
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`Fetch failed ${res.status}: ${url}`);
  const html = await res.text();
  const $ = load(html);

  const title = $("title").text().trim();
  const h1 = $("h1").first().text().trim();

  // נסיון להוציא "תוכן מרכזי" בלי להילחם ב-CSS
  const main = $("main").length ? $("main") : $("body");
  const headings = main.find("h2, h3").map((_, el) => $(el).text().trim()).get();

  // טקסטים בפסקאות/רשימות (אפשר להרחיב לפי הצורך)
  const paragraphs = main.find("p").map((_, el) => $(el).text().trim()).get().filter(Boolean);
  const bullets = main.find("li").map((_, el) => $(el).text().trim()).get().filter(Boolean);

  // תמונות (מוריד ל-public/imported/aluon)
  const imgs = main.find("img").map((_, el) => $(el).attr("src")).get().filter(Boolean);
  const downloaded = [];
  for (const src of imgs) {
    const abs = src.startsWith("http") ? src : new URL(src, url).toString();
    const local = await downloadImage(abs);
    if (local) downloaded.push(local);
  }

  return { url, title, h1, headings, paragraphs, bullets, images: downloaded };
}

async function run() {
  const data = {};
  for (const url of urls) {
    console.log("Exporting:", url);
    data[safeFileName(url)] = await scrape(url);
  }
  fs.writeFileSync(path.join(OUT_DIR, "content.json"), JSON.stringify(data, null, 2), "utf8");
  console.log("DONE ->", path.join(OUT_DIR, "content.json"));
  console.log("Images ->", IMG_DIR);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
