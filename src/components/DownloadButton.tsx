import React from 'react';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  onClick: () => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick }) => {
  return (
    <div className="mt-4 sm:mt-8 text-center">
      <button
        onClick={onClick}
        className="w-full sm:w-auto bg-gray-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-700 inline-flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation"
      >
        <Download size={18} className="sm:w-5 sm:h-5" />
        Download Image
      </button>
    </div>
  );
};

export default DownloadButton;