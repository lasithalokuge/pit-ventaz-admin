import { PlusIcon, ChevronRightIcon } from "@/components/icons";
import { IconButton } from "@/components/ui/IconButton";
import { QuickAction } from "@/types/dashboard";
import Link from "next/link";

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Section Header */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-base font-semibold text-[var(--color-text-strong)]">
            Quick Actions
          </h2>
          <p className="text-sm font-semibold text-[var(--color-text-subtle)]">
            Set up, customize, or review your agent
          </p>
        </div>
      </div>

      {/* Actions List */}
      <div className="bg-white rounded-lg px-6 pt-6 pb-1.5 flex-1">
        <div className="flex flex-col gap-7">
          {actions.map((action) => (
            <Link
              key={action.id}
              href={action.href}
              className="flex items-center justify-between group"
            >
              <span className="text-sm font-medium text-[var(--color-text-strong)]">
                {action.label}
              </span>
              <IconButton
                variant={action.isPrimary ? "primary" : "default"}
                size="md"
              >
                {action.isPrimary ? (
                  <PlusIcon size={16} className="text-white" />
                ) : (
                  <ChevronRightIcon size={16} />
                )}
              </IconButton>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
