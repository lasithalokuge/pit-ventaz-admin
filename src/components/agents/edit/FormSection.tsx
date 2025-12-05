import React from "react";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Section heading */}
      <h2 className="text-base font-semibold text-[#101828] leading-[22px] opacity-90">
        {title}
      </h2>
      {/* Section content */}
      {children}
    </div>
  );
}
