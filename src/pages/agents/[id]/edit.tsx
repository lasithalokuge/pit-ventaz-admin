import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Layout } from "@/components/layout/Layout";
import { PageHeading } from "@/components/ui/PageHeading";
import { TabNavigation } from "@/components/ui/TabNavigation";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FormSection } from "@/components/agents/edit/FormSection";
import { CloseIcon, QuestionCircleIcon } from "@/components/icons";
import { currentUser, communicationToneOptions } from "@/data/mockData";
import { useAgents } from "@/context/AgentContext";
import { EditAgentTab } from "@/types/dashboard";

const TABS = [
  { id: "general", label: "General" },
  { id: "widget", label: "Widget Customization" },
  { id: "behavior", label: "Behavior & Goals" },
  { id: "knowledge", label: "Knowledge Base" },
  { id: "integrations", label: "Integrations" },
  { id: "notifications", label: "Notifications" },
  { id: "preview", label: "Preview" },
];

export default function EditAgentPage() {
  const router = useRouter();
  const { id } = router.query;
  const { agentDetails, updateAgentDetails } = useAgents();

  const [activeTab, setActiveTab] = useState<EditAgentTab>("general");

  // Get agent details
  const agent = id ? agentDetails[id as string] : null;

  // Original form data (to compare for changes)
  const [originalData, setOriginalData] = useState({
    name: "",
    communicationTone: "Friendly",
  });

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    communicationTone: "Friendly",
  });

  // Initialize form data when agent loads
  useEffect(() => {
    if (agent) {
      const initialData = {
        name: agent.name,
        communicationTone: agent.communicationTone,
      };
      setOriginalData(initialData);
      setFormData(initialData);
    }
  }, [agent]);

  // Check if form has changes
  const hasChanges =
    formData.name !== originalData.name ||
    formData.communicationTone !== originalData.communicationTone;

  const handleClose = () => {
    router.push("/agents");
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as EditAgentTab);
  };

  const handleReset = () => {
    setFormData(originalData);
  };

  const handleSave = () => {
    if (id) {
      updateAgentDetails(id as string, {
        name: formData.name,
        communicationTone: formData.communicationTone,
      });
      setOriginalData(formData);
    }
  };

  const handleSaveAll = () => {
    if (id) {
      updateAgentDetails(id as string, {
        name: formData.name,
        communicationTone: formData.communicationTone,
      });
      setOriginalData(formData);
    }
  };

  // Show loading if no agent data yet
  if (!agent && id) {
    return (
      <Layout activeTab="agents" user={currentUser} notificationCount={1}>
        <p className="text-[#6a7282]">Loading...</p>
      </Layout>
    );
  }

  // Show not found if agent doesn't exist
  if (!agent) {
    return (
      <Layout activeTab="agents" user={currentUser} notificationCount={1}>
        <p className="text-[#6a7282]">Agent not found</p>
      </Layout>
    );
  }

  const isReady = agent.status === "ready";
  const isLive = agent.status === "live";
  const canDelete = agent.status === "draft";

  return (
    <Layout activeTab="agents" user={currentUser} notificationCount={1}>
      <div className="flex flex-col gap-8">
        {/* Page Heading */}
        <PageHeading
          title="Agent Settings"
          subtitle="Configure your AI agent's behavior, capabilities, and branding"
          actions={
            <>
              <button
                disabled={!hasChanges}
                onClick={handleSaveAll}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  hasChanges
                    ? "bg-[#333e4f] text-white hover:bg-[#1e2939] cursor-pointer"
                    : "bg-[#f3f4f6] border border-[#d1d5dc] text-[#99a1af] cursor-not-allowed"
                }`}
              >
                Save All Changes
              </button>
              <button
                onClick={handleClose}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#e5e7eb] hover:bg-gray-300 transition-colors cursor-pointer"
              >
                <CloseIcon size={16} className="text-[#101828]" />
              </button>
            </>
          }
        />

        {/* Tab Navigation and Body Content */}
        <div>
          <TabNavigation
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            tabsWithChanges={hasChanges ? ["general"] : []}
          />

          {/* Body Content */}
          <div className="flex justify-center mt-[19px]">
          <div className="w-[760px] flex flex-col gap-8">
            {activeTab === "general" && (
              <>
                {/* Basic Information Section */}
                <FormSection title="Basic Information">
                  <div className="bg-white rounded-lg p-6">
                    <div className="flex flex-col gap-6">
                      {/* Agent Name */}
                      <Input
                        label="Agent Name"
                        value={formData.name}
                        onChange={(value) =>
                          setFormData({ ...formData, name: value })
                        }
                      />

                      {/* Communication Tone */}
                      <Select
                        label="Communication Tone"
                        value={formData.communicationTone}
                        options={communicationToneOptions}
                        onChange={(value) =>
                          setFormData({ ...formData, communicationTone: value })
                        }
                      />

                      {/* Agent Personality (disabled) */}
                      <Input
                        label="Agent Personality"
                        value={agent.personality}
                        disabled
                        helperText="Personality is set during agent creation and cannot be changed"
                      />

                      {/* Company Name (disabled) */}
                      <Input
                        label="Company Name"
                        value={agent.companyName}
                        disabled
                        helperText="Personality is set during agent creation and cannot be changed"
                      />

                      {/* Domain (disabled) */}
                      <Input
                        label="Domain"
                        value={agent.domain}
                        disabled
                        helperText="Personality is set during agent creation and cannot be changed"
                        labelIcon={
                          <QuestionCircleIcon
                            size={14}
                            className="text-[#101828]"
                          />
                        }
                      />
                    </div>
                  </div>

                  {/* Save/Reset buttons */}
                  <div className="flex gap-2.5 pt-2">
                    <button
                      disabled={!hasChanges}
                      onClick={handleSave}
                      className={`flex items-center justify-center w-[74px] px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        hasChanges
                          ? "bg-[#333e4f] text-white hover:bg-[#1e2939] cursor-pointer"
                          : "bg-[#f3f4f6] border border-[#d1d5dc] text-[#99a1af] cursor-not-allowed"
                      }`}
                    >
                      Save
                    </button>
                    <button
                      disabled={!hasChanges}
                      onClick={handleReset}
                      className={`flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        hasChanges
                          ? "bg-[#f9fafb] border border-[#4a5565] text-[#4a5565] hover:bg-gray-100 cursor-pointer"
                          : "bg-[#f3f4f6] border border-[#d1d5dc] text-[#99a1af] cursor-not-allowed"
                      }`}
                    >
                      Reset
                    </button>
                  </div>
                </FormSection>

                {/* Agent Status Section */}
                <FormSection title="Agent Status">
                  <div className="bg-white rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      {/* Status info */}
                      <div className="flex flex-col gap-1 flex-1">
                        {/* Status Badge - larger style matching Figma */}
                        <div
                          className={`inline-flex items-center justify-center px-1.5 py-1 rounded-md text-sm font-medium leading-4 w-fit ${
                            agent.status === "draft"
                              ? "bg-[#fff8f1] border border-[#fcd9bd] text-[#ff5a1f]"
                              : agent.status === "ready"
                              ? "bg-[#eef6ff] border border-[#bedbff] text-[#51a2ff]"
                              : "bg-[#ecfdf5] border border-[#a4f4cf] text-[#00a63e]"
                          }`}
                        >
                          {agent.status === "draft" && "Draft"}
                          {agent.status === "ready" && "Ready"}
                          {agent.status === "live" && "Live"}
                        </div>
                        <p className="text-xs text-[#6a7282] leading-5">
                          {agent.status === "draft" &&
                            "Agent setup is not completed"}
                          {agent.status === "ready" &&
                            "Agent setup is completed"}
                          {agent.status === "live" && "Agent is live on website"}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2.5 flex-1 justify-end">
                        <button className="flex items-center justify-center px-3 py-1.5 rounded-full bg-[#f9fafb] border border-[#4a5565] text-xs font-medium text-[#4a5565] hover:bg-gray-100 transition-colors cursor-pointer">
                          Add to Your website
                        </button>
                        <button className="flex items-center justify-center px-3 py-1.5 rounded-full bg-[#f9fafb] border border-[#4a5565] text-xs font-medium text-[#4a5565] hover:bg-gray-100 transition-colors cursor-pointer">
                          Deactivate
                        </button>
                      </div>
                    </div>
                  </div>
                </FormSection>

                {/* Delete Agent Section */}
                <FormSection title="Delete Agent">
                  <div className="bg-white rounded-lg p-6">
                    <div className="flex items-center justify-between gap-2.5">
                      {/* Warning text */}
                      <div className="flex-1">
                        <p className="text-xs text-[#c70036] leading-5">
                          Agent is in Ready status. To delete this agent, you need to deactivate it first
                        </p>
                      </div>

                      {/* Delete button - disabled */}
                      <button
                        disabled
                        className="flex items-center justify-center px-3 py-1.5 rounded-full bg-[#f3f4f6] border border-[#d1d5dc] text-xs font-medium text-[#99a1af] cursor-not-allowed"
                      >
                        Delete Agent
                      </button>
                    </div>
                  </div>
                </FormSection>
              </>
            )}

            {/* Placeholder for other tabs */}
            {activeTab !== "general" && (
              <div className="bg-white rounded-lg p-6">
                <p className="text-sm text-[#6a7282]">
                  {TABS.find((t) => t.id === activeTab)?.label} settings coming
                  soon...
                </p>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
