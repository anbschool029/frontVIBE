import React, { useState } from 'react';
import { Settings2, Code2, Terminal, FileText, Sparkles, Copy, Check, Download, FileJson, FileIcon } from 'lucide-react';
import CodeEditor from './CodeEditor';
import MarkdownView from './MarkdownView';
import HistorySidebar from './HistorySidebar';
import { useDocGen } from '../hooks/useDocGen';
import { Canvas, CanvasRow, CanvasColumn } from './ui/Canvas';
import { SectionCard } from './ui/SectionCard';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';

/**
 * Main application tab containing the Document Generator 
 * Reconstructed using reusable UI primitives
 */
const DocGenTab = ({ visible, user, project, file }) => {
  const {
    activeSettings,
    setActiveSettings,
    customStyle,
    setCustomStyle,
    snippedCode,
    setSnippedCode,
    markdownContent,
    isLoading,
    copied,
    lastAction,
    settingsOptions,
    handleCopyDocs,
    handleGenerateDocs,
    handleDownload,
    loadHistoryRecord,
    refreshTrigger
  } = useDocGen(user, project, file);

  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  /**
   * Router function to handle different download contexts
   */
  const onDownloadClicked = () => {
    if (!lastAction) return;
    if (lastAction === 'code_docs') {
      // Direct download exactly as language code extension
      handleDownload('code');
    } else if (lastAction === 'explain') {
      // Pop up the modal
      setIsDownloadModalOpen(true);
    }
  };

  /**
   * Executes the final download type 
   */
  const triggerDownloadAction = (format) => {
    handleDownload(format);
    setIsDownloadModalOpen(false);
  };

  return (
    <>
      <Canvas visible={visible}>
        <CanvasRow>
          
          <div className="sticky top-[120px] self-start h-[calc(100vh-140px)] w-[260px] max-md:w-full shrink-0">
            <HistorySidebar onHistorySelect={loadHistoryRecord} refreshTrigger={refreshTrigger} user={user} file={file} />
          </div>

          {/* Left Column: Inputs */}
          <CanvasColumn scrollable={true}>
            {/* Config Section Card */}
            <SectionCard>
              <div className="flex items-center gap-2 font-[Outfit] text-[1.25rem] font-bold mb-6 text-transparent bg-clip-text bg-linear-to-br from-indigo-500 to-cyan-500">
                <Settings2 size={18} className="text-indigo-500" />
                Pre-Config Style
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
                <div className="flex flex-col gap-3 h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                  {settingsOptions.map((setting) => (
                    <div key={setting} className="flex items-center gap-3 cursor-pointer group" onClick={() => {
                      if (activeSettings.includes(setting)) {
                        setActiveSettings(activeSettings.filter(s => s !== setting));
                      } else {
                        setActiveSettings([...activeSettings, setting]);
                      }
                    }}>
                      <div className={`w-[18px] h-[18px] rounded border flex items-center justify-center transition-colors ${activeSettings.includes(setting) ? 'bg-indigo-500 border-indigo-500' : 'border-slate-600 group-hover:border-indigo-400'}`}>
                        {activeSettings.includes(setting) && <div className="w-2 h-2 bg-white rounded-sm" />}
                      </div>
                      <label className="text-slate-400 text-[0.9rem] transition-colors duration-200 group-hover:text-slate-50 cursor-pointer">{setting}</label>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            {/* Main IDE Editor */}
            <CodeEditor 
              title="Custom Pre Style" 
              icon={Code2} 
              value={customStyle} 
              onChange={setCustomStyle} 
            />
            
            {/* Snipped Code */}
            <CodeEditor 
              title="Snipped Code" 
              icon={Terminal} 
              value={snippedCode} 
              onChange={setSnippedCode} 
            />
          </CanvasColumn>

          {/* Right Column: Read-only DocGens Output (Locked Sticky!) */}
          <CanvasColumn className="sticky top-[120px] self-start h-[calc(100vh-140px)]">
            {/* Header row: title + action groups */}
            <div className="flex flex-wrap items-center gap-3 mb-4 w-full">
              {/* Label */}
              <div className="flex items-center gap-2 text-[0.85rem] font-semibold text-slate-400 uppercase tracking-[1px] mr-auto">
                <FileText size={18} />
                DocGens
              </div>

              {/* Generate group */}
              <div className="flex items-center p-1 bg-black/30 border border-white/5 rounded-[22px] gap-1">
                <Button
                  onClick={() => handleGenerateDocs('code_docs')}
                  disabled={isLoading}
                  icon={Sparkles}
                  variant="primary"
                >
                  <span className="hidden sm:inline">{isLoading ? 'GENERATING...' : 'GENERATE DOCS'}</span>
                  <span className="sm:hidden">{isLoading ? '...' : 'DOCS'}</span>
                </Button>
                <Button
                  onClick={() => handleGenerateDocs('explain')}
                  disabled={isLoading}
                  icon={FileText}
                  variant="secondary"
                >
                  <span className="hidden sm:inline">{isLoading ? 'ANALYZING...' : 'EXPLAIN'}</span>
                  <span className="sm:hidden">{isLoading ? '...' : 'EXP'}</span>
                </Button>
              </div>

              {/* Download + Copy group */}
              <div className="flex items-center p-1 bg-black/30 border border-white/5 rounded-[22px] gap-1">
                <Button
                  onClick={onDownloadClicked}
                  disabled={!lastAction || isLoading}
                  icon={Download}
                  variant="ghost"
                >
                  <span className="hidden sm:inline">DOWNLOAD</span>
                </Button>
                <Button
                  onClick={handleCopyDocs}
                  icon={copied ? Check : Copy}
                  variant="ghost"
                >
                  <span className="hidden sm:inline">{copied ? 'COPIED' : 'COPY'}</span>
                </Button>
              </div>
            </div>
            
            <div className="flex flex-1 min-h-0 bg-black/20 rounded-[20px] overflow-hidden border border-white/10 relative w-full">
              <MarkdownView content={markdownContent} className="h-full p-6" />
            </div>
          </CanvasColumn>

        </CanvasRow>
      </Canvas>

      {/* Modal is kept outside the Canvas so it can freely float */}
      <Modal 
        isOpen={isDownloadModalOpen} 
        onClose={() => setIsDownloadModalOpen(false)} 
        title="Download Explanation"
      >
        <p className="text-slate-400 text-sm mb-6">Choose how you would like to export your highly detailed explanation documentation:</p>
        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => triggerDownloadAction('md')}
            variant="secondary"
            icon={FileJson} 
          >
            Markdown Format (.md)
          </Button>
          <Button 
            onClick={() => triggerDownloadAction('pdf')}
            variant="primary" 
            icon={FileIcon}
          >
            High Quality PDF (.pdf)
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DocGenTab;
