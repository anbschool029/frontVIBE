import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DocGenTab from './components/DocGenTab';
import ChatTab from './components/ChatTab';
import AboutTab from './components/AboutTab';
import './index.css';

/**
 * Main Application root component orchestrating navigation 
 * and persistent state components.
 */
function App() {
  const [activeTab, setActiveTab] = useState('DocGen');

  return (
    <>
      <div className="hidden max-md:block font-[Outfit] text-xl text-slate-50 text-center p-8 bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[20px] max-w-[90%] mx-auto mt-10">
        this site ain't support mobile version please use tablet or PC
      </div>
      
      {/* Top Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Container - padding accounts for fixed navbar */}
      <div 
        className="w-[80vw] min-w-[80vw] max-w-xl mx-auto pt-[120px] pb-10 flex flex-col gap-8 opacity-0 max-md:hidden" 
        style={{ animation: 'fadeIn 0.8s ease-out 0.2s forwards' }}
      >
        {/*
          By rendering DocGenTab and ChatTab simultaneously and toggling visibility, 
          we preserve their respective internal component states perfectly.
        */}
        <DocGenTab visible={activeTab === 'DocGen'} />
        <ChatTab visible={activeTab === 'Chat'} />
        
        {/* Because AboutTab has no state, we can unmount it safely to save memory */}
        {activeTab === 'About' && <AboutTab />}
      </div>
    </>
  );
}

export default App;
