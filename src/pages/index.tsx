import { Layout } from "@/components/layout/Layout";
import { PageHeading } from "@/components/ui/PageHeading";
import { DataCardsGrid } from "@/components/dashboard/DataCardsGrid";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { TimeRangeDropdown } from "@/components/dashboard/TimeRangeDropdown";
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
          actions={<TimeRangeDropdown />}
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
