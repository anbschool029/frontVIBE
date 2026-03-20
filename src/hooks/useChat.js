import { useState, useRef, useEffect } from 'react';

/**
 * Custom Hook to encapsulate all chat state and logic
 * 
 * @param {boolean} isVisible - Used to trigger scroll to bottom when chat becomes visible
 * @returns {Object} Chat state and handler functions
 */
export const useChat = (isVisible) => {
  const [chatMessages, setChatMessages] = useState([{
    role: 'assistant', 
    content: 'Hello! I am VIBE, your AI coding assistant. How can I help you today?'
  }]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    if (isVisible && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isVisible, isChatLoading]);

  /**
   * Submits a message to the chat API
   * @param {React.FormEvent} e 
   */
  const handleSendMessage = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;
    
    const newUserMessage = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, newUserMessage]);
    setChatInput('');
    setIsChatLoading(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, newUserMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });
      const data = await response.json();
      if (data.message) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      } else if (data.error) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: `**Error:** ${data.error}` }]);
      }
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: `**Connection Error:** Could not connect to API.` }]);
    }
    setIsChatLoading(false);
  };

  return {
    chatMessages,
    chatInput,
    setChatInput,
    isChatLoading,
    chatEndRef,
    handleSendMessage
  };
};
