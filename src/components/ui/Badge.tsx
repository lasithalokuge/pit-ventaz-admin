interface BadgeProps {
  count: number;
  variant?: "danger" | "success" | "default";
}

export function Badge({ count, variant = "danger" }: BadgeProps) {
  const variantClasses = {
    danger: "bg-[var(--color-danger)] border-red-200",
    success: "bg-[var(--color-success)] border-green-200",
    default: "bg-gray-500 border-gray-300",
  };

  return (
    <span
      className={`
        absolute -top-0.5 -right-0.5
        min-w-[16px] h-[16px]
        flex items-center justify-center
        rounded-full border
        text-[10px] font-medium text-white
        ${variantClasses[variant]}
      `}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
