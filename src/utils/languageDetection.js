import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

export const COMMON_LANGUAGES = ['python', 'javascript', 'typescript', 'java', 'cpp', 'c', 'csharp', 'go', 'rust', 'ruby', 'php', 'html', 'css', 'json', 'bash', 'markdown', 'sql'];

/**
 * Heuristic rules to correctly detect programming languages before highlighting
 * @param {string} code 
 * @returns {string | null}
 */
export const enhanceLanguageDetection = (code) => {
  if (/^(\s)*def\s+\w+\s*\(.*\)\s*:/m.test(code) || /^(\s)*print\s*\(.*\)/m.test(code)) return 'python';
  if (/^(\s)*(const|let)\s+\w+\s*=/m.test(code) || /console\.log\(/m.test(code) || /=>/.test(code)) return 'javascript';
  if (/#include\s*</m.test(code) || /std::/.test(code)) return 'cpp';
  if (/public\s+class\s+\w+/m.test(code) || /System\.out\.println/m.test(code)) return 'java';
  if (/^(\s)*package\s+\w+/m.test(code) || /^(\s)*func\s+\w+\s*\(/m.test(code)) return 'go';
  return null;
};

/**
 * Safely applies highlight.js to code strings
 * @param {string} code 
 * @returns {{value: string, language: string}}
 */
export const smartHighlight = (code) => {
  const manualLang = enhanceLanguageDetection(code);
  if (manualLang) {
    try {
      const result = hljs.highlight(code, { language: manualLang });
      return { value: result.value, language: manualLang };
    } catch(e) {}
  }
  const auto = hljs.highlightAuto(code, COMMON_LANGUAGES);
  return { value: auto.value, language: auto.language || 'text' };
};
