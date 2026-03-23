import React, { useState } from 'react';
import LandingNavbar from './LandingNavbar';
import Footer from './Footer';
import { Sparkles, Zap, Trash2, Cpu, Rocket, Layout, Github, MessagesSquare } from 'lucide-react';

/**
 * Premium Landing Page explaining the project and providing entry point.
 */
const LandingPage = ({ onLogin, loggedIn = false }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !secretKey) {
      setError('Both fields are required');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, secret_key: secretKey }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        onLogin(data);
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      setError('Backend connection failed. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="top" className="min-h-screen bg-[#0f172a] text-slate-50 font-[Outfit] relative overflow-x-hidden no-scrollbar flex flex-col scroll-smooth">
      {/* Mobile Warning Overlay */}
      <div className="hidden max-md:flex flex-col items-center justify-center text-center p-10 bg-slate-900/80 backdrop-blur-3xl border border-white/10 rounded-[40px] max-w-[90%] z-50 shadow-2xl">
        <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30">
          <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4 bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Desktop Only</h2>
        <p className="text-slate-400 leading-relaxed">
          VIBE AI's elite documentation suite is currently optimized for **Tablet or PC** to provide the most efficient coding workflow.
        </p>
      </div>

      {!loggedIn && <LandingNavbar onLoginClick={() => setShowLogin(true)} onHomeClick={() => setShowLogin(false)} />}

      <div className="max-md:hidden w-full flex flex-col min-h-screen relative overflow-x-hidden">
        <div className="w-full mx-auto relative px-16 md:px-24 pt-24 md:pt-32">
          {/* Background Glows */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

        {!showLogin ? (
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
                  onClick={() => setShowLogin(true)}
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
                  <div className="pl-6 text-xs text-slate-500 font-bold self-center">USED BY 1,000+ EARLY TEAMS</div>
                </div>
              </div>
            </div>

            {/* Right Column: Benefit Grid (Horizontal/Wide feel) */}
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
        ) : (
          <div className="w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-2 bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[48px] overflow-hidden shadow-[0_32px_128px_rgba(0,0,0,0.8)] animate-scaleIn z-10">
            {/* Login Left: Brand Context */}
            <div className="p-12 bg-indigo-600/10 flex flex-col justify-between border-r border-white/5">
              <div>
                <h2 className="text-4xl font-black mb-6 leading-tight">Sync Your <br />Vibe Session</h2>
                <p className="text-indigo-400 font-medium mb-12">No passwords. Just a key. Your history follows you wherever you code.</p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    <span className="text-sm text-slate-400">Deterministic UUID Identity</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    <span className="text-sm text-slate-400">Shared Session Key Storage</span>
                  </div>
                </div>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-indigo-500/50 font-bold">Hack.chat Protocol 2.0</div>
            </div>

            {/* Login Right: The Form */}
            <div className="p-12 md:p-16">
              <form onSubmit={handleLogin} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Nickname</label>
                  <input 
                    type="text" 
                    placeholder="e.g. LeadEngineer"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-bold text-lg"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Secret Key</label>
                  <input 
                    type="password" 
                    placeholder="Your unique session key"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-bold text-lg"
                  />
                </div>

                {error && <p className="text-red-400 text-sm font-bold">{error}</p>}

                <div className="space-y-4 pt-4">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-white text-[#0f172a] hover:bg-indigo-400 hover:text-white rounded-2xl font-black transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] active:scale-[0.98] disabled:opacity-50 text-lg"
                  >
                    {loading ? 'SYNCING IDENTITY...' : 'ENTER THE VIBE'}
                  </button>

                  <button 
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className="w-full text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-slate-300 transition-colors"
                  >
                    Return to Hero
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* About Section */}
        {!showLogin && (
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
        )}

        {/* Features Section */}
        {!showLogin && (
          <div id="features" className="w-full mt-32 space-y-20 animate-fadeIn p-12 bg-white/[0.02] border border-white/5 rounded-[64px] scroll-mt-32">
            <div className="text-center space-y-4">
              <div className="inline-block px-4 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">The Toolkit</div>
              <h2 className="text-5xl font-black bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Power Features</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: '[GENERATE DOCS]', desc: 'High-speed AI documentation for any code snippet. Deep structural analysis and type-awareness included.', icon: Sparkles },
                { title: '[EXPLAIN LOGIC]', desc: 'Logic deep-dives for onboarding. Understand complex recursion or legacy spaghetti in plain English.', icon: MessagesSquare },
                { title: 'PRE-CONFIG STYLE', desc: 'Choose between Short & Savage, Verbose, JSDoc Vibes, or Clean Python strings instantly.', icon: Zap },
                { title: 'CUSTOM PRE-STYLE', desc: 'Provide an example of "how we write here." The engine learns your team\'s voice dynamically.', icon: Cpu },
                { title: 'INLINE DOCS', desc: 'Generate descriptive comments directly within the source snippets to clarify complex algorithm steps.', icon: Rocket },
                { title: 'MARKDOWN PREVIEW', desc: 'Real-time professional Markdown rendering with smart copy-to-clipboard for READMEs or Notion.', icon: Layout }
              ].map((f, i) => (
                <div key={i} className="p-10 bg-black/20 border border-white/5 rounded-[40px] hover:border-indigo-500/50 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full -mr-12 -mt-12" />
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-8 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                    {f.icon && <f.icon size={28} className="text-indigo-400" />}
                  </div>
                  <h3 className="text-lg font-black tracking-tight text-white mb-4">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-bold">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Built With Section */}
        {!showLogin && (
          <div id="built-with" className="w-full mt-32 space-y-20 animate-fadeIn scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-5xl font-black leading-tight">Obsessed with <br/><span className="text-purple-400">Architecture.</span></h2>
                <div className="space-y-6 text-slate-500 font-bold leading-relaxed">
                  <p>We built VIBE using the <strong>Ports and Adapters</strong> (Hexagonal) pattern. This means our domain logic is completely isolated from the database and AI choice.</p>
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
                {[
                  { name: 'FastAPI', tech: 'Python Async', label: 'Backend' },
                  { name: 'React + Vite', tech: 'Next-Gen Build', label: 'Frontend' },
                  { name: 'SQLite3', tech: 'Edge Adaptor', label: 'Persistence' },
                  { name: 'Groq Cloud', tech: 'LPUs Inference', label: 'Compute' }
                ].map(t => (
                  <div key={t.name} className="p-8 bg-white/5 border border-white/5 rounded-[32px] hover:translate-y-[-4px] transition-all">
                    <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">{t.label}</div>
                    <div className="text-xl font-black text-white mb-2">{t.name}</div>
                    <div className="text-xs text-slate-500 font-bold">{t.tech}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  </div>
  );
};

export default LandingPage;
