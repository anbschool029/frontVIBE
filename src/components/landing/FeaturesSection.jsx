import React from 'react';
import { Sparkles, MessagesSquare, Zap, Cpu, Rocket, Layout } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    { title: '[GENERATE DOCS]', desc: 'High-speed AI documentation for any code snippet. Deep structural analysis and type-awareness included.', icon: Sparkles },
    { title: '[EXPLAIN LOGIC]', desc: 'Logic deep-dives for onboarding. Understand complex recursion or legacy spaghetti in plain English.', icon: MessagesSquare },
    { title: 'PRE-CONFIG STYLE', desc: 'Choose between Short & Savage, Verbose, JSDoc Vibes, or Clean Python strings instantly.', icon: Zap },
    { title: 'CUSTOM PRE-STYLE', desc: 'Provide an example of "how we write here." The engine learns your team\'s voice dynamically.', icon: Cpu },
    { title: 'INLINE DOCS', desc: 'Generate descriptive comments directly within the source snippets to clarify complex algorithm steps.', icon: Rocket },
    { title: 'MARKDOWN PREVIEW', desc: 'Real-time professional Markdown rendering with smart copy-to-clipboard for READMEs or Notion.', icon: Layout }
  ];

  return (
    <div id="features" className="w-full mt-32 space-y-20 animate-fadeIn p-12 bg-white/2 border border-white/5 rounded-[64px] scroll-mt-32">
      <div className="text-center space-y-4">
        <div className="inline-block px-4 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">The Toolkit</div>
        <h2 className="text-5xl font-black bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Power Features</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="p-10 bg-black/20 border border-white/5 rounded-[40px] hover:border-indigo-500/50 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full -mr-12 -mt-12" />
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-8 border border-indigo-500/20 group-hover:scale-110 transition-transform">
              {f.icon && <f.icon size={28} className="text-indigo-400" />}
            </div>
            <h3 className="text-lg font-black tracking-tight text-white mb-4">{f.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-bold">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
