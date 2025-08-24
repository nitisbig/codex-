import { useState, useEffect } from 'react';

const MODEL_OPTIONS = [
  'llama-3.1-8b-instant',
  'llama-3.3-70b-versatile',
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
  'deepseek-r1-distill-llama-70b',
];

export default function Home() {
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('https://api.groq.com/openai/v1');
  const [model, setModel] = useState('llama-3.3-70b-versatile');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    return () => document.body.classList.remove('dark-mode');
  }, [darkMode]);

  const sendMessage = async () => {
    if (!apiKey || !baseUrl || !model || !input) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const endpoint = `${baseUrl.replace(/\/$/, '')}/chat/completions`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: newMessages,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || 'Request failed');
      }
      const content =
        data.choices?.[0]?.message?.content || 'No response from model.';
      setMessages([...newMessages, { role: 'assistant', content }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: `Error: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        className="themeToggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className="container">
      <h1>LLM Chatbot</h1>
      <input
        type="password"
        placeholder="Enter API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="apiKeyInput"
      />
      <input
        type="text"
        placeholder="Base URL"
        value={baseUrl}
        onChange={(e) => setBaseUrl(e.target.value)}
        className="baseUrlInput"
      />
      <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="modelSelect"
      >
        {MODEL_OPTIONS.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <div className="chat">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.role}`}>
            <strong>{m.role === 'user' ? 'You' : 'Bot'}:</strong> {m.content}
          </div>
        ))}
        {loading && (
          <div className="message assistant typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Type your message..."
        className="inputArea"
      />
      <button onClick={sendMessage} disabled={loading} className={loading ? 'loading' : ''}>
        {loading ? 'Sending...' : 'Send'}
      </button>
      <style jsx>{`
        :global(body) {
          background: #f3f4f6;
        }
        .container {
          max-width: 600px;
          margin: 2rem auto;
          font-family: sans-serif;
          display: flex;
          flex-direction: column;
          background: #fff;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1),
            0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .apiKeyInput,
        .baseUrlInput,
        .modelSelect,
        .inputArea {
          margin-bottom: 1rem;
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          outline: none;
        }
        .apiKeyInput:focus,
        .baseUrlInput:focus,
        .modelSelect:focus,
        .inputArea:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
        .chat {
          border: 1px solid #e5e7eb;
          padding: 1rem;
          height: 300px;
          overflow-y: auto;
          margin-bottom: 1rem;
          background: #f9fafb;
          border-radius: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        .message {
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          max-width: 80%;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          animation: fadeIn 0.3s ease;
        }
        .message.user {
          align-self: flex-end;
          background: #3b82f6;
          color: #fff;
          border-bottom-right-radius: 0.25rem;
        }
        .message.assistant {
          align-self: flex-start;
          background: #e5e7eb;
          color: #1f2937;
          border-bottom-left-radius: 0.25rem;
        }
        .message.typing {
          display: flex;
        }
        .message.typing span {
          width: 8px;
          height: 8px;
          background: #9ca3af;
          border-radius: 50%;
          margin-right: 4px;
          animation: blink 1.4s infinite both;
        }
        .message.typing span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .message.typing span:nth-child(3) {
          animation-delay: 0.4s;
        }
        .inputArea {
          resize: none;
          height: 80px;
        }
        button {
          align-self: flex-end;
          padding: 0.5rem 1rem;
          background: #3b82f6;
          color: #fff;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: background 0.3s, transform 0.3s;
        }
        button:hover {
          background: #2563eb;
        }
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes blink {
          0% {
            opacity: 0.2;
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0.2;
          }
        }
        .themeToggle {
          position: fixed;
          top: 1rem;
          right: 1rem;
          padding: 0.5rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          background: #fff;
          color: #000;
          cursor: pointer;
        }
        :global(body.dark-mode) {
          background: #1f2937;
        }
        :global(body.dark-mode) .container {
          background: #111827;
          color: #f9fafb;
        }
        :global(body.dark-mode) .chat {
          background: #1f2937;
          border-color: #374151;
        }
        :global(body.dark-mode) .message.user {
          background: #2563eb;
        }
        :global(body.dark-mode) .message.assistant {
          background: #374151;
          color: #f9fafb;
        }
        :global(body.dark-mode) .apiKeyInput,
        :global(body.dark-mode) .baseUrlInput,
        :global(body.dark-mode) .modelSelect,
        :global(body.dark-mode) .inputArea {
          background: #1f2937;
          color: #f9fafb;
          border-color: #374151;
        }
        :global(body.dark-mode) button {
          background: #2563eb;
        }
        :global(body.dark-mode) .themeToggle {
          background: #374151;
          color: #f9fafb;
          border-color: #4b5563;
        }
      `}</style>
    </div>
    </>
  );
}

