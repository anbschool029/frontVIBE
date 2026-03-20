import { useState } from 'react';
import { generateFilename } from '../utils/fileNaming';
import { downloadTextFile, downloadPDF } from '../utils/downloader';

/**
 * Custom Hook to encapsulate all state and logic for the Documentation Generator
 * 
 * @returns {Object} DocGen state and handler functions
 */
export const useDocGen = () => {
  const [activeSettings, setActiveSettings] = useState(['Concise']);
  const [customStyle, setCustomStyle] = useState(`// Describe your custom tone or style here
// Example: "Make it sound very professional and explain the business logic clearly."
Make it incredibly easy to understand for beginners.`);
  
  const [snippedCode, setSnippedCode] = useState(`function calculateTotal(items, discountParam) {
  let total = 0;
  for(let i=0; i<items.length; i++) {
    total += items[i].price * items[i].qty;
  }
  if(discountParam > 0) {
    total = total - (total * (discountParam/100));
  }
  return total;
}`);

  const [markdownContent, setMarkdownContent] = useState(`# VIBE Documentation Generator
## Ready to generate
1. Paste your code into the **Snipped Code** box.
2. Select your desired styles or write a custom reference in **Custom Pre Style**.
3. Click **Generate Docs**!`);

  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastAction, setLastAction] = useState(null); // 'code_docs' | 'explain'
  const [refreshTrigger, setRefreshTrigger] = useState(Date.now());

  const settingsOptions = ['Concise', 'Verbose', 'JSDoc', 'Python Docstring', 'Explain like I am 5', 'Step-by-step logic'];

  /**
   * Helper to execute copy functionality.
   */
  const handleCopyDocs = async () => {
    if (!markdownContent) return;
    try {
      const textBlob = new Blob([markdownContent], { type: 'text/plain' });
      const htmlElement = document.getElementById('markdown-viewer-output');
      
      if (htmlElement && typeof ClipboardItem !== 'undefined') {
        const htmlBlob = new Blob([htmlElement.innerHTML], { type: 'text/html' });
        const item = new ClipboardItem({
          'text/plain': textBlob,
          'text/html': htmlBlob
        });
        await navigator.clipboard.write([item]);
      } else {
        await navigator.clipboard.writeText(markdownContent);
      }
    } catch (err) {
      console.error('Failed to copy rich text', err);
      try { await navigator.clipboard.writeText(markdownContent); } catch (e) {}
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * API call to generate code documentation or explanation
   * @param {"code_docs" | "explain"} mode - The mode of generation
   */
  const handleGenerateDocs = async (mode = "code_docs") => {
    setIsLoading(true);
    setLastAction(mode);
    setMarkdownContent(mode === "explain" ? 'Analyzing and explaining your code...\n\n_Please wait..._' : 'Generating your documentation...\n\n_Please wait..._');
    try {
      const response = await fetch('http://127.0.0.1:8000/documentation-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: snippedCode,
          styles: activeSettings,
          custom_style: customStyle,
          mode: mode,
        }),
      });
      const data = await response.json();
      if (data.documentation) {
        setMarkdownContent(data.documentation);
      } else if (data.error) {
        setMarkdownContent(`**Error generating documentation:**\n\n\`\`\`json\n${JSON.stringify(data.error, null, 2)}\n\`\`\``);
      }
      setRefreshTrigger(Date.now()); // Explicitly ping history reload!
    } catch (error) {
      setMarkdownContent(`**Connection Error:** Could not connect to the backend API.\n\nMake sure the Python FastAPI backend is running at \`http://127.0.0.1:8000\``);
    }
    setIsLoading(false);
  };
  
  /**
   * Handles download based on context rules
   * 
   * @param {'code' | 'md' | 'pdf'} format
   */
  const handleDownload = async (format) => {
    if (!markdownContent || !lastAction) return;
    
    // We pass 'generate' or 'explain' to filename utility
    const actionKey = lastAction === 'code_docs' ? 'generate' : 'explain';
    const filename = generateFilename(snippedCode, actionKey, format);
    
    if (actionKey === 'generate' || format === 'md') {
      // Clean up markdown block if it's supposed to be just a raw code file
      let fileContent = markdownContent;
      if (actionKey === 'generate') {
         const match = fileContent.match(/```[a-zA-Z]*\n([\s\S]*?)```/);
         if (match) fileContent = match[1]; 
      }
      downloadTextFile(filename, fileContent);
    } else if (format === 'pdf') {
       // Passing standard ID where markdown is rendered
       await downloadPDF('markdown-viewer-output', filename);
    }
  };

  const loadHistoryRecord = async (id, type) => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://127.0.0.1:8000/history/${type}/${id}`);
      if (res.ok) {
        const data = await res.json();
        setSnippedCode(data.incoming_code);
        setMarkdownContent(data.ai_response);
        setCustomStyle(data.custom_style_used || "");
        
        try {
          if (data.styles_used) {
            setActiveSettings(JSON.parse(data.styles_used));
          }
        } catch(e) {}

        setLastAction(type === 'docs' ? 'code_docs' : 'explain');
      }
    } catch (err) {
      console.error('Failed to load history record', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
};
