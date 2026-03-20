import React, { useEffect, useState } from 'react';
import { History, Sparkles, FileText, Trash2 } from 'lucide-react';
import { CanvasSidebar } from './ui/Canvas';
import { SectionCard } from './ui/SectionCard';
import { deriveBaseFilename } from '../utils/fileNaming';

/**
 * Sidebar component that pulls both Doc and Explain histories natively
 * from the FastAPI endpoints and lists them chronologically.
 */
const HistorySidebar = ({ onHistorySelect, refreshTrigger }) => {
  const [docsHistory, setDocsHistory] = useState([]);
  const [explainHistory, setExplainHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistories = async () => {
    try {
      const [docsRes, explainRes] = await Promise.all([
        fetch('http://127.0.0.1:8000/history/docs').catch(() => null),
        fetch('http://127.0.0.1:8000/history/explain').catch(() => null)
      ]);

      if (docsRes?.ok) {
        const d = await docsRes.json();
        setDocsHistory(d);
      }
      if (explainRes?.ok) {
        const e = await explainRes.json();
        setExplainHistory(e);
      }
    } catch (e) {
      console.error("Failed to load history", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistories();
    
    // Set up a simple broad poll to refresh history every 10s if the user is active
    const interval = setInterval(fetchHistories, 10000);
    return () => clearInterval(interval);
  }, [refreshTrigger]);

  const handleDelete = async (e, id, type) => {
    e.stopPropagation(); // securely prevent row click selection event
    try {
      const res = await fetch(`http://127.0.0.1:8000/history/${type}/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchHistories(); // trigger immediate refresh
      }
    } catch (err) {
      console.error("Failed to safely delete history item", err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Just now';
    return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date(dateStr).toLocaleDateString();
  };

  return (
    <CanvasSidebar>
      <SectionCard className="h-1/2 flex flex-col mb-4">
        <div className="flex items-center gap-2 font-[Outfit] text-[1.1rem] font-bold mb-4 text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
          <Sparkles size={16} className="text-blue-400" />
          Docs History
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-2">
          {isLoading && docsHistory.length === 0 ? (
            <div className="text-slate-500 text-sm">Loading...</div>
          ) : docsHistory.length === 0 ? (
            <div className="text-slate-500 text-sm italic">No history yet.</div>
          ) : (
            docsHistory.map((item) => (
              <button
                key={item.id}
                onClick={() => onHistorySelect(item.id, 'docs')}
                className="text-left w-full p-3 rounded-lg bg-black/20 hover:bg-white/5 border border-white/5 transition-colors group flex items-start gap-2"
              >
                <History size={14} className="text-slate-500 mt-1 group-hover:text-blue-400 shrink-0" />
                <div className="flex flex-col overflow-hidden flex-1 z-10">
                  <span className="text-slate-300 text-sm truncate font-medium group-hover:text-blue-300 transition-colors">
                    {deriveBaseFilename(item.incoming_code) || 'Doc Generation'}
                  </span>
                  <span className="text-slate-500 text-xs">
                    {formatDate(item.createdAT)}
                  </span>
                </div>
                <button 
                  onClick={(e) => handleDelete(e, item.id, 'docs')}
                  className="opacity-0 group-hover:opacity-100 hover:text-red-400 text-slate-500 transition-all z-20 shrink-0 p-1 rounded hover:bg-red-500/10"
                >
                  <Trash2 size={14} />
                </button>
              </button>
            ))
          )}
        </div>
      </SectionCard>

      <SectionCard className="h-1/2 flex flex-col">
        <div className="flex items-center gap-2 font-[Outfit] text-[1.1rem] font-bold mb-4 text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
          <FileText size={16} className="text-emerald-400" />
          Explain History
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-2">
          {isLoading && explainHistory.length === 0 ? (
            <div className="text-slate-500 text-sm">Loading...</div>
          ) : explainHistory.length === 0 ? (
             <div className="text-slate-500 text-sm italic">No history yet.</div>
          ) : (
            explainHistory.map((item) => (
              <button
                key={item.id}
                onClick={() => onHistorySelect(item.id, 'explain')}
                className="text-left w-full p-3 rounded-lg bg-black/20 hover:bg-white/5 border border-white/5 transition-colors group flex items-start gap-2"
              >
                <History size={14} className="text-slate-500 mt-1 group-hover:text-emerald-400 shrink-0" />
                <div className="flex flex-col overflow-hidden flex-1 z-10">
                  <span className="text-slate-300 text-sm truncate font-medium group-hover:text-emerald-300 transition-colors">
                    {deriveBaseFilename(item.incoming_code) || 'Explanation'}
                  </span>
                  <span className="text-slate-500 text-xs">
                    {formatDate(item.createdAT)}
                  </span>
                </div>
                <button 
                  onClick={(e) => handleDelete(e, item.id, 'explain')}
                  className="opacity-0 group-hover:opacity-100 hover:text-red-400 text-slate-500 transition-all z-20 shrink-0 p-1 rounded hover:bg-red-500/10"
                >
                  <Trash2 size={14} />
                </button>
              </button>
            ))
          )}
        </div>
      </SectionCard>
    </CanvasSidebar>
  );
};

export default HistorySidebar;
