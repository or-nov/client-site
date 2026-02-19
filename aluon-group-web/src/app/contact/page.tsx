import { ContactForm } from "@/components/ContactForm";
import { PageRenderer } from "@/components/PageRenderer";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";

export default function ContactPage() {
  return (
    <div dir="rtl">
      <PageRenderer pageKey="contact" />
      <Section className="border-t border-white/10">
        <Container className="max-w-xl">
          <Heading as="h2" className="mb-6">
            טופס צור קשר
          </Heading>
          <ContactForm />
        </Container>
      </Section>
    </div>
  );
}
