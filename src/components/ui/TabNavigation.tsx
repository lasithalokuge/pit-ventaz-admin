import React from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabsWithChanges?: string[];
}

export function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
  tabsWithChanges = [],
}: TabNavigationProps) {
  return (
    <div className="w-full border-b border-[#d1d5dc]">
      <nav className="flex gap-8">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const hasChanges = tabsWithChanges.includes(tab.id);
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-1.5 pb-4 text-sm font-medium transition-colors cursor-pointer ${
                isActive
                  ? "text-[#333e4f] border-b border-[#333e4f]"
                  : "text-[#4a5565] hover:text-[#333e4f]"
              }`}
            >
              {tab.label}
              {/* Fixed width container for dot to prevent layout shift */}
              <div className="w-1.5 h-5 flex items-start">
                {hasChanges && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f]" />
                )}
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
