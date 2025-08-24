import { useState } from 'react';

export default function Home() {
  const [apiKey, setApiKey] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!apiKey || !input) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: newMessages,
        }),
      });
      const data = await res.json();
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
    <div className="container">
      <h1>LLM Chatbot</h1>
      <input
        type="password"
        placeholder="Enter API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="apiKeyInput"
      />
      <div className="chat">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.role}`}>
            <strong>{m.role === 'user' ? 'You' : 'Bot'}:</strong> {m.content}
          </div>
        ))}
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 2rem auto;
          font-family: sans-serif;
          display: flex;
          flex-direction: column;
        }
        .apiKeyInput {
          margin-bottom: 1rem;
          padding: 0.5rem;
        }
        .chat {
          border: 1px solid #ccc;
          padding: 1rem;
          height: 300px;
          overflow-y: auto;
          margin-bottom: 1rem;
        }
        .message {
          margin-bottom: 0.5rem;
        }
        textarea {
          resize: none;
          height: 80px;
          margin-bottom: 1rem;
          padding: 0.5rem;
        }
        button {
          align-self: flex-end;
          padding: 0.5rem 1rem;
        }
      `}</style>
    </div>
  );
}

