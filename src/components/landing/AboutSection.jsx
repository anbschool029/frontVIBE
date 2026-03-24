import React from 'react';
import { Trash2, Zap, Cpu } from 'lucide-react';

const AboutSection = () => {
  return (
    <div id="about" className="w-full mt-32 space-y-24 animate-fadeIn scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl font-black mb-8 leading-tight">You ship fast. <br/><span className="text-indigo-400">Documentation?</span> usually a graveyard of "TODO" comments.</h2>
          <div className="space-y-6 text-slate-400 font-medium font-[Outfit]">
            <p>Small teams (3–10 people) building MVPs on fumes know the pain:</p>
            <ul className="space-y-4">
              <li className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-1"><Trash2 size={12} className="text-red-400" /></div>
                <span>New joiners lost in undocumented spaghetti code.</span>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0 mt-1"><Zap size={12} className="text-yellow-400" /></div>
                <span>Founders asking the same basic questions again and again.</span>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 mt-1"><Cpu size={12} className="text-purple-400" /></div>
                <span>You reopening your own 6-month-old code thinking "who wrote this garbage?"</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-[48px] p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
          <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter">Instant Identity.</h3>
          <p className="text-slate-400 mb-8 font-medium">We used the Hack.chat ideology—no signup, no passwords. Just a nickname and a secret key. This deterministic flow generates a unique, non-spoofable hash that follows you across sessions.</p>
          <div className="flex flex-wrap gap-2 pt-4">
            {['Swift', 'Secure', 'Anonymous', 'Portable'].map(tag => (
              <span key={tag} className="px-4 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
