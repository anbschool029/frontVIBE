import React from 'react';
import { Github } from 'lucide-react';

const TechStackSection = () => {
  const techs = [
    { name: 'FastAPI', tech: 'Python Async', label: 'Backend' },
    { name: 'React + Vite', tech: 'Next-Gen Build', label: 'Frontend' },
    { name: 'SQLite3', tech: 'Edge Adaptor', label: 'Persistence' },
    { name: 'Groq Cloud', tech: 'LPUs Inference', label: 'Compute' }
  ];

  return (
    <div id="built-with" className="w-full mt-32 space-y-20 animate-fadeIn scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <h2 className="text-5xl font-black leading-tight">Obsessed with <br/><span className="text-purple-400">Architecture.</span></h2>
          <div className="space-y-6 text-slate-400 font-bold leading-relaxed">
            <p>We built AEGen using the <strong>Ports and Adapters</strong> (Hexagonal) pattern. This means our domain logic is completely isolated from the database and AI choice.</p>
            <p>Whether we're using SQLite or Postgres—or swapping Llama for Gemini—the core engine remains untouched. This is documentation for developers, built by developers.</p>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/placeholder" className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
              <Github size={16} /> Frontend Source
            </a>
            <a href="https://github.com/placeholder" className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
              <Github size={16} /> Backend Source
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {techs.map(t => (
            <div key={t.name} className="p-8 bg-white/5 border border-white/5 rounded-[32px] hover:translate-y-[-4px] transition-all">
              <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">{t.label}</div>
              <div className="text-xl font-black text-white mb-2">{t.name}</div>
              <div className="text-xs text-slate-500 font-bold">{t.tech}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackSection;
