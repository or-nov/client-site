import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";

const iconClass = "h-5 w-5 shrink-0";

function FileTextIcon() {
  return (
    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function DwgDetailsIcon() {
  return (
    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
    </svg>
  );
}

const downloadCategories = [
  {
    title: "חיפוי אלומיניום 2 מ\"מ",
    description: "לוחות אלומיניום מלא בשיטת התקנה יבשה.",
    pdfHref: "/specs/aluminum-2mm-spec.pdf",
    dwgHref: "/specs/aluminum-2mm-details.dwg",
  },
  {
    title: "חיפוי אלוקובונד (ACP)",
    description: "לוחות מורכבים (Alucobond) למעטפת בניין מודרנית.",
    pdfHref: "/specs/alucobond-spec.pdf",
    dwgHref: "/specs/alucobond-details.dwg",
  },
  {
    title: "קירות מסך (Curtain Wall)",
    description: "מערכות חזית זכוכית ואלומיניום מתקדמות.",
    pdfHref: "/specs/curtain-wall-spec.pdf",
    dwgHref: "/specs/curtain-wall-details.dwg",
  },
  {
    title: "חיפוי HPL לחוץ",
    description: "לוחות קומפקט HPL עמידים לתנאי חוץ קיצוניים.",
    pdfHref: "/specs/hpl-spec.pdf",
    dwgHref: "/specs/hpl-details.dwg",
  },
] as const;

export function TechnicalDownloadsSection() {
  return (
    <Section id="technical-downloads" className="bg-[var(--background)]">
      <Container>
        <div className="text-center">
          <h2 className="section-title">
            מרכז הורדות טכניות
          </h2>
          <p className="section-subtitle">
            מפרטי ביצוע (PDF) ופרטי צמתים (DWG) להטמעה בתוכניות עבודה.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {downloadCategories.map((category) => (
            <Card
              key={category.title}
              className="flex flex-col rounded-2xl p-6 shadow-lg transition-all duration-200 hover:shadow-[var(--shadow-lg)]"
            >
              <h3 className="card-title text-lg">
                {category.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
                {category.description}
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={category.pdfHref}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-4 py-2.5 text-sm font-medium text-[var(--background)] transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2"
                >
                  <FileTextIcon />
                  מפרט טכני (PDF)
                </a>
                <a
                  href={category.dwgHref}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[var(--border)] bg-transparent px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition-all duration-200 hover:bg-[var(--border-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2"
                >
                  <DwgDetailsIcon />
                  פרטי צמתים (DWG)
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
