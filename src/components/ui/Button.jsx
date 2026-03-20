import React from 'react';

/**
 * Reusable simple button component with nice hover effects
 */
export const Button = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  className = '',
  icon: Icon,
  type = "button"
}) => {
  const baseStyle = "px-4 py-2 rounded-xl font-[Outfit] tracking-[1px] flex items-center justify-center gap-2 transition-all duration-300 ";
  
  const variants = {
    primary: "bg-linear-to-br from-indigo-500 to-cyan-500 text-white shadow-[0_4px_15px_-5px_rgba(99,102,241,0.5)] hover:shadow-[0_6px_20px_-3px_rgba(99,102,241,0.7)] hover:-translate-y-0.5",
    secondary: "bg-slate-800/80 border border-slate-600 hover:border-indigo-400 hover:text-white text-slate-300 hover:bg-slate-800 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.3)] hover:-translate-y-0.5",
    ghost: "bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] focus:outline-none"
  };

  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed pointer-events-none grayscale" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabledStyle} ${className}`}
    >
      {Icon && <Icon size={14} className={disabled ? 'animate-pulse' : ''} />}
      <span className="text-[0.75rem] font-bold">{children}</span>
    </button>
  );
};
