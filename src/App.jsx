import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DocGenTab from './components/DocGenTab';
import ChatTab from './components/ChatTab';
import LandingPage from './components/LandingPage';
import './index.css';

/**
 * Main Application root component orchestrating navigation 
 * and persistent state components.
 */
function App() {
  const [activeTab, setActiveTab] = useState('DocGen');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vibe_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('vibe_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('vibe_user');
  };

  if (!user) {
    return <LandingPage onLogin={handleLogin} />;
  }

  return (
    <>
      <div className="hidden max-md:block font-[Outfit] text-xl text-slate-50 text-center p-8 bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[20px] max-w-[90%] mx-auto mt-10">
        this site ain't support mobile version please use tablet or PC
      </div>
      
      {/* Top Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user} 
        onLogout={handleLogout} 
      />
      
      {/* Main Container */}
      <div 
        className={`mx-auto ${activeTab === 'Landing' ? 'w-full' : 'w-[80vw] min-w-[80vw] max-w-xl pt-[120px] pb-10'} flex flex-col gap-8 opacity-0 max-md:hidden`} 
        style={{ animation: 'fadeIn 0.8s ease-out 0.2s forwards' }}
      >
        <DocGenTab visible={activeTab === 'DocGen'} user={user} />
        <ChatTab visible={activeTab === 'Chat'} user={user} />
        
        {activeTab === 'Landing' && <LandingPage loggedIn={true} onLogin={() => {}} />}
      </div>
    </>
  );
}

export default App;
