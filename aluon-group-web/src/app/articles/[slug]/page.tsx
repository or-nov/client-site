import { PageRenderer } from "@/components/PageRenderer";

type Props = { params: Promise<{ slug: string }> };

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  return <PageRenderer pageKey={`article:${slug}`} />;
}
