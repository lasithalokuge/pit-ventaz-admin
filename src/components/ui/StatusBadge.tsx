import { AgentStatus } from "@/types/dashboard";

interface StatusBadgeProps {
  status: AgentStatus;
}

const statusConfig: Record<
  AgentStatus,
  { label: string; bgColor: string; borderColor: string; textColor: string }
> = {
  draft: {
    label: "Draft",
    bgColor: "var(--color-warning-soft)",
    borderColor: "var(--color-warning-border)",
    textColor: "var(--color-warning)",
  },
  ready: {
    label: "Ready",
    bgColor: "var(--color-info-soft)",
    borderColor: "var(--color-info-border)",
    textColor: "var(--color-info)",
  },
  live: {
    label: "Live",
    bgColor: "var(--color-success-soft)",
    borderColor: "var(--color-success-border)",
    textColor: "var(--color-success-text)",
  },
  inactive: {
    label: "Inactive",
    bgColor: "#f3f4f6",
    borderColor: "#d1d5dc",
    textColor: "#6a7282",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div
      className="inline-flex items-center justify-center px-1 py-0.5 rounded-md border text-xs font-medium leading-4"
      style={{
        backgroundColor: config.bgColor,
        borderColor: config.borderColor,
        color: config.textColor,
      }}
    >
      {config.label}
    </div>
  );
}
