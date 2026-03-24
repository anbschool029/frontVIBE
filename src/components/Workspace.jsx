import React, { useState, useEffect, useRef } from 'react';
import { Layout, FileCode, Plus, FolderPlus, ArrowRight, CheckCircle2, Trash2, Pencil, Check, X } from 'lucide-react';
import { SectionCard } from './ui/SectionCard';

const Workspace = ({ user, onSelect }) => {
  const [projects, setProjects] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProjectName, setNewProjectName] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingFileId, setEditingFileId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const editRef = useRef(null);

  useEffect(() => {
    fetchProjects();
  }, [user]);

  useEffect(() => {
    if (editRef.current) editRef.current.focus();
  }, [editingProjectId, editingFileId]);

  const fetchProjects = async () => {
    if (!user) return;
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/workspace/projects/${user.user_id}`);
      const data = await resp.json();
      setProjects(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchFiles = async (projectId) => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/workspace/files/${projectId}`);
      const data = await resp.json();
      setFiles(data);
    } catch (e) {
      console.error(e);
    }
  };

  // ── Create ──────────────────────────────────────────────────────────────
  const createProject = async () => {
    if (!newProjectName.trim()) return;
    setLoading(true);
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/workspace/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newProjectName, user_id: user.user_id })
      });
      const data = await resp.json();
      setProjects(prev => [...prev, data]);
      setNewProjectName('');
      setSelectedProject(data);
      fetchFiles(data.id);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const createFile = async () => {
    if (!newFileName.trim() || !selectedProject) return;
    setLoading(true);
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/workspace/files`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newFileName, project_id: selectedProject.id })
      });
      const data = await resp.json();
      setFiles(prev => [...prev, data]);
      setNewFileName('');
      onSelect(selectedProject, data);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  // ── Rename ───────────────────────────────────────────────────────────────
  const confirmRenameProject = async (projectId) => {
    if (!editingName.trim()) return cancelEditing();
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/workspace/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingName })
      });
      setProjects(prev => prev.map(p => p.id === projectId ? { ...p, name: editingName } : p));
      if (selectedProject?.id === projectId) setSelectedProject(prev => ({...prev, name: editingName}));
    } catch (e) { console.error(e); }
    cancelEditing();
  };

  const confirmRenameFile = async (fileId) => {
    if (!editingName.trim()) return cancelEditing();
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/workspace/files/${fileId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingName })
      });
      setFiles(prev => prev.map(f => f.id === fileId ? { ...f, name: editingName } : f));
    } catch (e) { console.error(e); }
    cancelEditing();
  };

  const cancelEditing = () => {
    setEditingProjectId(null);
    setEditingFileId(null);
    setEditingName('');
  };

  // ── Delete ───────────────────────────────────────────────────────────────
  const deleteProject = async (e, projectId) => {
    e.stopPropagation();
    if (!confirm('Delete this project and all its files & history? This cannot be undone.')) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/workspace/projects/${projectId}`, { method: 'DELETE' });
      setProjects(prev => prev.filter(p => p.id !== projectId));
      if (selectedProject?.id === projectId) { setSelectedProject(null); setFiles([]); }
    } catch (e) { console.error(e); }
  };

  const deleteFile = async (e, fileId) => {
    e.stopPropagation();
    if (!confirm('Delete this file and all its history? This cannot be undone.')) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/workspace/files/${fileId}`, { method: 'DELETE' });
      setFiles(prev => prev.filter(f => f.id !== fileId));
    } catch (e) { console.error(e); }
  };

  const startEditProject = (e, p) => {
    e.stopPropagation();
    setEditingProjectId(p.id);
    setEditingName(p.name);
  };

  const startEditFile = (e, f) => {
    e.stopPropagation();
    setEditingFileId(f.id);
    setEditingName(f.name);
  };

  return (
    <div className="w-full flex flex-col gap-10 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* ── Project Column ── */}
        <SectionCard className="p-10 border-indigo-500/20 bg-indigo-500/5">
          <div className="flex items-center gap-4 mb-8">
            <Layout className="text-indigo-400" size={32} />
            <h2 className="text-3xl font-black text-white">Project Level</h2>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
            {projects.map(p => (
              <div
                key={p.id}
                onClick={() => { if (editingProjectId !== p.id) { setSelectedProject(p); fetchFiles(p.id); } }}
                className={`w-full p-5 rounded-[28px] border transition-all flex items-center justify-between group cursor-pointer ${
                  selectedProject?.id === p.id
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-[0_0_30px_rgba(99,102,241,0.3)]'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className={`p-2.5 rounded-2xl shrink-0 ${selectedProject?.id === p.id ? 'bg-white/20' : 'bg-white/5'}`}>
                    <FolderPlus size={16} />
                  </div>
                  {editingProjectId === p.id ? (
                    <input
                      ref={editRef}
                      value={editingName}
                      onChange={e => setEditingName(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') confirmRenameProject(p.id); if (e.key === 'Escape') cancelEditing(); }}
                      onClick={e => e.stopPropagation()}
                      className="bg-transparent border-b border-white/40 outline-none font-black text-base w-full"
                    />
                  ) : (
                    <span className="font-black text-base truncate">{p.name}</span>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-3">
                  {editingProjectId === p.id ? (
                    <>
                      <button onClick={e => { e.stopPropagation(); confirmRenameProject(p.id); }} className="p-2 rounded-xl hover:bg-green-500/20 text-green-400 transition-colors"><Check size={14}/></button>
                      <button onClick={e => { e.stopPropagation(); cancelEditing(); }} className="p-2 rounded-xl hover:bg-white/10 transition-colors"><X size={14}/></button>
                    </>
                  ) : (
                    <>
                      {selectedProject?.id === p.id && <CheckCircle2 size={16} className="mr-1" />}
                      <button onClick={e => startEditProject(e, p)} className="p-2 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-all"><Pencil size={13} /></button>
                      <button onClick={e => deleteProject(e, p.id)} className="p-2 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-400 transition-all"><Trash2 size={13} /></button>
                    </>
                  )}
                </div>
              </div>
            ))}

            <div className="flex gap-2 mt-6">
              <input
                type="text"
                placeholder="New Project Name..."
                value={newProjectName}
                onChange={e => setNewProjectName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && createProject()}
                className="grow bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-bold text-sm"
              />
              <button onClick={createProject} disabled={loading} className="w-12 h-12 bg-white text-[#0f172a] rounded-2xl flex items-center justify-center hover:bg-indigo-400 hover:text-white transition-all active:scale-95">
                <Plus size={18} />
              </button>
            </div>
          </div>
        </SectionCard>

        {/* ── File Column ── */}
        <SectionCard className={`p-10 transition-all duration-500 ${!selectedProject ? 'opacity-30 pointer-events-none grayscale' : 'opacity-100'}`}>
          <div className="flex items-center gap-4 mb-8">
            <FileCode className="text-cyan-400" size={32} />
            <h2 className="text-3xl font-black text-white">File Level</h2>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
            {files.map(f => (
              <div
                key={f.id}
                onClick={() => { if (editingFileId !== f.id) onSelect(selectedProject, f); }}
                className="w-full p-5 rounded-[28px] bg-white/5 border border-white/5 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="p-2.5 rounded-2xl bg-white/5 group-hover:bg-cyan-500/10 transition-colors shrink-0">
                    <FileCode size={16} />
                  </div>
                  {editingFileId === f.id ? (
                    <input
                      ref={editRef}
                      value={editingName}
                      onChange={e => setEditingName(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') confirmRenameFile(f.id); if (e.key === 'Escape') cancelEditing(); }}
                      onClick={e => e.stopPropagation()}
                      className="bg-transparent border-b border-cyan-400/40 outline-none font-black text-base w-full text-cyan-300"
                    />
                  ) : (
                    <span className="font-black text-base truncate">{f.name}</span>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-3">
                  {editingFileId === f.id ? (
                    <>
                      <button onClick={e => { e.stopPropagation(); confirmRenameFile(f.id); }} className="p-2 rounded-xl hover:bg-green-500/20 text-green-400 transition-colors"><Check size={14}/></button>
                      <button onClick={e => { e.stopPropagation(); cancelEditing(); }} className="p-2 rounded-xl hover:bg-white/10 transition-colors"><X size={14}/></button>
                    </>
                  ) : (
                    <>
                      <ArrowRight size={16} className="opacity-0 group-hover:opacity-0 transition-all mr-1" />
                      <button onClick={e => startEditFile(e, f)} className="p-2 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-all"><Pencil size={13} /></button>
                      <button onClick={e => deleteFile(e, f.id)} className="p-2 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-400 transition-all"><Trash2 size={13} /></button>
                    </>
                  )}
                </div>
              </div>
            ))}

            <div className="flex gap-2 mt-6">
              <input
                type="text"
                placeholder="New File (e.g. auth.py)..."
                value={newFileName}
                onChange={e => setNewFileName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && createFile()}
                className="grow bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-bold text-sm"
              />
              <button onClick={createFile} disabled={loading} className="w-12 h-12 bg-cyan-500 text-white rounded-2xl flex items-center justify-center hover:bg-cyan-400 transition-all active:scale-95 shadow-lg shadow-cyan-500/20">
                <Plus size={18} />
              </button>
            </div>
          </div>
        </SectionCard>

      </div>
    </div>
  );
};

export default Workspace;
