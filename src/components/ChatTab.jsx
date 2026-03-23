import React from 'react';
import { Bot, Send } from 'lucide-react';
import MarkdownView from './MarkdownView';
import { useChat } from '../hooks/useChat';
import { Canvas } from './ui/Canvas';
import { SectionCard } from './ui/SectionCard';

/**
 * Main application tab containing the AI Chat 
 * Built completely using reusable UI components
 */
const ChatTab = ({ visible }) => {
  const {
    chatMessages,
    chatInput,
    setChatInput,
    isChatLoading,
    chatEndRef,
    handleSendMessage
  } = useChat(visible);

  return (
    <Canvas visible={visible}>
      <SectionCard padded={false} className="flex-col overflow-hidden w-full h-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
        {/* Chat header */}
        <div className="flex items-center gap-4 p-6 border-b border-white/10 bg-black/20 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-50 font-[Outfit] tracking-wide">VIBE Assistant</h2>
            <div className="flex items-center gap-2 text-[0.85rem] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Online and ready to code
            </div>
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-5 shadow-lg ${msg.role === 'user' ? 'bg-linear-to-br from-indigo-600 to-indigo-500 border border-indigo-400 text-white rounded-tr-sm' : 'bg-slate-800 border border-white/10 text-slate-200 rounded-tl-sm'}`}>
                <div className="text-[0.95rem] leading-[1.6] text-left">
                  <MarkdownView content={msg.content} className="p-0" />
                </div>
              </div>
            </div>
          ))}
          {isChatLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 border border-white/10 rounded-2xl p-5 rounded-tl-sm flex gap-2 items-center shadow-lg">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="p-5 border-t border-white/10 bg-black/30 flex gap-3 shrink-0">
          <input 
            type="text" 
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask about your code..." 
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-slate-200 font-[Outfit] focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all font-medium placeholder:text-slate-500"
            disabled={isChatLoading}
          />
          <button 
            type="submit"
            disabled={isChatLoading || !chatInput.trim()}
            className="px-6 rounded-xl bg-linear-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all cursor-pointer"
            aria-label="Send Message"
          >
            <Send size={22} />
          </button>

        </form>
      </SectionCard>
    </Canvas>
  );
};

export default ChatTab;
