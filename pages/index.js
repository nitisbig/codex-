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
        backgroundColor: darkMode ? '#333' : '#fff',
        color: darkMode ? '#fff' : '#000',
        minHeight: '100vh',
        padding: '1rem',
      }}
    >
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <h1>Hello World</h1>
      <p>{time}</p>
      <div style={{ marginTop: '2rem' }}>
        <h2>Note Editor</h2>
        <div style={{ marginBottom: '0.5rem' }}>
          <button onClick={() => exec('bold')}>
            <b>B</b>
          </button>
          <button onClick={() => exec('italic')}>
            <i>I</i>
          </button>
          <button onClick={() => exec('underline')}>
            <u>U</u>
          </button>
          <button
            onClick={() => {
              if (editorRef.current) editorRef.current.innerHTML = '';
            }}
          >
            Clear
          </button>
        </div>
        <div
          ref={editorRef}
          contentEditable
          style={{
            border: '1px solid #ccc',
            padding: '0.5rem',
            minHeight: '100px',
            backgroundColor: darkMode ? '#555' : '#fff',
            color: darkMode ? '#fff' : '#000',
          }}
        />
        <button onClick={saveNote} style={{ marginTop: '0.5rem' }}>
          Save Note
        </button>
        <div style={{ marginTop: '1rem' }}>
          {notes.map((note, idx) => (
            <div
              key={idx}
              style={{
                border: '1px solid #ccc',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                backgroundColor: darkMode ? '#555' : '#fff',
                color: darkMode ? '#fff' : '#000',
              }}
              dangerouslySetInnerHTML={{ __html: note }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
