import { ProfileSettingsIcon, UsersIcon, BillingIcon, LogoutIcon } from "@/components/icons";

interface ProfileDropdownProps {
  onClose: () => void;
}

interface MenuItemProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  isDanger?: boolean;
  onClick?: () => void;
}

function MenuItem({ icon: Icon, label, isDanger, onClick }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 w-full p-2 rounded-lg text-sm font-medium transition-colors hover:bg-[#f3f4f6] cursor-pointer whitespace-nowrap ${
        isDanger ? "text-[#c70036]" : "text-[#4a5565]"
      }`}
    >
      <Icon size={16} className={`shrink-0 ${isDanger ? "text-[#c70036]" : "text-[#4a5565]"}`} />
      <span>{label}</span>
    </button>
  );
}

export function ProfileDropdown({ onClose }: ProfileDropdownProps) {
  const handleItemClick = () => {
    onClose();
  };

  return (
    <div
      className="absolute top-full right-[-2px] mt-[6px] z-50 flex flex-col gap-2 py-2 pl-2 pr-4 rounded-xl"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(8px)",
        boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px 0px rgba(0,0,0,0.05)",
        border: "1px solid rgba(255, 255, 255, 1)",
      }}
    >
      <MenuItem icon={ProfileSettingsIcon} label="Profile Settings" onClick={handleItemClick} />
      <MenuItem icon={UsersIcon} label="User Management" onClick={handleItemClick} />
      <MenuItem icon={BillingIcon} label="Billing & Subscriptions" onClick={handleItemClick} />
      <MenuItem icon={LogoutIcon} label="Sign Out" isDanger onClick={handleItemClick} />
    </div>
  );
}
