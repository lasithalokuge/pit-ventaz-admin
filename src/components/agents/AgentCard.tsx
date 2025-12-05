import { Agent } from "@/types/dashboard";
import { AgentAvatar } from "./AgentAvatar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ActionButton, IconActionButton } from "@/components/ui/ActionButton";
import {
  MessageCircleIcon,
  CodeIcon,
  EditIcon,
  TrashIcon,
} from "@/components/icons";

interface AgentCardProps {
  agent: Agent;
  onPreview?: () => void;
  onAddToWebsite?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function AgentCard({
  agent,
  onPreview,
  onAddToWebsite,
  onEdit,
  onDelete,
}: AgentCardProps) {
  return (
    <div className="bg-white rounded-lg px-6 py-6 flex items-center justify-between">
      {/* Agent Info */}
      <div className="flex items-center gap-[17px]">
        <AgentAvatar
          avatar={agent.avatar}
          letter={agent.avatarLetter}
          name={agent.name}
        />
        <div className="flex items-start gap-[11px]">
          {/* Name and Website */}
          <div className="flex flex-col w-[268px]">
            <span className="text-sm font-medium text-[var(--color-text-fg-brand)] leading-[22px]">
              {agent.name}
            </span>
            <span className="text-xs font-medium text-[var(--color-text-light)] leading-[22px]">
              {agent.website}
            </span>
          </div>
          {/* Status */}
          <div className="pt-0.5">
            <StatusBadge status={agent.status} />
          </div>
        </div>
      </div>

      {/* Agent Metrics */}
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center text-center">
          <span className="text-base font-semibold text-[var(--color-text-fg-brand)] leading-[22px]">
            {agent.type}
          </span>
          <span className="text-xs font-medium text-[var(--color-text-light)] leading-[22px]">
            Agent Type
          </span>
        </div>
        <div className="flex flex-col items-center text-center w-[88px]">
          <span className="text-base font-semibold text-[var(--color-text-fg-brand)] leading-[22px]">
            {agent.conversations}
          </span>
          <span className="text-xs font-medium text-[var(--color-text-light)] leading-[22px]">
            Conversations
          </span>
        </div>
        <div className="flex flex-col items-center text-center">
          <span className="text-base font-semibold text-[var(--color-text-fg-brand)] leading-[22px]">
            {agent.leads}
          </span>
          <span className="text-xs font-medium text-[var(--color-text-light)] leading-[22px]">
            Leads
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 justify-end">
        <ActionButton
          icon={<MessageCircleIcon size={16} />}
          label="Preview Agent"
          onClick={onPreview}
        />
        <ActionButton
          icon={<CodeIcon size={16} />}
          label="Add to Website"
          onClick={onAddToWebsite}
          disabled={!agent.canAddToWebsite}
        />
        <ActionButton
          icon={<EditIcon size={16} />}
          label="Edit"
          onClick={onEdit}
        />
        <IconActionButton
          icon={<TrashIcon size={16} />}
          aria-label="Delete agent"
          variant="danger"
          onClick={onDelete}
          disabled={!agent.canDelete}
        />
      </div>
    </div>
  );
}
