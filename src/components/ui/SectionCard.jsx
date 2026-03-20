import React from 'react';

/**
 * A standard, glassmorphic card container for panels.
 * Provides backdrop-blur, borders, and rounding.
 */
export const SectionCard = ({ children, className = '', padded = true, style }) => {
  return (
    <div 
      style={style}
      className={`bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[20px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.3)] flex flex-col ${padded ? 'p-6' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
