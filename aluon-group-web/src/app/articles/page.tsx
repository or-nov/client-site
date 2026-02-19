import Link from "next/link";
import { loadAluonContent } from "@/lib/aluon-content";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Prose } from "@/components/ui/Prose";
import { Card } from "@/components/ui/Card";

const KNOWN_ARTICLE_SLUGS = [
  "alucobond-facade-cladding-guide",
  "hpl-exterior-cladding-israel",
  "curtain-wall-systems-architectural-guide",
];

export default function ArticlesListPage() {
  const content = loadAluonContent();
  const articleKeys = Object.keys(content).filter((k) =>
    k.startsWith("articles__")
  );

  const slugs =
    articleKeys.length > 0
      ? articleKeys.map((k) => k.replace(/^articles__/, ""))
      : KNOWN_ARTICLE_SLUGS;

  return (
    <Section>
      <Container className="max-w-3xl">
        <Heading as="h1" className="mb-8">
          מאמרים ומגזין
        </Heading>
        {slugs.length === 0 ? (
          <Prose>
            <p className="text-zinc-500">אין מאמרים כרגע.</p>
          </Prose>
        ) : (
          <ul className="space-y-4">
            {slugs.map((slug) => {
              const key = `articles__${slug}`;
              const data = content[key] as { h1?: string; title?: string } | undefined;
              const label = data?.h1 || data?.title || slug;
              return (
                <li key={slug}>
                  <Link href={`/articles/${slug}`}>
                    <Card className="block px-4 py-3 transition-colors hover:border-white/20">
                      {label}
                    </Card>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Container>
    </Section>
  );
}
