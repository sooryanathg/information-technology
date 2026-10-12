import Cards from "@/components/pages/events/cards";
import HeroSection from "@/components/pages/events/herosection";

// Re-render hourly, so events move to "past" (and turn grey) soon after their date.
export const revalidate = 3600;

export default function EventsPage() {
  return (
    <main>
      <HeroSection />
      <Cards />
    </main>
  );
}
