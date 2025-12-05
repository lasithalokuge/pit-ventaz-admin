import React from "react";

interface CardIconProps {
  children: React.ReactNode;
  showGlassEffect?: boolean;
  className?: string;
}

export function CardIcon({
  children,
  showGlassEffect = false,
  className = "",
}: CardIconProps) {
  return (
    <div className={`relative overflow-visible ${className}`}>
      {children}
      {showGlassEffect && (
        <div
          className="absolute w-[41px] h-[20px] -left-[9px] top-[13px] backdrop-blur-[6px] bg-white/15 pointer-events-none"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
