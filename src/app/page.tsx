import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsPreviewSection } from "@/components/sections/ProjectsPreviewSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ProjectsPreviewSection />
      <TestimonialsSection />
    </>
  );
}
