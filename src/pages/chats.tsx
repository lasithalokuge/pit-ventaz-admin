import { Layout } from "@/components/layout/Layout";
import { PageHeading } from "@/components/ui/PageHeading";
import { currentUser } from "@/data/mockData";

export default function Chats() {
  return (
    <Layout activeTab="chats" user={currentUser} notificationCount={1}>
      <div className="flex flex-col gap-8">
        <PageHeading
          title="Chats"
          subtitle="View and manage conversations with your customers"
        />
        <div className="bg-white rounded-lg p-8 flex items-center justify-center min-h-[400px]">
          <p className="text-[var(--color-text-light)]">
            Chat interface coming soon...
          </p>
        </div>
      </div>
    </Layout>
  );
}
