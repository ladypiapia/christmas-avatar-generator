import React from 'react';

interface AssetSelectorProps {
  selectedTab: 'hats' | 'frames';
  onTabChange: (tab: 'hats' | 'frames') => void;
  selectedHat: string | null;
  selectedFrame: string | null;
  onHatSelect: (hat: string) => void;
  onFrameSelect: (frame: string) => void;
  hats: readonly string[];
  frames: readonly string[];
}

const AssetSelector: React.FC<AssetSelectorProps> = ({
  selectedTab,
  onTabChange,
  selectedHat,
  selectedFrame,
  onHatSelect,
  onFrameSelect,
  hats,
  frames,
}) => {
  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md">
      <div className="flex gap-2 mb-3 sm:mb-4">
        <button
          onClick={() => onTabChange('hats')}
          className={`flex-1 py-1.5 sm:py-2 rounded-lg border text-sm sm:text-base ${
            selectedTab === 'hats'
              ? 'border-gray-800 bg-gray-800 text-white'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          Christmas Hats
        </button>
        <button
          onClick={() => onTabChange('frames')}
          className={`flex-1 py-1.5 sm:py-2 rounded-lg border text-sm sm:text-base ${
            selectedTab === 'frames'
              ? 'border-gray-800 bg-gray-800 text-white'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          Frames
        </button>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3">
        {selectedTab === 'hats' &&
          hats.map((hat) => (
            <button
              key={hat}
              onClick={() => onHatSelect(hat)}
              className={`p-1 sm:p-1.5 border rounded-lg touch-manipulation ${
                selectedHat === hat ? 'border-gray-800' : 'border-gray-200'
              }`}
            >
              <img src={hat} alt="Christmas Hat" className="w-full max-w-[60px] mx-auto" />
            </button>
          ))}

        {selectedTab === 'frames' &&
          frames.map((frame) => (
            <button
              key={frame}
              onClick={() => onFrameSelect(frame)}
              className={`p-1 sm:p-1.5 border rounded-lg touch-manipulation ${
                selectedFrame === frame ? 'border-gray-800' : 'border-gray-200'
              }`}
            >
              <img src={frame} alt="Frame" className="w-full max-w-[60px] mx-auto" />
            </button>
          ))}
      </div>
    </div>
  );
};

export default AssetSelector;