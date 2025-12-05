import React from "react";
import { ChevronDownIcon } from "@/components/icons";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export function Select({
  label,
  value,
  options,
  onChange,
  disabled = false,
}: SelectProps) {
  const selectClasses = disabled
    ? "bg-[#f9fafb] border-[#f3f4f6] text-[#99a1af]"
    : "bg-[#f9fafb] border-[#d1d5dc] text-[#101828]";

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label */}
      <label className="text-sm font-medium text-[#101828] leading-5">
        {label}
      </label>

      {/* Select field */}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className={`w-full px-2.5 py-2 pr-8 rounded-lg border text-sm leading-5 outline-none appearance-none cursor-pointer transition-colors ${selectClasses}`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDownIcon size={16} className="text-[#101828]" />
        </div>
      </div>
    </div>
  );
}
