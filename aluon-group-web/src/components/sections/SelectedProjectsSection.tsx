"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { ProjectImageModal } from "@/components/modals/ProjectImageModal";
import { RevealMotion } from "@/components/RevealMotion";
import { AnimatedCard } from "@/components/AnimatedCard";

export type SelectedProjectItem = {
  title: string;
  image?: string;
};

type SelectedProjectsSectionProps = {
  items: SelectedProjectItem[];
};

/** Standalone "פרויקטים נבחרים" section: grid of project cards + image modal + "לכל הפרויקטים" button. */
export function SelectedProjectsSection({ items }: SelectedProjectsSectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <Section id="projects-preview">
      <Container>
        <RevealMotion>
          <div className="text-center">
            <h2 className="section-title">
              פרויקטים נבחרים
            </h2>
          </div>
        </RevealMotion>

        {items.length > 0 ? (
          <>
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => (
                <RevealMotion key={i} delay={i * 0.1}>
                  <div
                    role={item.image ? "button" : undefined}
                    tabIndex={item.image ? 0 : undefined}
                    onClick={() => item.image && setSelectedImage(item.image)}
                    onKeyDown={(e) => item.image && (e.key === "Enter" || e.key === " ") && setSelectedImage(item.image)}
                    className="group block cursor-pointer"
                  >
                    <AnimatedCard className="block overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--background-card)] shadow-lg">
                      <div className="relative aspect-[4/3] w-full shrink-0 bg-[var(--border-subtle)]">
                        {item.image ? (
                          item.image.startsWith("/imported/aluon") ? (
                            <Image
                              src={item.image}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.image}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          )
                        ) : null}
                      </div>
                      <div className="p-5 text-center">
                        <span className="card-title block text-base group-hover:underline">
                          {item.title}
                        </span>
                      </div>
                    </AnimatedCard>
                  </div>
                </RevealMotion>
              ))}
            </div>
            <Button href="/projects" variant="secondary">
              לכל הפרויקטים
            </Button>
          </>
        ) : (
          <Button href="/projects" variant="secondary">
            לכל הפרויקטים
          </Button>
        )}
      </Container>

      <ProjectImageModal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage ?? ""}
      />
    </Section>
  );
}
