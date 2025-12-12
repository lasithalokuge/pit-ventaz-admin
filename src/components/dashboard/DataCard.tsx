import {
  MessagesIcon,
  ClockIcon,
  UsersIcon,
  WifiIcon,
  ThumbsUpIcon,
  TimelapseIcon,
  InfoIcon,
  CalendarArrowRightIcon,
  TrendUpIcon,
  ActiveVisitorsIcon,
  StopwatchIcon,
  QuestionSquareIcon,
  ClockCircleIcon,
} from "@/components/icons";
import { IconButton } from "@/components/ui/IconButton";
import { CardIcon } from "@/components/ui/CardIcon";
import { MetricCard } from "@/types/dashboard";

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  messages: MessagesIcon,
  clock: ClockIcon,
  users: UsersIcon,
  wifi: WifiIcon,
  thumbsUp: ThumbsUpIcon,
  timelapse: TimelapseIcon,
  activeVisitors: ActiveVisitorsIcon,
  stopwatch: StopwatchIcon,
  questionSquare: QuestionSquareIcon,
  clockCircle: ClockCircleIcon,
};

interface DataCardProps {
  card: MetricCard;
}

export function DataCard({ card }: DataCardProps) {
  const IconComponent = iconMap[card.icon] || MessagesIcon;
  const isPositive = card.trend === "up";

  return (
    <div className="bg-white rounded-lg p-6 flex flex-col gap-[58px]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-0">
          {/* Icon */}
          <div className="mb-1 overflow-visible">
            <CardIcon showGlassEffect={card.hasGlassEffect}>
              <IconComponent size={18} className="text-[var(--color-text-strong)]" />
            </CardIcon>
          </div>

          {/* Title with Info */}
          <div className="flex items-center gap-1 relative z-10">
            <span className="text-sm font-medium text-[var(--color-text-strong)]">
              {card.title}
            </span>
            <InfoIcon size={14} className="text-[var(--color-text-brand-strong)]" />
          </div>

          {/* Description */}
          {card.description && (
            <span className="text-xs text-[var(--color-text-light)]">
              {card.description}
            </span>
          )}
        </div>

        {/* Action Button */}
        {card.hasAction && (
          <IconButton variant="default" size="md">
            <CalendarArrowRightIcon size={16} />
          </IconButton>
        )}
      </div>

      {/* Value and Performance */}
      <div className="flex items-center gap-2.5">
        <span className="text-5xl font-medium text-[var(--color-text-strong)]">
          {card.value}
        </span>
        <div className="flex items-center gap-0.5 pt-[22px]">
          <span className="text-base font-medium text-[var(--color-text-light)]">
            {card.percentageChange}%
          </span>
          <TrendUpIcon
            size={14}
            className={isPositive ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"}
          />
        </div>
      </div>
    </div>
  );
}
