import { loadAluonRaw } from "@/lib/aluon-content";
import {
  type ContentBlock,
  toBlocks,
  safeText,
  getFirstParagraph,
} from "@/lib/normalize";

export type { ContentBlock } from "@/lib/normalize";

export type PageContent = {
  title: string;
  blocks: ContentBlock[];
  images?: string[];
};

type RawPage = {
  title?: string;
  h1?: string;
  headings?: string[];
  paragraphs?: string[];
  bullets?: string[];
  images?: string[];
  date?: string;
};

/** Article publish dates (ISO date string). Used when raw content has no date. Last 7 days. */
export const ARTICLE_PUBLISH_DATES: Record<string, string> = {
  "alucobond-facade-cladding-guide": "2025-02-19",
  "hpl-exterior-cladding-israel": "2025-02-18",
  "curtain-wall-systems-architectural-guide": "2025-02-17",
};

const PAGE_KEYS = ["about", "projects", "articles", "contact"] as const;
const CLADDING_KEYS: Record<string, string> = {
  aluminum: "claddings__aluminum",
  alucobond: "claddings__alucobond",
  hpl: "claddings__hpl",
  "curtain-walls": "claddings__curtain-walls",
};

const SOLUTION_TITLES: Record<string, string> = {
  aluminum: "חיפוי אלומיניום",
  alucobond: "חיפוי אלוקובונד (ACP)",
  hpl: "חיפוי HPL",
  "curtain-walls": "קירות מסך",
};

const WHY_US_PLACEHOLDER = [
  "ייבוא חומרים",
  "תכנון והדמיה",
  "ייצור ועיבוד",
  "אביזרים והתקנה",
];

function getRaw(obj: unknown, key: string): unknown {
  if (obj == null || typeof obj !== "object") return undefined;
  return (obj as Record<string, unknown>)[key];
}

function getStrings(obj: unknown, key: string): string[] {
  const val = getRaw(obj, key);
  return Array.isArray(val) ? (val as string[]) : [];
}

function getFirstImportedImage(raw: Record<string, unknown>): string {
  const homeImgs = getStrings(getRaw(raw, "home"), "images");
  if (homeImgs[0]?.startsWith("/imported/aluon")) return homeImgs[0];
  for (const key of Object.keys(raw)) {
    const page = getRaw(raw, key) as RawPage | undefined;
    const imgs = getStrings(page, "images");
    const first = imgs.find((s) => s.startsWith("/imported/aluon"));
    if (first) return first;
  }
  return "";
}

function toPageContent(raw: Record<string, unknown>, key: string): PageContent {
  const page = getRaw(raw, key) as RawPage | undefined;
  if (!page) {
    return { title: key, blocks: [] };
  }
  const title = safeText(page.h1 ?? page.title ?? key);
  const paragraphs = getStrings(page, "paragraphs");
  const bullets = getStrings(page, "bullets");
  const images = getStrings(page, "images");
  const blocks = toBlocks({ paragraphs, bullets, images });
  return { title: title || key, blocks, images: images.length > 0 ? images : undefined };
}

function buildSiteContent(raw: Record<string, unknown>) {
  const homeRaw = getRaw(raw, "home") as RawPage | undefined;
  const homeHeadings = getStrings(homeRaw, "headings");
  const firstHomeParagraph = getFirstParagraph(homeRaw?.paragraphs);
  const homeParagraphs = getStrings(homeRaw, "paragraphs");
  const homeBullets = getStrings(homeRaw, "bullets");
  const aboutRaw = getRaw(raw, "about") as RawPage | undefined;
  const aboutBullets = getStrings(aboutRaw, "bullets");

  const hero = {
    title: safeText(homeRaw?.h1 ?? homeRaw?.title) || "פתרונות מתקדמים למעטפת הבניין",
    subtitle: firstHomeParagraph || "",
    ctas: [
      { label: "לייעוץ והצעת מחיר", href: "/contact" },
      { label: "פרויקטים נבחרים", href: "/projects" },
    ],
    backgroundImage: getFirstImportedImage(raw),
    ctaSummary: homeParagraphs[1] ? safeText(homeParagraphs[1]) : firstHomeParagraph,
    trustChips: [homeHeadings[0], homeHeadings[1], homeHeadings[2], homeHeadings[3]]
      .map((h) => safeText(h))
      .filter(Boolean),
  };
  if (hero.trustChips.length === 0) hero.trustChips = ["מגורים", "מסחר", "מבני ציבור", "תעשייה"];

  const solutions = Object.entries(CLADDING_KEYS).map(([slug, key]) => {
    const claddingRaw = getRaw(raw, key) as RawPage | undefined;
    const intro = getFirstParagraph(claddingRaw?.paragraphs);
    const imgs = getStrings(claddingRaw, "images");
    return {
      title: SOLUTION_TITLES[slug] ?? safeText(claddingRaw?.h1 ?? claddingRaw?.title) ?? slug,
      description: intro || "",
      href: `/claddings/${slug}`,
      image: imgs[0]?.startsWith("/imported/aluon") ? imgs[0] : "",
    };
  });

  const whyUsItems =
    homeBullets.length >= 4
      ? homeBullets.map((b) => safeText(b)).filter(Boolean)
      : aboutBullets.length >= 4
        ? aboutBullets.map((b) => safeText(b)).filter(Boolean)
        : [homeHeadings[15], homeHeadings[16], homeHeadings[17], homeHeadings[18]]
            .map((h) => safeText(h))
            .filter(Boolean);
  const whyUs = {
    title: "למה Alu-on group",
    items: whyUsItems.length >= 4 ? whyUsItems.slice(0, 4) : WHY_US_PLACEHOLDER,
  };

  const projectsRaw = getRaw(raw, "projects") as RawPage | undefined;
  let projectImages = getStrings(projectsRaw, "images");
  const projectHeadings = getStrings(projectsRaw, "headings");
  if (projectImages.length === 0) {
    const seen = new Set<string>();
    for (const key of Object.keys(raw)) {
      const page = getRaw(raw, key) as RawPage | undefined;
      for (const src of getStrings(page, "images")) {
        if (src.startsWith("/imported/aluon") && !seen.has(src)) {
          seen.add(src);
          projectImages.push(src);
        }
      }
    }
  }
  const projectsPreview = projectImages
    .slice(0, 6)
    .map((image, i) => ({
      image,
      title: projectHeadings[i] ? safeText(projectHeadings[i]) : "פרויקט",
    }));

  const pages: Record<string, PageContent> = {};
  for (const key of PAGE_KEYS) {
    pages[key] = toPageContent(raw, key);
  }

  const claddings: Record<string, PageContent> = {};
  for (const [slug, key] of Object.entries(CLADDING_KEYS)) {
    const page = getRaw(raw, key) as RawPage | undefined;
    if (!page) {
      claddings[slug] = { title: SOLUTION_TITLES[slug] ?? slug, blocks: [] };
      continue;
    }
    const paragraphs = getStrings(page, "paragraphs");
    const bullets = getStrings(page, "bullets");
    const images = getStrings(page, "images");
    const blocks = toBlocks({
      paragraphs,
      bullets,
      images,
    });
    claddings[slug] = {
      title: safeText(page.h1 ?? page.title) || slug,
      blocks,
      images: images.length > 0 ? images : undefined,
    };
  }

  const articles: Array<{
    slug: string;
    title: string;
    excerpt: string;
    blocks: ContentBlock[];
    images: string[];
    date: string;
  }> = [];
  for (const key of Object.keys(raw)) {
    if (!key.startsWith("articles__")) continue;
    const slug = key.replace(/^articles__/, "");
    const page = getRaw(raw, key) as RawPage | undefined;
    if (!page) continue;
    const paragraphs = getStrings(page, "paragraphs");
    const bullets = getStrings(page, "bullets");
    const images = getStrings(page, "images");
    const excerpt = getFirstParagraph(paragraphs);
    const blocks = toBlocks({
      paragraphs: paragraphs.slice(1),
      bullets,
      images,
    });
    const date =
      (typeof page.date === "string" && page.date) ||
      ARTICLE_PUBLISH_DATES[slug] ||
      new Date().toISOString().slice(0, 10);
    articles.push({
      slug,
      title: safeText(page.h1 ?? page.title) || slug,
      excerpt,
      blocks,
      images,
      date,
    });
  }
  articles.sort((a, b) => (b.date < a.date ? -1 : b.date > a.date ? 1 : 0));

  return {
    home: { hero, solutions, whyUs, projectsPreview },
    pages: {
      about: pages.about,
      projects: pages.projects,
      articles: pages.articles,
      contact: pages.contact,
    },
    claddings,
    articles,
  };
}

const raw = loadAluonRaw() as Record<string, unknown>;
export const siteContent = buildSiteContent(raw);
