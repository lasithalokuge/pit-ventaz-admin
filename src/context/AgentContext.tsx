import React, { createContext, useContext, useState, ReactNode } from "react";
import { Agent, AgentEditDetails } from "@/types/dashboard";
import { agents as initialAgents, agentDetails as initialAgentDetails } from "@/data/mockData";

interface AgentContextType {
  agents: Agent[];
  agentDetails: Record<string, AgentEditDetails>;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  updateAgentDetails: (id: string, updates: Partial<AgentEditDetails>) => void;
  deactivateAgent: (id: string) => void;
  activateAgent: (id: string) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [agentDetails, setAgentDetails] = useState<Record<string, AgentEditDetails>>(initialAgentDetails);

  const updateAgent = (id: string, updates: Partial<Agent>) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === id ? { ...agent, ...updates } : agent
      )
    );
  };

  const updateAgentDetails = (id: string, updates: Partial<AgentEditDetails>) => {
    setAgentDetails((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...updates },
    }));

    // Also update the agents list with relevant fields
    if (updates.name) {
      updateAgent(id, { name: updates.name });
    }
  };

  const deactivateAgent = (id: string) => {
    updateAgent(id, { status: "inactive" });
    updateAgentDetails(id, { status: "inactive" });
  };

  const activateAgent = (id: string) => {
    updateAgent(id, { status: "ready" });
    updateAgentDetails(id, { status: "ready" });
  };

  return (
    <AgentContext.Provider
      value={{ agents, agentDetails, updateAgent, updateAgentDetails, deactivateAgent, activateAgent }}
    >
      {children}
    </AgentContext.Provider>
  );
}

export function useAgents() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error("useAgents must be used within an AgentProvider");
  }
  return context;
}
