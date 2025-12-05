import Link from "next/link";
import { NavTab } from "@/types/dashboard";

interface NavItem {
  label: string;
  href: string;
  key: NavTab;
}

interface NavigationProps {
  activeTab: NavTab;
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/", key: "overview" },
  { label: "My Agents", href: "/agents", key: "agents" },
  { label: "Chats", href: "/chats", key: "chats" },
  { label: "Leads", href: "/leads", key: "leads" },
];

export function Navigation({ activeTab }: NavigationProps) {
  return (
    <nav className="flex items-center gap-0.5 bg-white rounded-full p-0.5">
      {navItems.map((item) => {
        const isActive = item.key === activeTab;
        return (
          <Link
            key={item.key}
            href={item.href}
            className={`
              px-6 py-3
              text-sm font-semibold
              rounded-full
              transition-colors
              cursor-pointer
              ${
                isActive
                  ? "bg-[var(--color-brand-800)] text-white"
                  : "text-[var(--color-text-strong)] hover:bg-gray-100"
              }
            `}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
