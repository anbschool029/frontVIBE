import React, { useState, useEffect } from 'react';
import { Sparkles, Github, Twitter } from 'lucide-react';
import HeroSection from './landing/HeroSection';
import LoginSection from './landing/LoginSection';
import AboutSection from './landing/AboutSection';
import FeaturesSection from './landing/FeaturesSection';
import TechStackSection from './landing/TechStackSection';

/**
 * Premium Landing Page explaining the project and providing entry point.
 */
const LandingPage = ({ onLogin, loggedIn = false, forceLogin = false, onHideLogin }) => {
  const [showLogin, setShowLogin] = useState(forceLogin);
  const [username, setUsername] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sync internal login state with parent forceLogin prop
  useEffect(() => {
    setShowLogin(forceLogin);
  }, [forceLogin]);

  const toggleLogin = (val) => {
    setShowLogin(val);
    if (val) window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!val && onHideLogin) onHideLogin();
  };

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
    <div id="top" className="w-full bg-[#0f172a] text-slate-50 font-[Outfit] relative flex flex-col scroll-smooth">
      {/* Mobile Warning Overlay */}
      <div className="hidden max-md:flex flex-col items-center justify-center text-center p-10 bg-slate-900/80 backdrop-blur-3xl border border-white/10 rounded-[40px] max-w-[90%] z-50 shadow-2xl">
        <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30">
          <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4 bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Desktop Only</h2>
        <p className="text-slate-400 leading-relaxed">
          AEGen's elite documentation suite is currently optimized for **Tablet or PC** to provide the most efficient coding workflow.
        </p>
      </div>

      <div className="max-md:hidden w-full flex flex-col min-h-screen relative overflow-x-hidden">
        <div className="w-full mx-auto relative px-16 md:px-24 pt-24 md:pt-32">
          {/* Background Glows */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

          {/* Hero is always visible, landing page never replaced */}
          <HeroSection onEnterClick={() => toggleLogin(true)} />

          <AboutSection />
          <FeaturesSection />
          <TechStackSection />
        </div>
      </div>

      {/* Login Modal Overlay — anchored to top, below navbar */}
      {showLogin && (
        <div
          className="fixed inset-0 z-999 flex items-start justify-center pt-24 px-8 pb-8 bg-black/70 backdrop-blur-xl overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) toggleLogin(false); }}
        >
          <div className="w-full max-w-[1100px] animate-scaleIn flex flex-col gap-6">
            <LoginSection
              handleLogin={handleLogin}
              username={username}
              setUsername={setUsername}
              secretKey={secretKey}
              setSecretKey={setSecretKey}
              error={error}
              loading={loading}
              onReturn={() => toggleLogin(false)}
            />

            {/* Compact footer inside modal for UX continuity */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 rounded-[28px] bg-white/3 border border-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
                  <Sparkles size={13} className="text-white" />
                </div>
                <span className="text-slate-500 text-xs font-black uppercase tracking-widest">AEGen</span>
                <span className="text-slate-700 text-xs">—</span>
                <span className="text-slate-600 text-[10px] font-bold">© 2026 documentation-Gen carried the load</span>
              </div>
              <div className="flex items-center gap-4">
                <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-indigo-400 transition-colors">Privacy</a>
                <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-indigo-400 transition-colors">Terms</a>
                <div className="flex items-center gap-2 ml-2">
                  <a href="https://github.com" aria-label="GitHub" className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all">
                    <Github size={14} />
                  </a>
                  <a href="https://twitter.com" aria-label="Twitter" className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all">
                    <Twitter size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
