import React from 'react';
import { Sparkles } from 'lucide-react';

const LandingNavbar = ({ onLoginClick, onHomeClick }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-slate-900/40 backdrop-blur-xl border-b border-white/5 px-8 md:px-16 py-5 flex items-center justify-between">
      <a 
        href="#" 
        onClick={(e) => {
          onHomeClick?.();
        }}
        className="flex items-center gap-3 text-white font-black text-2xl tracking-tighter hover:opacity-80 transition-opacity"
      >
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)]">
          <Sparkles size={22} className="text-white fill-white/20" />
        </div>
        1nap<span className="text-indigo-400">Docs</span>
      </a>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex gap-8 text-sm font-bold text-slate-400">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#built-with" className="hover:text-white transition-colors">Tech Stack</a>
        </div>
        <button 
          onClick={onLoginClick}
          className="px-6 py-2.5 bg-white text-[#0f172a] hover:bg-indigo-400 hover:text-white rounded-xl font-black transition-all text-sm uppercase tracking-widest"
        >
          LOGIN
        </button>
      </div>
    </nav>
  );
};

export default LandingNavbar;
