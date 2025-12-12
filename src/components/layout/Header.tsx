import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Navigation } from "./Navigation";
import { Badge } from "@/components/ui/Badge";
import { ProfileDropdown } from "./ProfileDropdown";
import {
  QuestionIcon,
  BellIcon,
  ChevronDownIcon,
} from "@/components/icons";
import { NavTab, User } from "@/types/dashboard";

interface HeaderProps {
  activeTab: NavTab;
  user: User;
  notificationCount?: number;
}

export function Header({ activeTab, user, notificationCount = 0 }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside detection
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="relative flex items-center justify-between px-6 py-4">
      {/* Logo */}
      <div className="flex items-center">
        <Image src="/logo.svg" alt="Ventaz" width={30} height={24} />
      </div>

      {/* Navigation - Centered */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <Navigation activeTab={activeTab} />
      </div>

      {/* Right side - Settings, Notifications, Profile */}
      <div className="flex items-center gap-0.5 bg-white rounded-full p-0.5">
        {/* Support */}
        <button className="relative flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[var(--color-brand-200)] hover:bg-gray-300 transition-colors cursor-pointer">
          <QuestionIcon size={24} className="text-[var(--color-text-subtle)]" />
        </button>

        {/* Notifications */}
        <button className="relative flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[var(--color-brand-200)] hover:bg-gray-300 transition-colors cursor-pointer">
          <BellIcon size={24} className="text-[var(--color-text-subtle)]" />
          {notificationCount > 0 && (
            <Badge count={notificationCount} variant="danger" />
          )}
        </button>

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 pr-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"
          >
            {/* Avatar */}
            <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center overflow-hidden border border-white bg-gray-300">
              <Image
                src="/avatar.svg"
                alt={user.name}
                width={42}
                height={42}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name and Email */}
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-[var(--color-text-strong)]">
                {user.name}
              </span>
              <span className="text-xs text-[var(--color-text-subtle)] max-w-[115px] truncate">
                {user.email}
              </span>
            </div>

            <ChevronDownIcon
              size={16}
              className={`text-[var(--color-text-strong)] transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <ProfileDropdown onClose={() => setIsDropdownOpen(false)} />
          )}
        </div>
      </div>
    </header>
  );
}
