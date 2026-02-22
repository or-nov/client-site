import Image from "next/image";
import type { ContentBlock } from "@/content/siteContent";
import type { CladdingPageMeta } from "@/content/claddingPageData";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/ui/Prose";
import { FaqAccordion } from "@/components/ui/Accordion";

type CladdingPageLayoutProps = {
  slug: string;
  meta: CladdingPageMeta;
  blocks: ContentBlock[];
  images?: string[];
};

function BlockRender({
  block,
  slug,
}: {
  block: ContentBlock;
  slug: string;
}) {
  if (block.type === "paragraph") {
    return (
      <Prose className="[&_p]:leading-[1.8] [&_p]:text-[var(--foreground)] [&_strong]:font-bold [&_strong]:text-[var(--foreground)]">
        <p>{block.text}</p>
      </Prose>
    );
  }
  if (block.type === "list") {
    const items = block.items;
    const isAluminum = slug === "aluminum";
    return (
      <div className={`grid gap-3 ${isAluminum ? "sm:grid-cols-2" : ""}`}>
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--background-card)] px-4 py-3"
          >
            <span className="mt-0.5 shrink-0 text-[var(--foreground)]" aria-hidden>•</span>
            <span className="text-[var(--foreground)] leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    );
  }
  if (block.type === "image" && block.src) {
    const useNext = block.src.startsWith("/") && !block.src.startsWith("//");
    return (
      <div className="relative aspect-video overflow-hidden rounded-[var(--radius-lg)] bg-[var(--border-subtle)]">
        {useNext ? (
          <Image src={block.src} alt={block.alt ?? ""} fill className="object-cover" sizes="(max-width: 768px) 100vw, 80vw" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={block.src} alt={block.alt ?? ""} className="h-full w-full object-cover" />
        )}
      </div>
    );
  }
  return null;
}

export function CladdingPageLayout({ slug, meta, blocks, images }: CladdingPageLayoutProps) {
  return (
    <div dir="rtl" className="min-h-screen">
      <Section id="cladding-content" className="pb-16 pt-12 md:pb-24 md:pt-16">
        <Container className="max-w-4xl">
          <header className="mb-16 text-center">
            <h1 className="font-heading text-center text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
              {meta.title}
            </h1>
            <p className="mt-4 font-heading text-center max-w-2xl mx-auto text-lg leading-[1.85] font-medium text-[var(--foreground)]/90">
              {meta.subtitle}
            </p>
          </header>

          <div className="space-y-10">
            {blocks.map((block, i) => (
              <BlockRender key={i} block={block} slug={slug} />
            ))}
          </div>

          {images && images.length > 0 && (
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {images.map((src, i) => (
                <div key={i} className="relative aspect-video overflow-hidden rounded-[var(--radius-lg)] bg-[var(--border-subtle)]">
                  {src.startsWith("/") && !src.startsWith("//") ? (
                    <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section id="faq" className="border-t border-[var(--border-subtle)] bg-[var(--background)]/50 pb-20 pt-16 md:pb-24 md:pt-20">
        <Container className="max-w-3xl">
          <h2 className="heading-primary mb-10">
            שאלות ותשובות נפוצות
          </h2>
          <FaqAccordion items={meta.faq} />
        </Container>
      </Section>
    </div>
  );
}
