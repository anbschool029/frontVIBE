import React, { useState, useEffect } from 'react';
import { Users, Trophy, Circle, Clock, Sparkles, MessagesSquare, Zap } from 'lucide-react';
import { Canvas, CanvasRow, CanvasColumn } from './ui/Canvas';
import { SectionCard } from './ui/SectionCard';

const CommunityTab = ({ visible }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('total'); // 'total' | 'docs' | 'explain' | 'status'

  const fetchCommunityData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/leaderboard`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch leaderboard", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchCommunityData();
      const interval = setInterval(fetchCommunityData, 5000);
      return () => clearInterval(interval);
    }
  }, [visible]);

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === 'status') {
      return (b.is_online === a.is_online) ? 0 : b.is_online ? 1 : -1;
    }
    if (sortBy === 'docs') return b.docs_count - a.docs_count;
    if (sortBy === 'explain') return b.explain_count - a.explain_count;
    return (b.docs_count + b.explain_count) - (a.docs_count + a.explain_count);
  });

  return (
    <Canvas visible={visible}>
      <CanvasRow>
        <CanvasColumn className="w-full">
          <SectionCard className="h-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
              <div className="flex items-center gap-6">
                <div className="p-4 rounded-3xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 shadow-[0_0_40px_rgba(99,102,241,0.2)]">
                  <Trophy size={36} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white tracking-tight">Hall of Fame</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <p className="text-slate-500 text-xs font-black uppercase tracking-widest">
                      {data.filter(u => u.is_online).length} nomads active right now
                    </p>
                  </div>
                </div>
              </div>

              {/* Horizontal Filter Bar */}
              <div className="flex items-center gap-2 p-1.5 bg-black/40 backdrop-blur-xl rounded-[28px] border border-white/5 shadow-2xl">
                {[
                  { id: 'total', label: 'All Nomads', icon: Users, color: 'indigo' },
                  { id: 'docs', label: 'Docs Gen', icon: Sparkles, color: 'cyan' },
                  { id: 'explain', label: 'Explain Log', icon: MessagesSquare, color: 'purple' },
                  { id: 'status', label: 'Active Crews', icon: Zap, color: 'green' }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setSortBy(filter.id)}
                    className={`flex items-center gap-3 px-6 py-2.5 rounded-[22px] font-black text-xs uppercase tracking-widest transition-all ${sortBy === filter.id
                        ? `bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105`
                        : `text-slate-400 hover:text-white hover:bg-white/5`
                      }`}
                  >
                    <filter.icon size={14} />
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-separate border-spacing-y-4">
                <thead>
                  <tr className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">
                    <th className="px-8 py-2">Rank</th>
                    <th className="px-8 py-2">Nomad Identity</th>
                    <th
                      className={`px-8 py-2 text-center cursor-pointer hover:text-indigo-400 transition-colors ${sortBy === 'docs' ? 'text-indigo-400' : ''}`}
                      onClick={() => setSortBy('docs')}
                    >
                      Docs Gen {sortBy === 'docs' && '↓'}
                    </th>
                    <th
                      className={`px-8 py-2 text-center cursor-pointer hover:text-indigo-400 transition-colors ${sortBy === 'explain' ? 'text-indigo-400' : ''}`}
                      onClick={() => setSortBy('explain')}
                    >
                      Explain Log {sortBy === 'explain' && '↓'}
                    </th>
                    <th
                      className={`px-8 py-2 text-right cursor-pointer hover:text-indigo-400 transition-colors ${sortBy === 'status' ? 'text-indigo-400' : ''}`}
                      onClick={() => setSortBy('status')}
                    >
                      Status {sortBy === 'status' && '↓'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="5" className="text-center py-32 text-slate-500 font-black tracking-widest animate-pulse">SYNCHRONIZING WITH AEGEN DATABASE...</td></tr>
                  ) : data.length === 0 ? (
                    <tr><td colSpan="5" className="text-center py-32 text-slate-500 font-bold">No nomads recorded in history yet.</td></tr>
                  ) : (
                    sortedData.map((user, idx) => (
                      <tr key={user.tripcode} className="group transition-all duration-300">
                        <td className="px-8 py-6 bg-white/5 border-l border-white/5 rounded-l-[32px] text-xl font-black text-slate-500 group-hover:text-indigo-400 transition-colors">
                          #{idx + 1}
                        </td>
                        <td className="px-8 py-6 bg-white/5">
                          <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl border ${user.is_online ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'bg-slate-800/50 border-white/5 text-slate-600'}`}>
                              {user.nickname.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-white font-black text-xl group-hover:text-indigo-300 transition-colors">{user.nickname}</span>
                              <span className="text-[#FBBF24] text-xs font-black tracking-widest drop-shadow-sm">#{user.tripcode}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 bg-white/5 text-center">
                          <span className={`px-5 py-2 rounded-2xl font-black text-sm border transition-all ${sortBy === 'docs' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 shadow-lg' : 'bg-cyan-500/5 text-cyan-400 border-cyan-500/10'}`}>
                            {user.docs_count}
                          </span>
                        </td>
                        <td className="px-8 py-6 bg-white/5 text-center">
                          <span className={`px-5 py-2 rounded-2xl font-black text-sm border transition-all ${sortBy === 'explain' ? 'bg-purple-500/20 text-purple-400 border-purple-500/40 shadow-lg' : 'bg-purple-500/5 text-purple-400 border-purple-500/10'}`}>
                            {user.explain_count}
                          </span>
                        </td>
                        <td className="px-8 py-6 bg-white/5 rounded-r-[32px] text-right">
                          <div className={`flex items-center justify-end gap-3 text-xs font-black uppercase tracking-[.2em] ${user.is_online ? 'text-green-500' : 'text-slate-600'}`}>
                            {user.is_online ? 'Active Now' : 'Offline'}
                            <div className="relative flex h-3 w-3">
                              {user.is_online && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                              <span className={`relative inline-flex rounded-full h-3 w-3 ${user.is_online ? 'bg-green-500' : 'bg-slate-800'}`}></span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </CanvasColumn>
      </CanvasRow>
    </Canvas>
  );
};

export default CommunityTab;
