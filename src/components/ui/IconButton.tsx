import React from "react";

interface IconButtonProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export function IconButton({
  children,
  variant = "default",
  size = "md",
  className = "",
  onClick,
}: IconButtonProps) {
  const variantClasses = {
    default: "bg-[var(--color-brand-200)] text-[var(--color-text-strong)] hover:bg-gray-300",
    primary: "bg-[var(--color-brand-800)] text-white hover:bg-gray-700",
    ghost: "bg-transparent text-[var(--color-text-subtle)] hover:bg-gray-100",
  };

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-9 h-9",
    lg: "w-10 h-10",
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center
        rounded-full
        transition-colors
        cursor-pointer
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
