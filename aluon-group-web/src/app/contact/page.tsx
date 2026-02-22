import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";

export default function ContactPage() {
  return (
    <div dir="rtl">
      <Section className="border-t border-white/10">
        <Container className="mx-auto max-w-2xl">
          <Heading as="h2" className="mb-3 text-center">
            טופס צור קשר
          </Heading>
          <p className="mb-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
            השאר פרטיך ונחזור אליך בהקדם. בחר את המחלקה הרלוונטית ומיל את השדות.
          </p>
          <ContactForm />

          {/* פרטי יצירת קשר – מתחת לטופס, אותו רוחב קונטיינר */}
          <div className="mt-8 border-t border-[var(--border-subtle)] pt-6">
            <p className="mb-3 text-sm font-medium text-[var(--foreground)]">פרטי יצירת קשר</p>
            <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <p>
                אימייל:{" "}
                <a
                  href="mailto:aluoncoil@gmail.com"
                  className="font-medium text-[var(--foreground)] underline-offset-2 hover:underline"
                >
                  aluoncoil@gmail.com
                </a>
              </p>
              {/* TODO: להחליף לטקסט/לינק tel: כשמספר הטלפון יהיה זמין */}
              <p>טלפון: מספר הטלפון יתווסף בקרוב</p>
              <p>
                כתובת:{" "}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=חלוצי+התעשייה+חיפה"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--foreground)] underline-offset-2 hover:underline"
                >
                  חלוצי התעשייה, חיפה
                </a>
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
