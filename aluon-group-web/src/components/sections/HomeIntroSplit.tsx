import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";

const SECTION1_IMAGE = "/section1.png";

/** First section below Hero: text right, image left (RTL). Desktop 2-col grid; mobile image then text. */
export function HomeIntroSplit() {
  return (
    <section id="intro" className="py-16 md:py-20">
      <Container className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* RTL: first column = right side = text */}
          <div className="text-right">
            <Heading as="h2" className="mb-4">
              פתרונות מעטפת מקצה לקצה
            </Heading>
            <p className="text-lg leading-relaxed text-[var(--foreground)] max-w-xl ms-auto">
              אנחנו מתמחים בתכנון, ייצור והתקנה של מעטפות בניין מתקדמות: חיפויי אלומיניום (אלוקובונד), HPL, וקירות מסך. מלווה אתכם מהשלב ההנדסי ועד המסירה, עם דגש על דיוק, עמידה בתקנים, רמת גימור גבוהה וניהול פרויקט מסודר—בפרויקטים בישראל ובאירופה.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--foreground)] underline-offset-4 transition-colors hover:underline"
            >
              עוד אודותינו
              <span aria-hidden>←</span>
            </Link>
          </div>
          {/* RTL: second column = left side = image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[var(--shadow-lg)]">
            <Image
              src={SECTION1_IMAGE}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
