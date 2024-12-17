import React, { useState, useRef, useEffect } from 'react';
import { christmasHats } from '../assets/christmas/hats';
import { christmasFrames } from '../assets/christmas/frames';
import { downloadImage } from '../utils/imageUtils';
import ImageInput from './ImageInput';
import ImagePreview from './ImagePreview';
import AssetSelector from './AssetSelector';
import DownloadButton from './DownloadButton';

const ImageEditor: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<'hats' | 'frames'>('hats');
  const [selectedHat, setSelectedHat] = useState<string | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleHatSelect = (hat: string) => {
    setSelectedHat(prevHat => prevHat === hat ? null : hat);
  };

  const handleFrameSelect = (frame: string) => {
    setSelectedFrame(prevFrame => prevFrame === frame ? null : frame);
  };

  useEffect(() => {
    if (selectedHat && editorRef.current) {
      const container = editorRef.current;
      const centerX = (container.clientWidth - 96) / 2;
      const centerY = (container.clientHeight - 96) / 2;
      container.style.setProperty('--hat-position-x', `${centerX}px`);
      container.style.setProperty('--hat-position-y', `${centerY}px`);
    }
  }, [selectedHat]);

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-800 mb-4 sm:mb-8">
          Christmas Avatar Generator 🎄
        </h1>

        <ImageInput
          onImageUrlSubmit={setImageUrl}
          onImageUpload={handleImageUpload}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2">
            <ImagePreview
              imageUrl={imageUrl}
              selectedHat={selectedHat}
              selectedFrame={selectedFrame}
              previewRef={editorRef}
            />
          </div>

          <div className="order-first lg:order-none">
            <AssetSelector
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              selectedHat={selectedHat}
              selectedFrame={selectedFrame}
              onHatSelect={handleHatSelect}
              onFrameSelect={handleFrameSelect}
              hats={christmasHats}
              frames={christmasFrames}
            />
          </div>
        </div>

        <DownloadButton
          onClick={() => downloadImage(editorRef.current)}
        />
      </div>
    </div>
  );
};

export default ImageEditor;