import { enhanceLanguageDetection } from './languageDetection';

const extensionMap = {
  python: '.py',
  javascript: '.js',
  typescript: '.tsx',
  java: '.java',
  cpp: '.cpp',
  c: '.c',
  csharp: '.cs',
  go: '.go',
  rust: '.rs',
  ruby: '.rb',
  php: '.php',
  html: '.html',
  css: '.css',
  json: '.json',
  bash: '.sh',
  markdown: '.md',
  sql: '.sql',
  text: '.txt'
};

/**
 * Derives an intelligent filename based on the raw code structure.
 * Returns only the base name (without extension or suffix).
 * 
 * @param {string} code - The raw snippet code
 * @returns {string} The base filename
 */
export const deriveBaseFilename = (code) => {
  // Regex to find all function declarations or standard definitions
  // Matches: function foo, def foo, const foo = function
  const functionNames = [];
  
  // Python/Ruby defs
  const defMatches = code.matchAll(/def\s+([a-zA-Z0-9_]+)\s*\(/g);
  for (const match of defMatches) {
    functionNames.push(match[1]);
  }

  // JS/TS/Java/C++ functions
  const fnMatches = code.matchAll(/function\s+([a-zA-Z0-9_]+)\s*\(/g);
  for (const match of fnMatches) {
    functionNames.push(match[1]);
  }

  // JS arrow functions assigning to const/let
  const arrowMatches = code.matchAll(/(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*(?:\([^)]*\)|[a-zA-Z0-9_]+)\s*=>/g);
  for (const match of arrowMatches) {
    functionNames.push(match[1]);
  }

  // Go func
  const goMatches = code.matchAll(/func\s+([a-zA-Z0-9_]+)\s*\(/g);
  for (const match of goMatches) {
    functionNames.push(match[1]);
  }
  
  if (functionNames.length === 0) {
    // No functions. Try to see if there's a clear main variable assigned
    const varMatch = code.match(/(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=/);
    if (varMatch && varMatch[1]) {
      return varMatch[1].toLowerCase();
    }
    return "script";
  }

  if (functionNames.length === 1) {
    // Exactly 1 function
    return functionNames[0].toLowerCase();
  }

  // More than 1 function
  // Check if there is a 'main'
  const mainFunc = functionNames.find(n => n.toLowerCase() === 'main' || n.toLowerCase() === 'index' || n.toLowerCase() === 'app');
  if (mainFunc) {
    return mainFunc.toLowerCase();
  }

  // Multiple disconnected functions
  return "functions";
};

/**
 * Returns the correct full filename with extension based on the code behavior and action.
 * 
 * @param {string} code - The snippet code
 * @param {'generate' | 'explain'} action - What the user is downloading
 * @param {'code' | 'md' | 'pdf'} format - The requested file format 
 * @returns {string} Complete filename with extension
 */
export const generateFilename = (code, action, format) => {
  const baseName = deriveBaseFilename(code);
  const lang = enhanceLanguageDetection(code) || 'text';
  const codeExt = extensionMap[lang] || '.txt';

  if (action === 'generate') {
    // Always download exactly as code file
    return `${baseName}${codeExt}`;
  } else if (action === 'explain') {
    // Explain means it's a docs format
    if (format === 'md') {
      return `${baseName}_docs.md`;
    } else if (format === 'pdf') {
      return `${baseName}_docs.pdf`;
    }
  }
  
  return `${baseName}_file.txt`;
};
