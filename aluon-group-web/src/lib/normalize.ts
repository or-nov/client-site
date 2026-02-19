export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt?: string };

export function safeText(str: unknown): string {
  if (str == null) return "";
  const s = String(str).trim();
  return s;
}

export function getFirstParagraph(paragraphs: string[] | unknown): string {
  if (!Array.isArray(paragraphs) || paragraphs.length === 0) return "";
  const first = paragraphs[0];
  return safeText(first);
}

type ToBlocksInput = {
  paragraphs?: string[];
  bullets?: string[];
  images?: string[];
};

export function toBlocks(input: ToBlocksInput): ContentBlock[] {
  const paragraphs = Array.isArray(input.paragraphs) ? input.paragraphs : [];
  const bullets = Array.isArray(input.bullets) ? input.bullets : [];
  const images = Array.isArray(input.images) ? input.images : [];
  const blocks: ContentBlock[] = [];
  for (const text of paragraphs) {
    const t = safeText(text);
    if (t) blocks.push({ type: "paragraph", text: t });
  }
  if (bullets.length > 0) {
    blocks.push({ type: "list", items: bullets.map((b) => safeText(b)).filter(Boolean) });
  }
  for (const src of images) {
    if (safeText(src)) blocks.push({ type: "image", src: String(src).trim() });
  }
  return blocks;
}
