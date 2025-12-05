import { useRouter } from "next/router";
import { Layout } from "@/components/layout/Layout";
import { PageHeading } from "@/components/ui/PageHeading";
import { AgentCard } from "@/components/agents/AgentCard";
import { PlusIcon } from "@/components/icons";
import { currentUser } from "@/data/mockData";
import { useAgents } from "@/context/AgentContext";

export default function Agents() {
  const router = useRouter();
  const { agents } = useAgents();

  const handleEdit = (agentId: string) => {
    router.push(`/agents/${agentId}/edit`);
  };

  return (
    <Layout activeTab="agents" user={currentUser} notificationCount={1}>
      <div className="flex flex-col gap-8">
        <PageHeading
          title="My Agents"
          subtitle="View, manage, and customize your AI agents"
          actions={
            <button className="flex items-center gap-1.5 px-3 py-2 bg-[var(--color-bg-brand)] text-white rounded-full text-sm font-medium shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
              <PlusIcon size={16} className="text-white" />
              <span>Create New Agent</span>
            </button>
          }
        />
        <div className="flex flex-col gap-4">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onPreview={() => console.log("Preview", agent.id)}
              onAddToWebsite={() => console.log("Add to website", agent.id)}
              onEdit={() => handleEdit(agent.id)}
              onDelete={() => console.log("Delete", agent.id)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
