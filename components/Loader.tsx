
import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Dialing up the modem...",
  "Booting up the Y2K engine...",
  "Applying digital gloss...",
  "Remixing in the digital ether...",
  "Compiling retro-futurism...",
];

const Loader: React.FC = () => {
  const [message, setMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = loadingMessages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-black/30 backdrop-blur-sm border border-cyan-400/30 rounded-2xl shadow-lg shadow-cyan-500/10">
      <svg className="animate-spin h-16 w-16 text-fuchsia-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="mt-6 text-lg tracking-wider text-cyan-300 transition-opacity duration-500">{message}</p>
    </div>
  );
};

export default Loader;
