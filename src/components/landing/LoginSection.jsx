import React from 'react';

const LoginSection = ({ handleLogin, username, setUsername, secretKey, setSecretKey, error, loading, onReturn }) => {
  return (
    <div className="w-full flex justify-center items-center py-10">
      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 bg-white/2 backdrop-blur-2xl border border-white/10 rounded-[48px] overflow-hidden shadow-[0_32px_128px_rgba(0,0,0,0.8)] animate-scaleIn z-10">
        {/* Login Left: Brand Context */}
        <div className="p-12 md:p-16 bg-indigo-600/10 flex flex-col justify-between border-r border-white/5">
          <div>
            <h2 className="text-5xl font-black mb-6 leading-tight">Sync Your <br />AEGen Account</h2>
            <p className="text-indigo-400 font-medium mb-12 text-lg">
              Your secret key can be anything you want—it serves as your login ID. 
              <span className="block mt-4 text-white font-bold italic border-l-4 border-red-500 pl-4">
                DO NOT LOSE OR FORGET IT. If you lose this key, you will permanently lose access to your account, progress, and history.
              </span>
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                <span className="text-sm text-slate-400">Deterministic UUID Identity Based on Your Choice</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                <span className="text-sm text-slate-400">Persistent History linked to your key</span>
              </div>
            </div>
          </div>
          <div className="mt-12 text-[10px] uppercase tracking-widest text-indigo-500/50 font-bold">Hack.chat Protocol 2.0 Identity Layer</div>
        </div>

        {/* Login Right: The Form */}
        <div className="p-12 md:p-16">
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Nickname</label>
              <input 
                type="text" 
                placeholder="e.g. LeadEngineer"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-bold text-lg"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Secret Key</label>
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
                {loading ? 'SYNCING IDENTITY...' : 'ENTER AEGEN'}
              </button>

              <button 
                type="button"
                onClick={onReturn}
                className="w-full text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-slate-300 transition-colors"
              >
                Return to Hero
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
