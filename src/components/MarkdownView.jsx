import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import hljs from 'highlight.js';
import { smartHighlight } from '../utils/languageDetection';

/**
 * Custom components to intercept and apply highlight.js syntax highlighting 
 * when rendering Markdown content.
 */
export const MarkdownHighlightComponents = {
  pre: ({ children }) => <>{children}</>,
  code(props) {
    const { children, className, node, ...rest } = props;
    const match = /language-(\w+)/.exec(className || '');
    const codeString = String(children).replace(/\n$/, '');

    // Check if it's inline code 
    if (!match && !codeString.includes('\n')) {
      return (
        <code className="bg-black/30 px-1.5 py-0.5 rounded text-indigo-400 font-mono text-[0.85em] border border-white/5" {...rest}>
          {children}
        </code>
      );
    }

    // Attempt syntax highlighting block
    let highlightedHtml = '';
    let detectedLang = 'TEXT';
    
    if (match && match[1]) {
      try {
        highlightedHtml = hljs.highlight(codeString, { language: match[1] }).value;
        detectedLang = match[1];
      } catch (e) {
        const auto = smartHighlight(codeString);
        highlightedHtml = auto.value;
        detectedLang = auto.language || 'TEXT';
      }
    } else {
      const auto = smartHighlight(codeString);
      highlightedHtml = auto.value;
      detectedLang = auto.language || 'TEXT';
    }

    return (
      <div className="relative group my-4">
        <div className="absolute top-0 right-0 bg-slate-800/80 text-indigo-400 text-[10px] font-bold px-3 py-1.5 rounded-bl-lg rounded-tr-xl border-b border-l border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity uppercase z-10 shadow-lg select-none">
          {detectedLang}
        </div>
        <pre className="bg-black/40! p-5! m-0! rounded-xl! overflow-x-auto! border border-white/5 custom-scrollbar shadow-inner">
          <code className="hljs bg-transparent! p-0! font-mono text-[0.85rem] leading-[1.6]" dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
        </pre>
      </div>
    );
  }
};

/**
 * Reusable Markdown Viewer wrapped with unified styling and plugins
 * 
 * @param {Object} props
 * @param {string} props.content - Markdown string to render
 * @param {string} props.className - Additional tailwind classes
 */
const MarkdownView = ({ content, className = '' }) => {
  return (
    <div id="markdown-viewer-output" className={`text-slate-400 text-[0.95rem] leading-[1.6] [&_h1]:text-slate-50 [&_h1]:mb-4 [&_h2]:text-slate-50 [&_h2]:mb-4 [&_h3]:text-slate-50 [&_h3]:mb-4 [&_p]:mb-3 w-full max-w-full overflow-hidden custom-scrollbar overflow-y-auto ${className}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeRaw]}
        components={MarkdownHighlightComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownView;
