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
            margin: 2rem auto;
            max-width: 600px;
            padding: 2rem;
            border-radius: 1rem;
            text-align: center;
            color: #fff;
            background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1),
              0 4px 6px rgba(0, 0, 0, 0.05);
          }
          .joke-box p {
            margin: 0.5rem 0;
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
          margin: 2rem auto;
          max-width: 600px;
          padding: 2rem;
          border-radius: 1rem;
          text-align: center;
          color: #fff;
          background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1),
            0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .joke-box p {
          margin: 0.5rem 0;
        }
      `}</style>
    </div>
  );
}
