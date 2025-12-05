import { DataCard } from "./DataCard";
import { MetricCard } from "@/types/dashboard";

interface DataCardsGridProps {
  cards: MetricCard[];
}

export function DataCardsGrid({ cards }: DataCardsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <DataCard key={card.id} card={card} />
      ))}
    </div>
  );
}
