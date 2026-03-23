import React from 'react';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0f172a] border-t border-white/5 py-16 px-8 md:px-16 mt-auto relative z-10 font-[Outfit]">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 text-white font-black text-2xl tracking-tighter mb-6">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            1nap<span className="text-indigo-400">Docs</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
            The elite documentation suite for small teams moving at lightspeed.
            Built with hexagonal architecture for extreme scalability.
          </p>
        </div>

        <div className="col-span-1">
          <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Resources</h4>
          <div className="flex flex-col gap-4 text-slate-500 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">Style Guide</a>
            <a href="#" className="hover:text-white transition-colors">History Manager</a>
            <a href="#" className="hover:text-white transition-colors">API Keys</a>
          </div>
        </div>

        <div className="col-span-1">
          <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">The Stack</h4>
          <div className="flex flex-col gap-4 text-slate-500 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Groq / Llama-8B</a>
            <a href="#" className="hover:text-white transition-colors">FastAPI backend</a>
            <a href="#" className="hover:text-white transition-colors">React + Tailwind</a>
            <a href="#" className="hover:text-white transition-colors">SQLite3 Adaptor</a>
          </div>
        </div>

        <div className="col-span-1">
          <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Community</h4>
          <div className="flex gap-4">
            <a 
              href="https://github.com" 
              aria-label="GitHub"
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://twitter.com" 
              aria-label="Twitter"
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
          © 2026 1nap Docs — documentation-Gen carried the load
        </div>
        <div className="flex gap-6 text-slate-400 text-[10px] font-black uppercase tracking-widest">
          <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Ethical AI</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
