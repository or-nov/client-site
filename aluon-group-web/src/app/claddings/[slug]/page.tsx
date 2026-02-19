import { PageRenderer } from "@/components/PageRenderer";

type Props = { params: Promise<{ slug: string }> };

export default async function CladdingPage({ params }: Props) {
  const { slug } = await params;
  return <PageRenderer pageKey={`claddings:${slug}`} />;
}
