import React, { useState, useEffect } from 'react';
import { Layout, ArrowRight } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingNavbar from './components/LandingNavbar';
import DocGenTab from './components/DocGenTab';
import ChatTab from './components/ChatTab';
import CommunityTab from './components/CommunityTab';
import LandingPage from './components/LandingPage';
import Workspace from './components/Workspace';
import './index.css';

/**
 * Main Application root component orchestrating navigation 
 * and persistent state components.
 */
function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vibe_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [project, setProject] = useState(null);
  const [file, setFile] = useState(null);
  const [activeTab, setActiveTab] = useState(user ? 'DocGen' : 'Landing');
  const [forceLogin, setForceLogin] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('vibe_user', JSON.stringify(userData));
    setActiveTab('DocGen');
  };

  const handleLogout = () => {
    if (user) {
      fetch(`${import.meta.env.VITE_API_URL}/auth/heartbeat-off`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.user_id }),
      }).catch(() => { });
    }
    setUser(null);
    setProject(null);
    setFile(null);
    localStorage.removeItem('vibe_user');
    setActiveTab('Landing');
  };

  const handleWorkspaceSelect = (proj, fl) => {
    setProject(proj);
    setFile(fl);
  };

  useEffect(() => {
    if (!user) return;
    const handleUnload = () => {
      const blob = new Blob([JSON.stringify({ user_id: user.user_id })], { type: 'application/json' });
      navigator.sendBeacon(
        `${import.meta.env.VITE_API_URL}/auth/heartbeat-off`,
        blob
      );
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a] relative overflow-x-hidden no-scrollbar font-[Outfit] text-slate-50">
      {user ? (
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
          onLogout={handleLogout}
        />
      ) : (
        <LandingNavbar
          onLoginClick={() => {
            setActiveTab('Landing');
            setForceLogin(true);
          }}
          onHomeClick={() => {
            setActiveTab('Landing');
            setForceLogin(false);
          }}
          onCommunityClick={() => setActiveTab('Community')}
          onSectionClick={() => {
            setActiveTab('Landing');
            setForceLogin(false);
          }}
        />
      )}

      <main
        className={`grow mx-auto ${['Landing', 'Community'].includes(activeTab) ? 'w-full' : 'w-[80vw] min-w-[80vw] max-w-xl'} ${activeTab !== 'Landing' ? 'pt-[120px] pb-10' : ''} flex flex-col no-scrollbar`}
        style={{ animation: 'fadeIn 0.8s ease-out 0.2s forwards' }}
      >
        {user && activeTab !== 'Community' && (
          <div className="flex items-center justify-between mb-8 px-4">
            <div className="flex items-center gap-3">
              <div className="px-5 py-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
                {project ? project.name : 'Select Project'}
              </div>
              {project && <ArrowRight size={14} className="text-slate-600" />}
              {project && (
                <div className="px-5 py-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
                  {file ? file.name : 'Select File'}
                </div>
              )}
            </div>
            {(project || file) && (
              <button
                onClick={() => { setProject(null); setFile(null); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest active:scale-95"
              >
                <Layout size={12} /> Change Workspace
              </button>
            )}
          </div>
        )}

        <div style={{ display: activeTab === 'Landing' ? 'block' : 'none' }}>
          <LandingPage
            onLogin={handleLogin}
            loggedIn={!!user}
            forceLogin={forceLogin}
            onHideLogin={() => setForceLogin(false)}
          />
        </div>

        <CommunityTab visible={activeTab === 'Community'} />

        {user && (
          <>
            {(!project || !file) ? (
              <div style={{ display: ['DocGen', 'Chat'].includes(activeTab) ? 'block' : 'none' }}>
                <Workspace user={user} onSelect={handleWorkspaceSelect} />
              </div>
            ) : (
              <>
                <DocGenTab visible={activeTab === 'DocGen'} user={user} project={project} file={file} />
                <ChatTab visible={activeTab === 'Chat'} user={user} project={project} file={file} />
              </>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}


export default App;
