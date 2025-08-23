import { useEffect, useState } from 'react';

export default function Home() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
      <p>{time}</p>
    </div>
  );
}
