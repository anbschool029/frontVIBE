import React from 'react';

const HeroSection = ({ onEnterClick }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full animate-fadeIn p-12">
      {/* Left Column: Hero Text */}
      <div className="space-y-10 text-left">
        <div className="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">
          Documentation for Speed
        </div>
        <h1 className="text-7xl xl:text-8xl font-black tracking-tighter leading-tight bg-linear-to-r from-white to-slate-500 bg-clip-text text-transparent">
          Kill the <br/>
          "TODO" <br/>
          Graveyard.
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed max-w-lg">
          Stop the "Ask Around" culture. Clean READMEs, wikis, and Notion docs instantly for crews of 3-10 moving at lightspeed.
        </p>
        <div className="flex items-center gap-6">
          <button 
            onClick={onEnterClick}
            className="px-12 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] active:scale-95"
          >
            STOP THE CHAOS — ENTER
          </button>
          <div className="flex -space-x-4">
            {[1,2,3].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0f172a] bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <div className="pl-6 text-xs text-slate-400 font-bold self-center">USED BY 1,000+ EARLY TEAMS</div>
          </div>
        </div>
      </div>

      {/* Right Column: Benefit Grid */}
      <div className="grid grid-cols-1 gap-6">
        {[
          { title: 'Ship at Lightspeed', text: 'Features pile up, but docs shouldn\'t stay in the "TODO" graveyard.', color: 'blue' },
          { title: 'Kill Tribal Knowledge', text: 'Stop the "Ask Around" culture. Document READMEs and Notion instantly.', color: 'purple' },
          { title: 'Scale Without Debt', text: 'Standardized Markdown for teams refusing to write war-crime code.', color: 'cyan' }
        ].map((item, idx) => (
          <div key={idx} className="p-8 bg-white/[0.03] backdrop-blur-md rounded-[32px] border border-white/5 hover:border-white/10 transition-all hover:translate-x-2 group">
            <h3 className={`text-${item.color}-400 font-black text-lg mb-2 uppercase tracking-wide`}>{item.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
