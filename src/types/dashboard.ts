export interface MetricCard {
  id: string;
  icon: string;
  title: string;
  description?: string;
  value: string | number;
  percentageChange: number;
  trend: "up" | "down";
  tooltipText?: string;
  hasAction?: boolean;
  hasGlassEffect?: boolean;
}

export interface Activity {
  id: string;
  type: "lead_capture" | "conversation" | "question_answered" | "other";
  title: string;
  date: string;
}

export interface QuickAction {
  id: string;
  label: string;
  href: string;
  isPrimary?: boolean;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export type NavTab = "overview" | "agents" | "chats" | "leads";

export type AgentStatus = "draft" | "ready" | "live";

export interface Agent {
  id: string;
  name: string;
  website: string;
  status: AgentStatus;
  type: string;
  avatar?: string;
  avatarLetter?: string;
  conversations: number;
  leads: number;
  canAddToWebsite?: boolean;
  canDelete?: boolean;
}

export interface AgentEditDetails {
  name: string;
  communicationTone: string;
  personality: string;
  companyName: string;
  domain: string;
  status: AgentStatus;
}

export type EditAgentTab =
  | "general"
  | "widget"
  | "behavior"
  | "knowledge"
  | "integrations"
  | "notifications"
  | "preview";
