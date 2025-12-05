import React from "react";

interface InputProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  helperText?: string;
  labelIcon?: React.ReactNode;
}

export function Input({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  helperText,
  labelIcon,
}: InputProps) {
  const inputClasses = disabled
    ? "bg-[#f9fafb] border-[#f3f4f6] text-[#99a1af]"
    : "bg-[#f9fafb] border-[#d1d5dc] text-[#101828]";

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label */}
      <div className="flex items-center gap-1">
        <label className="text-sm font-medium text-[#101828] leading-5">
          {label}
        </label>
        {labelIcon && labelIcon}
      </div>

      {/* Input field */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-2.5 py-2 rounded-lg border text-sm leading-5 outline-none transition-colors ${inputClasses}`}
      />

      {/* Helper text */}
      {helperText && (
        <p className="text-xs text-[#6a7282] leading-5">{helperText}</p>
      )}
    </div>
  );
}
