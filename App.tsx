
import React, { useState, useCallback } from 'react';
import { AppState } from './types';
import { remixImageToY2K } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import FileUpload from './components/FileUpload';
import Loader from './components/Loader';
import ImageDisplay from './components/ImageDisplay';
import ErrorDisplay from './components/ErrorDisplay';

interface ImageData {
  base64: string;
  mimeType: string;
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [remixedImage, setRemixedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileToBase64 = (file: File): Promise<ImageData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve({ base64: base64String, mimeType: file.type });
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      setAppState(AppState.ERROR);
      return;
    }

    setAppState(AppState.PROCESSING);
    setError(null);
    setRemixedImage(null);

    try {
      const imageData = await fileToBase64(file);
      setOriginalImage(imageData);
      
      const y2kImageBase64 = await remixImageToY2K(imageData.base64, imageData.mimeType);
      
      setRemixedImage(`data:image/png;base64,${y2kImageBase64}`);
      setAppState(AppState.SUCCESS);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred during the remix process.';
      setError(`Failed to remix image. ${errorMessage}`);
      setAppState(AppState.ERROR);
    }
  }, []);

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setOriginalImage(null);
    setRemixedImage(null);
    setError(null);
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.PROCESSING:
        return <Loader />;
      case AppState.SUCCESS:
        return (
          originalImage && remixedImage && (
            <ImageDisplay
              originalSrc={`data:${originalImage.mimeType};base64,${originalImage.base64}`}
              remixedSrc={remixedImage}
              onReset={handleReset}
            />
          )
        );
      case AppState.ERROR:
        return <ErrorDisplay message={error || 'An unexpected error occurred.'} onReset={handleReset} />;
      case AppState.IDLE:
      default:
        return <FileUpload onImageUpload={handleImageUpload} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0c22] text-white flex flex-col items-center justify-between p-4 bg-[radial-gradient(#2a2a57_1px,transparent_1px)] [background-size:24px_24px]">
      <Header />
      <main className="flex flex-col items-center justify-center w-full max-w-5xl flex-grow my-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
