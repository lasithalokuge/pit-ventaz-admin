import { LeadIcon, ConversationIcon, ArrowRightIcon } from "@/components/icons";
import { IconButton } from "@/components/ui/IconButton";
import { Activity } from "@/types/dashboard";

interface RecentActivitiesProps {
  activities: Activity[];
}

const iconMap: Record<Activity["type"], React.ComponentType<{ className?: string; size?: number }>> = {
  lead_capture: LeadIcon,
  conversation: ConversationIcon,
  question_answered: ConversationIcon,
  other: ConversationIcon,
};

export function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Section Header */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-base font-semibold text-[var(--color-text-strong)]">
            Recent Activities
          </h2>
          <p className="text-sm font-semibold text-[var(--color-text-subtle)]">
            Track what your agent has been up to. Conversations, leads, and more
          </p>
        </div>
        <IconButton variant="default" size="md">
          <ArrowRightIcon size={16} />
        </IconButton>
      </div>

      {/* Activities List */}
      <div className="bg-white rounded-lg px-6 pt-6 pb-1.5 flex-1">
        <div className="flex flex-col">
          {activities.map((activity, index) => {
            const IconComponent = iconMap[activity.type];
            const isLast = index === activities.length - 1;

            return (
              <div
                key={activity.id}
                className={`flex items-center justify-between py-4 ${
                  !isLast ? "border-b border-[var(--color-border)]" : ""
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <IconComponent size={16} className="text-[var(--color-text-strong)]" />
                  <span className="text-sm font-medium text-[var(--color-text-strong)]">
                    {activity.title}
                  </span>
                </div>
                <span className="text-sm text-[var(--color-text-subtle)]">
                  {activity.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
