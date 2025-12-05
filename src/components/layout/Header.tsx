import Image from "next/image";
import { Navigation } from "./Navigation";
import { Badge } from "@/components/ui/Badge";
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
        <button className="flex items-center gap-2 pr-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer">
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

          <ChevronDownIcon size={16} className="text-[var(--color-text-strong)]" />
        </button>
      </div>
    </header>
  );
}
