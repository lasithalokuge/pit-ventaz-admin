import { useState } from "react";
import {
  CalendarIcon,
  CalendarArrowLeftIcon,
  CalendarArrowRightIcon,
} from "@/components/icons";

interface DateRangePickerProps {
  onBack: () => void;
  onSetRange: (startDate: Date | null, endDate: Date | null) => void;
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

// Format: "12 Jan 2025"
function formatDateForInput(date: Date | null): string {
  if (!date) return "";
  const day = date.getDate();
  const month = MONTHS_SHORT[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function isSameDay(date1: Date | null, date2: Date | null): boolean {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isInRange(
  date: Date,
  startDate: Date | null,
  endDate: Date | null
): boolean {
  if (!startDate || !endDate) return false;
  const time = date.getTime();
  return time > startDate.getTime() && time < endDate.getTime();
}

interface DayInfo {
  day: number;
  isCurrentMonth: boolean;
  date: Date;
}

interface CalendarMonthProps {
  year: number;
  month: number;
  startDate: Date | null;
  endDate: Date | null;
  onDateSelect: (date: Date) => void;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  showPrevArrow?: boolean;
  showNextArrow?: boolean;
}

function CalendarMonth({
  year,
  month,
  startDate,
  endDate,
  onDateSelect,
  onPrevMonth,
  onNextMonth,
  showPrevArrow,
  showNextArrow,
}: CalendarMonthProps) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Previous month info
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  // Next month info
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  const days: DayInfo[] = [];

  // Add days from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    days.push({
      day,
      isCurrentMonth: false,
      date: new Date(prevYear, prevMonth, day),
    });
  }

  // Add days of current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
      date: new Date(year, month, i),
    });
  }

  // Add days from next month to complete the grid (5 rows = 35 cells)
  const remainingDays = 35 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
      date: new Date(nextYear, nextMonth, i),
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Month header with navigation */}
      <div className="flex items-center justify-between px-1">
        {showPrevArrow ? (
          <button
            onClick={onPrevMonth}
            className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
          >
            <CalendarArrowLeftIcon size={16} className="text-[#101828]" />
          </button>
        ) : (
          <div className="w-6" />
        )}
        <span className="text-sm font-semibold text-[#101828]">
          {MONTHS[month]} {year}
        </span>
        {showNextArrow ? (
          <button
            onClick={onNextMonth}
            className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
          >
            <CalendarArrowRightIcon size={16} className="text-[#101828]" />
          </button>
        ) : (
          <div className="w-6" />
        )}
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7">
        {DAYS.map((day) => (
          <div
            key={day}
            className="w-9 text-xs font-medium text-[#6a7282] text-center py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7">
        {days.map((dayInfo, index) => {
          const { day, isCurrentMonth, date } = dayInfo;
          const isStart = isSameDay(date, startDate);
          const isEnd = isSameDay(date, endDate);
          const isSelected = isStart || isEnd;
          const isRangeDay = isInRange(date, startDate, endDate);
          const isSameStartEnd = isStart && isEnd;
          const hasRange = startDate && endDate && !isSameStartEnd;

          // Determine background style for range highlighting
          let bgStyle = "";
          if (hasRange) {
            if (isStart) {
              // Start date: rounded left 8px, gray extends right
              bgStyle = "bg-[#eceef1] rounded-l-lg";
            } else if (isEnd) {
              // End date: rounded right 8px, gray extends left
              bgStyle = "bg-[#eceef1] rounded-r-lg";
            } else if (isRangeDay) {
              // In-range day: full gray background, no rounding
              bgStyle = "bg-[#eceef1]";
            }
          }

          // Button styles
          let buttonStyle = "";
          if (isSelected) {
            if (isSameStartEnd || !hasRange) {
              // Single selection or no range: 8px rounded
              buttonStyle = "bg-[#333e4f] text-white rounded-lg";
            } else if (isStart) {
              // Start with range: rounded left only 8px
              buttonStyle = "bg-[#333e4f] text-white rounded-l-lg";
            } else if (isEnd) {
              // End with range: rounded right only 8px
              buttonStyle = "bg-[#333e4f] text-white rounded-r-lg";
            }
          } else if (isRangeDay) {
            // In-between dates: darker text color #101828
            buttonStyle = "text-[#101828] rounded-lg";
          } else if (isCurrentMonth) {
            buttonStyle = "text-[#4a5565] hover:bg-gray-100 rounded-lg";
          } else {
            buttonStyle = "text-[#99a1af] hover:bg-gray-100 rounded-lg";
          }

          return (
            <div
              key={`${month}-${index}`}
              className={`w-9 h-9 flex items-center justify-center ${bgStyle}`}
            >
              <button
                onClick={() => onDateSelect(date)}
                className={`w-full h-full text-xs flex items-center justify-center transition-colors cursor-pointer ${buttonStyle}`}
                style={{ fontWeight: 600 }}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DateRangePicker({
  onBack,
  onSetRange,
  initialStartDate = null,
  initialEndDate = null,
}: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);
  const [selectingStart, setSelectingStart] = useState(true);

  // Current viewing month (left calendar)
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  // Right calendar is always the next month
  const rightMonth = viewMonth === 11 ? 0 : viewMonth + 1;
  const rightYear = viewMonth === 11 ? viewYear + 1 : viewYear;

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleDateSelect = (date: Date) => {
    if (selectingStart) {
      setStartDate(date);
      setEndDate(null);
      setSelectingStart(false);
    } else {
      // Make sure end date is after start date
      if (startDate && date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
      setSelectingStart(true);
    }
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectingStart(true);
  };

  const handleSetTimeRange = () => {
    onSetRange(startDate, endDate);
  };

  return (
    <div
      className="absolute top-full right-0 mt-[6px] z-50 p-4 rounded-xl min-w-[550px]"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(8px)",
        boxShadow:
          "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px 0px rgba(0,0,0,0.05)",
        border: "1px solid rgba(255, 255, 255, 1)",
      }}
    >
      {/* Header with back button */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center bg-[#e5e7eb] rounded-full hover:bg-[#d1d5dc] transition-colors cursor-pointer"
        >
          <CalendarArrowLeftIcon size={16} className="text-[#333e4f]" />
        </button>
      </div>

      {/* Date inputs */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-[#101828] mb-1">
            From
          </label>
          <div className="relative">
            <CalendarIcon
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6a7282]"
            />
            <input
              type="text"
              readOnly
              value={formatDateForInput(startDate)}
              placeholder=""
              className="w-full pl-10 pr-3 py-2 border border-[#d1d5dc] rounded-lg text-sm text-[#101828] placeholder-[#99a1af] bg-white focus:outline-none focus:border-[#333e4f]"
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-[#101828] mb-1">
            To
          </label>
          <div className="relative">
            <CalendarIcon
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6a7282]"
            />
            <input
              type="text"
              readOnly
              value={formatDateForInput(endDate)}
              placeholder=""
              className="w-full pl-10 pr-3 py-2 border border-[#d1d5dc] rounded-lg text-sm text-[#101828] placeholder-[#99a1af] bg-white focus:outline-none focus:border-[#333e4f]"
            />
          </div>
        </div>
      </div>

      {/* Dual calendars */}
      <div className="flex gap-3 mb-4">
        <CalendarMonth
          year={viewYear}
          month={viewMonth}
          startDate={startDate}
          endDate={endDate}
          onDateSelect={handleDateSelect}
          onPrevMonth={handlePrevMonth}
          showPrevArrow
          showNextArrow
          onNextMonth={handleNextMonth}
        />
        <CalendarMonth
          year={rightYear}
          month={rightMonth}
          startDate={startDate}
          endDate={endDate}
          onDateSelect={handleDateSelect}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          showPrevArrow
          showNextArrow
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleClear}
          className="flex-1 px-6 py-3 text-xs text-[#4a5565] border border-[#d1d5dc] rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
          style={{ fontWeight: 600 }}
        >
          Clear
        </button>
        <button
          onClick={handleSetTimeRange}
          disabled={!startDate || !endDate}
          className={`flex-1 px-6 py-3 text-xs rounded-full transition-colors cursor-pointer ${
            startDate && endDate
              ? "bg-[#1e2939] text-white hover:bg-[#2d3a4f]"
              : "bg-[#e5e7eb] text-[#99a1af] cursor-not-allowed"
          }`}
          style={{ fontWeight: 600 }}
        >
          Set Time Range
        </button>
      </div>
    </div>
  );
}
