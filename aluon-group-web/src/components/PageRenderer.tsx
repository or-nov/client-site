import React from "react";
import Image from "next/image";
import { siteContent } from "@/content/siteContent";
import type { ContentBlock, PageContent } from "@/content/siteContent";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Prose } from "@/components/ui/Prose";

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
