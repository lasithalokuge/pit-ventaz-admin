import Image from "next/image";

interface AgentAvatarProps {
  avatar?: string;
  letter?: string;
  name: string;
  size?: number;
}

export function AgentAvatar({
  avatar,
  letter,
  name,
  size = 44,
}: AgentAvatarProps) {
  if (avatar) {
    return (
      <div
        className="relative rounded-full overflow-hidden flex-shrink-0"
        style={{ width: size, height: size }}
      >
        <Image
          src={avatar}
          alt={name}
          width={size}
          height={size}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Dark background with gradient letter avatar (matching Figma design)
  return (
    <div
      className="relative rounded-full flex items-center justify-center flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: "#1e2939",
      }}
    >
      <span
        className="font-extrabold text-transparent bg-clip-text"
        style={{
          fontSize: size * 0.68,
          lineHeight: 1,
          backgroundImage: "linear-gradient(180deg, #547dff 0%, #7b62ff 100%)",
        }}
      >
        {letter || name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}
