import { Layout } from "@/components/layout/Layout";
import { PageHeading } from "@/components/ui/PageHeading";
import { DataCardsGrid } from "@/components/dashboard/DataCardsGrid";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ChevronDownIcon } from "@/components/icons";
import {
  currentUser,
  metricsRow1,
  metricsRow2,
  recentActivities,
  quickActions,
} from "@/data/mockData";

export default function Overview() {
  return (
    <Layout activeTab="overview" user={currentUser} notificationCount={1}>
      <div className="flex flex-col gap-8">
        {/* Page Heading */}
        <PageHeading
          title={`Welcome Back, ${currentUser.name}`}
          subtitle="Here's what's happening with your AI agent"
          actions={
            <button className="flex items-center gap-0.5 px-4 py-1.5 bg-[var(--color-brand-200)] rounded-full text-sm text-[var(--color-text-strong)] hover:bg-gray-300 transition-colors cursor-pointer">
              <span>Past 30 days</span>
              <ChevronDownIcon size={16} className="text-[var(--color-text-strong)]" />
            </button>
          }
        />

        {/* Dashboard Numbers - Two Rows of Data Cards */}
        <div className="flex flex-col gap-6 mb-[52px]">
          <DataCardsGrid cards={metricsRow1} />
          <DataCardsGrid cards={metricsRow2} />
        </div>

        {/* Bottom Section - Recent Activities and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_448px] gap-6 items-stretch">
          <RecentActivities activities={recentActivities} />
          <QuickActions actions={quickActions} />
        </div>
      </div>
    </Layout>
  );
}
