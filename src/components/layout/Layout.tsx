import { Header } from "./Header";
import { NavTab, User } from "@/types/dashboard";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  activeTab: NavTab;
  user: User;
  notificationCount?: number;
}

export function Layout({
  children,
  activeTab,
  user,
  notificationCount,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--color-brand-100)]">
      <div className="max-w-[1440px] mx-auto">
        <Header
          activeTab={activeTab}
          user={user}
          notificationCount={notificationCount}
        />
        <main className="px-6 pb-6 pt-[48px]">{children}</main>
      </div>
    </div>
  );
}
