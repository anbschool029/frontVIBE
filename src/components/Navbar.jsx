import React from 'react';
import { Sparkles, MessageSquareOff, User } from 'lucide-react';

/**
 * Top navigation bar component
 * 
 * @param {Object} props
 * @param {string} props.activeTab - Currently selected tab id
 * @param {(tab: string) => void} props.setActiveTab - Callback to switch tabs
 */
const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[80vw] bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-between px-6 py-4 opacity-0 max-md:hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]" style={{ animation: 'fadeIn 0.8s ease-out forwards' }}>
      <div className="flex items-center gap-3 text-slate-50 font-[Outfit] font-bold text-xl tracking-wide select-none">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
          <Sparkles size={20} className="text-white" />
        </div>
        VIBE.
      </div>
      
      <div className="flex gap-4">
        <NavbarButton 
          icon={Sparkles} 
          label="DocGen" 
          isActive={activeTab === 'DocGen'} 
          onClick={() => setActiveTab('DocGen')} 
        />
        <NavbarButton 
          icon={MessageSquareOff} 
          label="Chat" 
          isActive={activeTab === 'Chat'} 
          onClick={() => setActiveTab('Chat')} 
        />
        <NavbarButton 
          icon={User} 
          label="About" 
          isActive={activeTab === 'About'} 
          onClick={() => setActiveTab('About')} 
        />
      </div>
    </nav>
  );
};

const NavbarButton = ({ icon: Icon, label, isActive, onClick }) => (
  <button 
    className={`px-5 py-2.5 rounded-xl border text-slate-50 font-[Outfit] font-semibold text-[0.9rem] tracking-[0.5px] cursor-pointer transition-all duration-300 flex items-center gap-2 hover:-translate-y-[2px] hover:border-indigo-500 hover:shadow-[0_10px_20px_-10px_rgba(99,102,241,0.5)] ${isActive ? 'bg-linear-to-br from-indigo-500 to-cyan-500 border-transparent shadow-[0_8px_30px_-10px_rgba(99,102,241,0.6)]' : 'bg-transparent border-transparent hover:bg-white/5'}`} 
    onClick={onClick}
  >
    <Icon size={16} /><span>{label}</span>
  </button>
);

export default Navbar;
