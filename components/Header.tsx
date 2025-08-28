
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center w-full p-4">
      <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-fuchsia-500 bg-clip-text text-transparent animate-[shine_5s_linear_infinite]"
          style={{ backgroundSize: '200% auto' }}>
        Y2K AI Photo Remixer
      </h1>
      <p className="text-cyan-300/80 mt-2 text-sm md:text-lg tracking-widest">
        Rewind Your Pixels to the Digital Dawn
      </p>
    </header>
  );
};

export default Header;
