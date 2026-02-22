import { siteContent } from "@/content/siteContent";
import { SelectedProjectsSection } from "@/components/sections/SelectedProjectsSection";

export default function ProjectsPage() {
  const { projectsPreview } = siteContent.home;

  return (
    <div dir="rtl">
      <SelectedProjectsSection items={projectsPreview} />
    </div>
  );
}
