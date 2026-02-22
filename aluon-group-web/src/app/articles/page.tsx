import { loadAluonContent } from "@/lib/aluon-content";
import { siteContent, ARTICLE_PUBLISH_DATES } from "@/content/siteContent";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Prose } from "@/components/ui/Prose";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArticleCard } from "@/components/ArticleCard";

const DOWNLOADS_SUBTITLE =
  "מפרטי ביצוע (PDF) ופרטי צמתים (DWG) להטמעה בתוכניות עבודה.";

const TECHNICAL_DOWNLOADS = [
  {
    id: "aluminum-2mm",
    name: "חיפוי אלומיניום 2 מ\"מ",
    description: "לוחות אלומיניום מלא בשיטת התקנה יבשה.",
    pdfHref: "/specs/aluminum-2mm-spec.pdf",
    dwgHref: "/specs/aluminum-2mm-details.dwg",
  },
  {
    id: "alucobond",
    name: "חיפוי אלוקובונד (ACP)",
    description: "לוחות מורכבים (Alucobond) למעטפת בניין מודרנית.",
    pdfHref: "/specs/alucobond-spec.pdf",
    dwgHref: "/specs/alucobond-details.dwg",
  },
  {
    id: "curtain-wall",
    name: "קירות מסך (Curtain Wall)",
    description: "מערכות חזית זכוכית ואלומיניום מתקדמות.",
    pdfHref: "/specs/curtain-wall-spec.pdf",
    dwgHref: "/specs/curtain-wall-details.dwg",
  },
  {
    id: "hpl",
    name: "חיפוי HPL לחוץ",
    description: "לוחות קומפקט HPL עמידים לתנאי חוץ קיצוניים.",
    pdfHref: "/specs/hpl-spec.pdf",
    dwgHref: "/specs/hpl-details.dwg",
  },
] as const;

const KNOWN_ARTICLE_SLUGS = [
  "alucobond-facade-cladding-guide",
  "hpl-exterior-cladding-israel",
  "curtain-wall-systems-architectural-guide",
];

const ARTICLES_SUBTITLE =
  "כל מה שצריך לדעת על מעטפת הבניין, טכנולוגיות חיפוי וטרנדים אדריכליים";

type ArticleItem = {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage?: string | null;
  date: string;
};

function getArticles(): ArticleItem[] {
  const fromSite = siteContent.articles;
  if (fromSite.length > 0) {
    return fromSite.map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt ?? "",
      featuredImage: a.images?.[0] ?? null,
      date: a.date,
    }));
  }
  const content = loadAluonContent();
  const articleKeys = Object.keys(content).filter((k) =>
    k.startsWith("articles__")
  );
  const slugs =
    articleKeys.length > 0
      ? articleKeys.map((k) => k.replace(/^articles__/, ""))
      : KNOWN_ARTICLE_SLUGS;
  return slugs.map((slug, i) => {
    const key = `articles__${slug}`;
    const data = content[key] as { h1?: string; title?: string; paragraphs?: string[] } | undefined;
    const title = data?.h1 || data?.title || slug;
    const excerpt = Array.isArray(data?.paragraphs) && data.paragraphs[0]
      ? data.paragraphs[0].slice(0, 120) + (data.paragraphs[0].length > 120 ? "…" : "")
      : "";
    const d = new Date();
    d.setDate(d.getDate() - i);
    const date = ARTICLE_PUBLISH_DATES[slug] ?? d.toISOString().slice(0, 10);
    return { slug, title, excerpt, featuredImage: null, date };
  }).sort((a, b) => (b.date < a.date ? -1 : b.date > a.date ? 1 : 0));
}

export default function ArticlesListPage() {
  const articles = getArticles();

  return (
    <>
    <div dir="rtl">
    <Section id="articles" className="pb-16 pt-10 md:pb-24 md:pt-16">
      <Container>
        <header className="text-center">
          <h2 className="section-title">
            מאמרים ומגזין
          </h2>
          <p className="section-subtitle">
            {ARTICLES_SUBTITLE}
          </p>
        </header>

        {articles.length === 0 ? (
          <Prose className="text-center">
            <p className="text-zinc-500">אין מאמרים כרגע.</p>
          </Prose>
        ) : (
          <ul className="grid list-none grid-cols-1 gap-8 p-0 lg:grid-cols-3">
            {articles.map((article, i) => (
              <li key={article.slug} className="list-none">
                <ArticleCard
                  slug={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  featuredImage={article.featuredImage}
                  date={article.date}
                  delay={i * 0.1}
                />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>

    {/* Technical Downloads Center */}
    <Section id="technical-downloads" className="border-t border-[var(--border-subtle)] pb-16 pt-14 md:pb-24 md:pt-20">
      <Container>
        <header className="text-center">
          <h2 className="section-title">
            מרכז הורדות טכניות
          </h2>
          <p className="section-subtitle">
            {DOWNLOADS_SUBTITLE}
          </p>
        </header>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TECHNICAL_DOWNLOADS.map((item) => (
            <Card key={item.id} className="flex flex-col rounded-2xl p-6 text-right shadow-lg" dir="rtl">
              <h3 className="card-title text-lg">
                {item.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/80">
                {item.description}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button href={item.pdfHref} variant="primary" className="gap-2">
                  מפרט טכני (PDF)
                  <FileTextIcon className="h-4 w-4 shrink-0" aria-hidden />
                </Button>
                <Button href={item.dwgHref} variant="secondary" className="gap-2">
                  פרטי צמתים (DWG)
                  <DraftingCompassIcon className="h-4 w-4 shrink-0" aria-hidden />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
    </div>
    </>
  );
}

function FileTextIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

/** Box/CAD icon for DWG technical drawings. */
function DraftingCompassIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}
