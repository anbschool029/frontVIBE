import React from 'react';
import { User, LogOut } from 'lucide-react';

/**
 * About section component with Logout functionality.
 */
const AboutTab = ({ onLogout }) => {
  return (
    <div className="flex flex-col items-center justify-center p-16 bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[20px] text-slate-400 font-[Outfit] w-full min-h-[400px]">
      <User size={48} className="mb-4 text-cyan-500 opacity-80" />
      <h2 className="text-2xl font-bold text-slate-50 mb-2">About the Developer</h2>
      <p className="text-[0.95rem] max-w-[400px] text-center mb-8">
        Built to streamline the coding workflow by generating high-quality documentation instantly.
      </p>
      
      <button 
        onClick={onLogout}
        className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl transition-all font-bold"
      >
        <LogOut size={18} />
        LOGOUT SESSION
      </button>
    </div>
  );
};

export default AboutTab;
