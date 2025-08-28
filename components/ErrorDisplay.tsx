
import React from 'react';

interface ErrorDisplayProps {
  message: string;
  onReset: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-red-900/30 backdrop-blur-sm border border-red-500/50 rounded-2xl shadow-lg shadow-red-500/20 max-w-md">
      <div className="w-16 h-16 flex items-center justify-center bg-red-500/20 rounded-full border-2 border-red-500 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-red-300 mb-2">System Error</h2>
      <p className="text-red-300/80 mb-6">{message}</p>
      <button
        onClick={onReset}
        className="bg-red-500/20 border border-red-500 text-red-200 font-bold py-2 px-6 rounded-lg hover:bg-red-500/40 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-all duration-200 transform hover:scale-105"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorDisplay;
