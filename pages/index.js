import { useState } from 'react';

const initialTweets = [
  { id: 1, author: 'Alice', handle: '@alice', content: 'Hello world! 👋' },
  { id: 2, author: 'Bob', handle: '@bob', content: 'Second tweet with Next.js 😄' },
];

export default function Home() {
  const [tweets, setTweets] = useState(initialTweets);
  const [draft, setDraft] = useState('');

  const postTweet = () => {
    const text = draft.trim();
    if (!text) return;
    const newTweet = {
      id: Date.now(),
      author: 'You',
      handle: '@you',
      content: text,
    };
    setTweets([newTweet, ...tweets]);
    setDraft('');
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Home</h1>
      </header>

      <section className="composer">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="What's happening?"
        />
        <button onClick={postTweet}>Tweet</button>
      </section>

      <ul className="feed">
        {tweets.map((tweet) => (
          <li key={tweet.id} className="tweet">
            <strong>
              {tweet.author} <span className="handle">{tweet.handle}</span>
            </strong>
            <p>{tweet.content}</p>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          border-left: 1px solid #e5e7eb;
          border-right: 1px solid #e5e7eb;
          min-height: 100vh;
          font-family: system-ui, sans-serif;
        }
        .header {
          position: sticky;
          top: 0;
          background: #fff;
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .composer {
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
        }
        .composer textarea {
          border: none;
          resize: none;
          min-height: 80px;
          outline: none;
          font-size: 1rem;
        }
        .composer button {
          align-self: flex-end;
          background: #1d9bf0;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          cursor: pointer;
          margin-top: 0.5rem;
        }
        .feed {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .tweet {
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .handle {
          color: #6b7280;
          font-weight: normal;
        }
      `}</style>
    </div>
  );
}

