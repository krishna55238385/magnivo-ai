import { createFileRoute } from "@tanstack/react-router";
import { HeroVisual } from "@/components/HeroVisual";

export const Route = createFileRoute("/dashboard-image")({
  component: DashboardImagePage,
});

function DashboardImagePage() {
  return (
    <div className="min-h-screen bg-[var(--surface-ivory)] flex items-center justify-center p-10">
      <div className="w-full max-w-[980px]">
        <HeroVisual />
      </div>
    </div>
  );
}
