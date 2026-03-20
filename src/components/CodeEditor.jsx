import React, { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import SimpleCodeEditor from 'react-simple-code-editor';
import { smartHighlight } from '../utils/languageDetection';

/**
 * A beautiful syntax highlighting text area editor 
 * 
 * @param {Object} props
 * @param {string} props.title - Title of the editor block 
 * @param {React.FC} props.icon - Lucide icon component for the title
 * @param {string} props.value - The raw text value of the editor
 * @param {(value: string) => void} props.onChange - Triggered when text input changes
 */
const CodeEditor = ({ title, icon: Icon, value, onChange }) => {
  const lineCount = value.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 1) }, (_, i) => i + 1);
  const [detectedLang, setDetectedLang] = useState('text');

  useEffect(() => {
    if (!value.trim()) {
      setDetectedLang('text');
      return;
    }
    try {
      const result = smartHighlight(value);
      setDetectedLang(result.language || 'text');
    } catch (e) {
      setDetectedLang('text');
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-row items-center gap-2 font-[Outfit] text-[0.85rem] font-semibold text-slate-400 uppercase tracking-[1px]">
        <Icon size={18} />
        {title}
      </div>
      <div className="flex bg-black/40 rounded-[20px] overflow-hidden border border-white/10 relative min-h-[120px] w-full group">
        <div className="bg-white/5 py-6 px-2 w-[45px] text-right text-slate-600 font-mono text-[0.85rem] leading-[1.6] border-r border-white/10 select-none">
          {lineNumbers.map(n => <div key={n}>{n}</div>)}
        </div>
        <div className="grow relative overflow-auto custom-scrollbar">
          {(() => {
            // react-simple-code-editor occasionally requires .default depending on build setup
            const EditorComponent = SimpleCodeEditor.default || SimpleCodeEditor;
            return (
              <EditorComponent
                value={value}
                onValueChange={onChange}
                highlight={code => {
                  if (!code) return '';
                  try {
                    return smartHighlight(code).value;
                  } catch (e) {
                    return code;
                  }
                }}
                padding={24}
                className="font-mono text-[0.85rem] leading-[1.6] min-h-[120px] outline-none hljs bg-transparent"
                textareaClassName="outline-none"
                style={{
                  fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                  backgroundColor: 'transparent'
                }}
              />
            );
          })()}
        </div>
        <div className="absolute bottom-0 right-0 py-1 px-3 bg-slate-800/80 text-[10px] text-slate-400 rounded-tl-lg border-t border-l border-white/10 flex gap-[10px] backdrop-blur-md opacity-20 group-hover:opacity-100 transition-opacity">
          <span>LINES: {lineCount}</span>
          <span>UTF-8</span>
          <span className="text-indigo-400 font-bold">{detectedLang.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
