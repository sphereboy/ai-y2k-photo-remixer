
import React, { useRef, useState } from 'react';
import UploadIcon from './icons/UploadIcon';

interface FileUploadProps {
  onImageUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleDragEvents = (e: React.DragEvent<HTMLLabelElement>, dragging: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(dragging);
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    handleDragEvents(e, false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const dragClasses = isDragging 
    ? 'border-fuchsia-500 scale-105 shadow-[0_0_30px_rgba(217,70,239,0.5)]' 
    : 'border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.2)]';

  return (
    <div className="w-full max-w-xl flex flex-col items-center justify-center">
      <label
        onDragEnter={(e) => handleDragEvents(e, true)}
        onDragLeave={(e) => handleDragEvents(e, false)}
        onDragOver={(e) => handleDragEvents(e, true)}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed ${dragClasses} rounded-2xl cursor-pointer bg-black/30 backdrop-blur-sm hover:border-fuchsia-500 hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all duration-300 group`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center p-4">
          <UploadIcon className="w-12 h-12 mb-4 text-cyan-400 group-hover:text-fuchsia-400 transition-colors" />
          <p className="mb-2 text-lg font-semibold text-cyan-300">
            <span className="font-bold text-fuchsia-400">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-cyan-400/70">PNG, JPG, GIF or WEBP</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileUpload;
