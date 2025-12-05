import React from "react";

interface PageHeadingProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function PageHeading({ title, subtitle, actions }: PageHeadingProps) {
  return (
    <div className="flex items-end justify-between">
      <div className="flex flex-col gap-0.5">
        <h1 className="text-lg font-semibold text-[#101828] leading-[22px] opacity-90">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base text-[#6a7282] leading-[22px] opacity-90">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
