"use client";

import Link from "next/link";
import Image from "next/image";
import { RevealMotion } from "@/components/RevealMotion";

type ArticleCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  /** First image used as featured; optional. */
  featuredImage?: string | null;
  /** Publish date (ISO YYYY-MM-DD). Displayed in he-IL. */
  date?: string;
  /** Stagger delay in seconds for reveal animation. */
  delay?: number;
};

function isLocalImage(src: string): boolean {
  return src.startsWith("/") && !src.startsWith("//");
}

function formatArticleDate(isoDate: string): string {
  try {
    const d = new Date(isoDate + "T12:00:00");
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return "";
  }
}

export function ArticleCard({ slug, title, excerpt, featuredImage, date, delay = 0 }: ArticleCardProps) {
  const href = `/articles/${slug}`;
  const alt = title;

  return (
    <RevealMotion delay={delay}>
      <article className="h-full overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-[var(--background-card)]">
        <Link href={href} className="group flex h-full flex-col" dir="rtl">
          {/* Featured image: rounded-t-2xl, aspect-video, zoom on hover */}
          <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-[var(--border-subtle)]">
            {featuredImage ? (
              isLocalImage(featuredImage) ? (
                <Image
                  src={featuredImage}
                  alt={alt}
                  fill
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featuredImage}
                  alt={alt}
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
              )
            ) : (
              <div
                className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--border-subtle)] to-[var(--background)]"
                aria-hidden
              >
                <span className="text-4xl text-[var(--foreground)]/20">📄</span>
              </div>
            )}
          </div>
          {/* Content wrapper: white, rounded-b-2xl, shadow, padding */}
          <div className="flex flex-1 flex-col rounded-b-2xl p-6">
            <h3 className="text-center font-heading text-lg font-bold tracking-tight text-[var(--foreground)] md:text-xl">
              {title}
            </h3>
            {date && (
              <p className="mt-2 text-center text-xs text-[var(--foreground)]/70" aria-label="תאריך פרסום">
                {formatArticleDate(date)}
              </p>
            )}
            {excerpt && (
              <p className="mt-3 line-clamp-2 text-center text-sm leading-relaxed text-[var(--foreground)]/80">
                {excerpt}
              </p>
            )}
            <span className="mt-4 inline-flex items-center justify-center gap-1 text-sm font-medium text-[var(--foreground)] underline-offset-4 transition-all group-hover:gap-2 group-hover:underline">
              קרא עוד
              <span aria-hidden>←</span>
            </span>
          </div>
        </Link>
      </article>
    </RevealMotion>
  );
}
