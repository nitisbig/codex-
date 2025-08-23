import { useEffect, useState } from 'react';

// Simple tokenizers for demonstration
const TOKENIZERS = {
  whitespace: (text) => text.trim().split(/\s+/).filter(Boolean),
  punctuation: (text) => text.match(/\w+|[^\s\w]/g) || [],
  character: (text) => Array.from(text),
};

export default function Home() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('whitespace');
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const tokenizer = TOKENIZERS[mode];
    setTokens(tokenizer(text));
  }, [text, mode]);

  const copyTokens = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(tokens.join(' '));
    }
  };

  const estimatedTokens = Math.ceil(text.length / 4);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '1rem' }}>
        Tokenizer Playground
      </h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Type or paste text here..."
        style={{ width: '100%', padding: '1rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '0.5rem' }}
      />
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem', gap: '1rem', flexWrap: 'wrap' }}>
        <label htmlFor="mode">Tokenizer:</label>
        <select
          id="mode"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '0.375rem' }}
        >
          <option value="whitespace">Whitespace</option>
          <option value="punctuation">Punctuation Aware</option>
          <option value="character">Character</option>
        </select>
        <button
          onClick={() => setText('')}
          style={{ padding: '0.5rem 1rem', borderRadius: '0.375rem', border: 'none', backgroundColor: '#ef4444', color: '#fff', cursor: 'pointer' }}
        >
          Clear
        </button>
        <button
          onClick={copyTokens}
          style={{ padding: '0.5rem 1rem', borderRadius: '0.375rem', border: 'none', backgroundColor: '#3b82f6', color: '#fff', cursor: 'pointer' }}
        >
          Copy Tokens
        </button>
      </div>
      <p style={{ marginTop: '1rem' }}>
        Token count: {tokens.length} | Estimated GPT-3.5 tokens: {estimatedTokens}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
        {tokens.map((tok, idx) => (
          <code
            key={idx}
            style={{ padding: '0.25rem 0.5rem', background: '#f3f4f6', borderRadius: '0.25rem' }}
          >
            {tok}
          </code>
        ))}
      </div>
    </div>
  );
}
