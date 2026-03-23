
export const downloadTextFile = (filename, content) => {

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadPDF = (elementId, filename) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const iframe = document.createElement('iframe');
  iframe.style.position = 'absolute';
  iframe.style.width = '0px';
  iframe.style.height = '0px';
  iframe.style.border = 'none';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${filename.replace('.pdf', '')}</title>
        <style>
          @page { size: auto; margin: 20mm; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #000;
            background-color: #fff;
            line-height: 1.6;
            margin: 0;
            padding: 0;
          }
          h1, h2, h3 { 
            font-weight: bold; 
            margin-top: 24px; 
            margin-bottom: 12px; 
            page-break-after: avoid;
          }
          h1 { border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
          p { margin-bottom: 16px; }
          
          /* Prevent slicing blocks in half entirely */
          pre, blockquote, table, tr, code, li {
            page-break-inside: avoid;
          }
          
          pre {
            background-color: #f1f5f9;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            padding: 16px;
            white-space: pre-wrap;
            word-wrap: break-word;
            font-family: monospace;
            font-size: 14px;
            margin-bottom: 16px;
          }
          code {
            font-family: monospace;
            color: #e11d48;
            background-color: #f8fafc;
            padding: 2px 4px;
            border-radius: 4px;
          }
          pre code {
            color: inherit;
            background-color: transparent;
            padding: 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 16px;
          }
          th, td {
            border: 1px solid #cbd5e1;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f8fafc;
            font-weight: bold;
          }
          a {
            color: #2563eb;
            text-decoration: underline;
          }
          /* Syntax highlight styles for print mode */
          .hljs-keyword, .hljs-selector-tag, .hljs-literal, .hljs-section, .hljs-link { color: #005cc5; font-weight: bold; }
          .hljs-function .hljs-keyword { color: #d73a49; }
          .hljs-string, .hljs-name, .hljs-type, .hljs-attribute, .hljs-symbol, .hljs-bullet, .hljs-addition, .hljs-variable, .hljs-template-tag, .hljs-template-variable { color: #032f62; }
          .hljs-comment, .hljs-quote, .hljs-deletion, .hljs-meta { color: #6a737d; font-style: italic; }
        </style>
      </head>
      <body>
        ${element.innerHTML}
      </body>
    </html>
  `);
  doc.close();

  // Allow elements to fully render into the iframe before invoking print engine
  setTimeout(() => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  }, 300);
};
