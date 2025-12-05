import React from "react";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "default" | "danger";
}

export function ActionButton({
  icon,
  label,
  onClick,
  disabled = false,
  variant = "default",
}: ActionButtonProps) {
  const baseClasses =
    "flex items-center gap-0.5 pl-2.5 pr-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer";

  const variantClasses =
    variant === "danger"
      ? "bg-[var(--color-danger-soft)] text-[var(--color-danger)] hover:bg-[#ffccd3]"
      : "bg-[var(--color-brand-200)] text-[var(--color-text-fg-brand)] hover:bg-gray-300";

  const disabledClasses = disabled ? "opacity-45 !cursor-not-allowed hover:bg-[var(--color-brand-200)]" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${disabledClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

interface IconActionButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "default" | "danger";
  "aria-label": string;
}

export function IconActionButton({
  icon,
  onClick,
  disabled = false,
  variant = "default",
  "aria-label": ariaLabel,
}: IconActionButtonProps) {
  const baseClasses =
    "flex items-center justify-center w-8 h-8 rounded-full transition-colors cursor-pointer";

  const variantClasses =
    variant === "danger"
      ? disabled
        ? "bg-[var(--color-danger-soft)] text-[var(--color-danger)] opacity-45 !cursor-not-allowed"
        : "bg-[var(--color-danger-soft)] text-[var(--color-danger)] hover:bg-[#ffccd3]"
      : disabled
        ? "bg-[var(--color-brand-200)] text-[var(--color-text-fg-brand)] opacity-45 !cursor-not-allowed"
        : "bg-[var(--color-brand-200)] text-[var(--color-text-fg-brand)] hover:bg-gray-300";

  return (
    <button
      className={`${baseClasses} ${variantClasses}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
}
