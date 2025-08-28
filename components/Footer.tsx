
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center p-4">
      <p className="text-xs text-fuchsia-400/60 tracking-widest">
        &copy; {new Date().getFullYear()} Digital Nostalgia Corp. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
