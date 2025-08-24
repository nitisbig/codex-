import { useEffect, useState } from 'react';

export default function JokeBox() {
  const [joke, setJoke] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchJoke() {
      try {
        const res = await fetch('https://official-joke-api.appspot.com/jokes/random');
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted) setJoke(data);
      } catch (err) {
        console.error('Error fetching joke:', err);
      }
    }

    fetchJoke();
    const id = setInterval(fetchJoke, 5000);

    return () => {
      isMounted = false;
      clearInterval(id);
    };
  }, []);

  if (!joke) {
    return (
      <div className="joke-box">
        Loading...
        <style jsx>{`
          .joke-box {
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            padding: 1rem;
            margin: 2rem auto;
            max-width: 600px;
            background: #fff;
            text-align: center;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="joke-box">
      <p>{joke.setup}</p>
      <p><em>{joke.punchline}</em></p>
      <style jsx>{`
        .joke-box {
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 1rem;
          margin: 2rem auto;
          max-width: 600px;
          background: #fff;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
