import React from 'react';

/**
 * Standardized header component for sections with an icon
 */
export const SectionHeader = ({ icon: Icon, title, rightElement, children }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 font-[Outfit] text-[0.85rem] font-semibold text-slate-400 uppercase tracking-[1px] w-full">
      {Icon && <Icon size={18} />}
      {title}
      {children}
      {rightElement && (
        <div className="ml-auto flex items-center gap-3">
          {rightElement}
        </div>
      )}
    </div>
  );
};
