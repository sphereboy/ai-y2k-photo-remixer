
import React from 'react';
import DownloadIcon from './icons/DownloadIcon';

interface ImageDisplayProps {
  originalSrc: string;
  remixedSrc: string;
  onReset: () => void;
}

const ImageCard: React.FC<{ src: string; title: string; isRemixed?: boolean }> = ({ src, title, isRemixed = false }) => (
    <div className="flex flex-col items-center w-full">
        <h3 className={`text-xl font-bold mb-3 tracking-widest ${isRemixed ? 'text-fuchsia-400' : 'text-cyan-400'}`}>{title}</h3>
        <div className={`aspect-square w-full rounded-lg overflow-hidden border-2 ${isRemixed ? 'border-fuchsia-500/50 shadow-[0_0_20px_rgba(217,70,239,0.4)]' : 'border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.2)]'}`}>
            <img src={src} alt={title} className="w-full h-full object-cover" />
        </div>
    </div>
);


const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalSrc, remixedSrc, onReset }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = remixedSrc;
    link.download = 'y2k-remix.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="w-full flex flex-col items-center animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8">
            <ImageCard src={originalSrc} title="Original" />
            <ImageCard src={remixedSrc} title="Y2K Remix" isRemixed />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
             <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 bg-fuchsia-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:ring-opacity-75 transition-all duration-200 shadow-lg hover:shadow-fuchsia-500/50 transform hover:scale-105"
            >
                <DownloadIcon className="w-5 h-5" />
                Download Remix
            </button>
            <button
                onClick={onReset}
                className="bg-cyan-500/20 border border-cyan-500 text-cyan-300 font-bold py-3 px-6 rounded-lg hover:bg-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 transition-all duration-200 transform hover:scale-105"
            >
                Remix Another
            </button>
        </div>
    </div>
  );
};

export default ImageDisplay;
