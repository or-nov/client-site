import { PageRenderer } from "@/components/PageRenderer";
import { CladdingPageLayout } from "@/components/CladdingPageLayout";
import { siteContent } from "@/content/siteContent";
import { claddingPageMeta } from "@/content/claddingPageData";

type Props = { params: Promise<{ slug: string }> };

export default async function CladdingPage({ params }: Props) {
  const { slug } = await params;
  const meta = claddingPageMeta[slug];
  const content = siteContent.claddings[slug];

  if (meta && content) {
    return (
      <CladdingPageLayout
        slug={slug}
        meta={meta}
        blocks={content.blocks}
        images={content.images}
      />
    );
  }

  return <PageRenderer pageKey={`claddings:${slug}`} />;
}
