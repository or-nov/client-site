import React from "react";
import Image from "next/image";
import { siteContent } from "@/content/siteContent";
import type { ContentBlock, PageContent } from "@/content/siteContent";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Prose } from "@/components/ui/Prose";
import { Button } from "@/components/ui/Button";

function getContent(pageKey: string): { title: string; blocks: ContentBlock[]; images?: string[] } | null {
  if (pageKey === "about" || pageKey === "projects" || pageKey === "articles" || pageKey === "contact") {
    const page = siteContent.pages[pageKey] as PageContent;
    return page ? { title: page.title, blocks: page.blocks, images: page.images } : null;
  }
  if (pageKey.startsWith("claddings:")) {
    const slug = pageKey.slice("claddings:".length);
    const page = siteContent.claddings[slug];
    return page ? { title: page.title, blocks: page.blocks, images: page.images } : null;
  }
  if (pageKey.startsWith("article:")) {
    const slug = pageKey.slice("article:".length);
    const article = siteContent.articles.find((a) => a.slug === slug);
    return article
      ? { title: article.title, blocks: article.blocks, images: article.images }
      : null;
  }
  return null;
}

function BlockContent({ block }: { block: ContentBlock }) {
  if (block.type === "paragraph") {
    return (
      <Prose>
        <p>{block.text}</p>
      </Prose>
    );
  }
  if (block.type === "list") {
    return (
      <Prose>
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </Prose>
    );
  }
  if (block.type === "image" && block.src) {
    const useNextImage = block.src.startsWith("/imported/aluon");
    return (
      <div className="relative aspect-video overflow-hidden rounded-[var(--radius-lg)] bg-white/5">
        {useNextImage ? (
          <Image
            src={block.src}
            alt={block.alt ?? ""}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={block.src} alt={block.alt ?? ""} className="h-full w-full object-cover" />
        )}
      </div>
    );
  }
  return null;
}

export function PageRenderer(props: { pageKey: string }): React.JSX.Element {
  const { pageKey } = props;
  const content = getContent(pageKey);

  if (!content) {
    return (
      <Section>
        <Container>
          <Prose>
            <p className="text-zinc-500">תוכן לא נמצא.</p>
          </Prose>
        </Container>
      </Section>
    );
  }

  // About page: two-column luxury layout (image left, text + CTA right on desktop; stacked on mobile)
  if (pageKey === "about") {
    const paragraphBlocks = content.blocks.filter((b): b is ContentBlock & { type: "paragraph" } => b.type === "paragraph");
    const imageBlock = content.blocks.find((b): b is ContentBlock & { type: "image" } => b.type === "image");
    const mainImageSrc = imageBlock?.src ?? content.images?.[0];
    const useNextImage = mainImageSrc?.startsWith("/imported/aluon") ?? false;

    return (
      <Section className="border-t border-white/10">
        <div dir="rtl">
          <Container className="max-w-6xl">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
              {/* Right column on desktop (first in RTL): title + text + CTA */}
              <div className="flex min-w-0 flex-1 flex-col lg:justify-center">
                <h1 className="mb-6 heading-primary text-start">
                  {content.title}
                </h1>
                <div className="space-y-5">
                  {paragraphBlocks.map((block, i) => (
                    <Prose
                      key={i}
                      className="text-lg font-medium text-[var(--foreground)]/90 [&_p]:leading-[1.85] [&_p]:text-lg [&_p]:font-medium dark:text-[var(--foreground)] dark:[&_p]:text-[var(--foreground)]/90"
                    >
                      <p>{block.text}</p>
                    </Prose>
                  ))}
                </div>
                <div className="mt-8">
                  <Button href="/contact" variant="primary">
                    השאירו פרטים ונחזור אליכם
                  </Button>
                </div>
              </div>
              {/* Left column on desktop (second in RTL): image */}
              {mainImageSrc && (
                <div className="relative aspect-[4/3] min-h-[280px] w-full shrink-0 overflow-hidden rounded-3xl bg-white/5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.05)] lg:max-w-[48%] lg:aspect-[3/4]">
                  {useNextImage ? (
                    <Image
                      src={mainImageSrc}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 48vw"
                      priority
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={mainImageSrc} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
              )}
            </div>
          </Container>
        </div>
      </Section>
    );
  }

  return (
    <Section className="border-t border-white/10">
      <div dir="rtl">
        <Container className="max-w-3xl">
          <Heading as="h1" className="mb-8">
            {content.title}
          </Heading>
          <div className="space-y-6">
            {content.blocks.map((block, i) => (
              <BlockContent key={i} block={block} />
            ))}
          </div>
          {content.images && content.images.length > 0 && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {content.images.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-video overflow-hidden rounded-[var(--radius-lg)] bg-white/5"
                >
                  {src.startsWith("/imported/aluon") ? (
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
              ))}
            </div>
          )}
        </Container>
      </div>
    </Section>
  );
}
