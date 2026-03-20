import React from 'react';

/**
 * Reusable modal popup wrapper with backdrop blur
 */
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl max-w-sm w-full flex flex-col gap-4 animate-fadeIn">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-50 font-[Outfit] tracking-wide">{title}</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};
