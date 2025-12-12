import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, CheckIcon } from "@/components/icons";
import { DateRangePicker } from "./DateRangePicker";

type TimeRange = "today" | "past7days" | "past30days" | "past90days" | "custom";

interface TimeRangeOption {
  value: TimeRange;
  label: string;
}

const timeRangeOptions: TimeRangeOption[] = [
  { value: "today", label: "Today" },
  { value: "past7days", label: "Past 7 days" },
  { value: "past30days", label: "Past 30 days" },
  { value: "past90days", label: "Past 90 days" },
  { value: "custom", label: "Custom date range" },
];

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDateRange(startDate: Date | null, endDate: Date | null): string {
  if (!startDate || !endDate) return "Custom date range";
  const formatDate = (d: Date) => {
    const day = d.getDate();
    const month = MONTHS_SHORT[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

interface TimeRangeDropdownProps {
  value?: TimeRange;
  onChange?: (value: TimeRange) => void;
}

export function TimeRangeDropdown({ value = "past30days", onChange }: TimeRangeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedValue, setSelectedValue] = useState<TimeRange>(value);
  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = timeRangeOptions.find((opt) => opt.value === selectedValue);

  // Get display label - for custom, show the date range if set
  const displayLabel =
    selectedValue === "custom" && customStartDate && customEndDate
      ? formatDateRange(customStartDate, customEndDate)
      : selectedOption?.label;

  // Click outside detection
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowDatePicker(false);
      }
    }

    if (isOpen || showDatePicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, showDatePicker]);

  const handleSelect = (optionValue: TimeRange) => {
    if (optionValue === "custom") {
      setShowDatePicker(true);
      setIsOpen(false);
    } else {
      setSelectedValue(optionValue);
      setCustomStartDate(null);
      setCustomEndDate(null);
      onChange?.(optionValue);
      setIsOpen(false);
    }
  };

  const handleDateRangeBack = () => {
    setShowDatePicker(false);
    setIsOpen(true);
  };

  const handleSetDateRange = (startDate: Date | null, endDate: Date | null) => {
    setCustomStartDate(startDate);
    setCustomEndDate(endDate);
    setSelectedValue("custom");
    onChange?.("custom");
    setShowDatePicker(false);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => {
          if (showDatePicker || isOpen) {
            // Close everything if date picker or dropdown is open
            setShowDatePicker(false);
            setIsOpen(false);
          } else {
            // Open dropdown
            setIsOpen(true);
          }
        }}
        className="flex items-center gap-1 pl-4 pr-2.5 py-1.5 bg-[#e5e7eb] text-[#333e4f] rounded-full text-sm hover:bg-gray-300 transition-colors cursor-pointer"
      >
        <span>{displayLabel}</span>
        <ChevronDownIcon
          size={16}
          className={`text-[var(--color-text-strong)] transition-transform ${isOpen || showDatePicker ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full right-0 mt-[6px] z-50 flex flex-col gap-0 py-2 pl-2 pr-4 rounded-xl min-w-[180px]"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
            boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px 0px rgba(0,0,0,0.05)",
            border: "1px solid rgba(255, 255, 255, 1)",
          }}
        >
          {timeRangeOptions.map((option) => {
            const isSelected = option.value === selectedValue;
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`flex items-center justify-between gap-1.5 w-full p-2 rounded-lg text-sm font-medium transition-colors hover:bg-[#f3f4f6] cursor-pointer whitespace-nowrap ${
                  isSelected ? "text-[#101828]" : "text-[#4a5565]"
                }`}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <CheckIcon size={16} className="text-[#4a5565]" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Date Range Picker */}
      {showDatePicker && (
        <DateRangePicker
          onBack={handleDateRangeBack}
          onSetRange={handleSetDateRange}
          initialStartDate={customStartDate}
          initialEndDate={customEndDate}
        />
      )}
    </div>
  );
}
