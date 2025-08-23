import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const editorRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const exec = (command) => document.execCommand(command, false, null);

  const saveNote = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    if (!html || html === '<br>') return;
    setNotes([...notes, html]);
    editorRef.current.innerHTML = '';
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: darkMode
          ? 'linear-gradient(135deg, #1e1e1e, #3a3a3a)'
          : 'linear-gradient(135deg, #e0f2fe, #f8fafc)',
        color: darkMode ? '#f3f4f6' : '#1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          backgroundColor: darkMode ? '#3b82f6' : '#1d4ed8',
          color: '#fff',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '9999px',
          cursor: 'pointer',
        }}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div
        style={{
          backgroundColor: darkMode ? '#374151' : '#ffffff',
          borderRadius: '1rem',
          boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          width: '100%',
          padding: '2rem',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          Hello World
        </h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>{time}</p>
        <div>
          <h2 style={{ marginBottom: '0.5rem' }}>Note Editor</h2>
          <div style={{ marginBottom: '0.75rem' }}>
            <button
              onClick={() => exec('bold')}
              style={{
                marginRight: '0.5rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.375rem',
                border: 'none',
                backgroundColor: darkMode ? '#4b5563' : '#3b82f6',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <b>B</b>
            </button>
            <button
              onClick={() => exec('italic')}
              style={{
                marginRight: '0.5rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.375rem',
                border: 'none',
                backgroundColor: darkMode ? '#4b5563' : '#3b82f6',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <i>I</i>
            </button>
            <button
              onClick={() => exec('underline')}
              style={{
                marginRight: '0.5rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.375rem',
                border: 'none',
                backgroundColor: darkMode ? '#4b5563' : '#3b82f6',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <u>U</u>
            </button>
            <button
              onClick={() => {
                if (editorRef.current) editorRef.current.innerHTML = '';
              }}
              style={{
                padding: '0.25rem 0.5rem',
                borderRadius: '0.375rem',
                border: 'none',
                backgroundColor: darkMode ? '#ef4444' : '#dc2626',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
          </div>
          <div
            ref={editorRef}
            contentEditable
            style={{
              border: '1px solid #e5e7eb',
              padding: '0.75rem',
              minHeight: '120px',
              borderRadius: '0.5rem',
              backgroundColor: darkMode ? '#4b5563' : '#f9fafb',
              color: darkMode ? '#f3f4f6' : '#1e293b',
            }}
          />
          <button
            onClick={saveNote}
            style={{
              marginTop: '0.75rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              backgroundColor: darkMode ? '#10b981' : '#059669',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Save Note
          </button>
          <div style={{ marginTop: '1rem' }}>
            {notes.map((note, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid #e5e7eb',
                  padding: '0.75rem',
                  marginBottom: '0.5rem',
                  borderRadius: '0.5rem',
                  backgroundColor: darkMode ? '#4b5563' : '#f9fafb',
                  color: darkMode ? '#f3f4f6' : '#1e293b',
                }}
                dangerouslySetInnerHTML={{ __html: note }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
