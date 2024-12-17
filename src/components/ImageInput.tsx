import React from 'react';
import { Image } from 'lucide-react';

interface ImageInputProps {
  onImageUrlSubmit: (url: string) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageUrlSubmit, onImageUpload }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = formData.get('imageUrl') as string;
    if (url) onImageUrlSubmit(url);
  };

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md mb-4 sm:mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          name="imageUrl"
          placeholder="Enter image URL or tap icon to upload..."
          className="w-full p-2 sm:p-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm sm:text-base"
        />
        <label className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer touch-manipulation">
          <Image className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-gray-600" />
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
          />
        </label>
      </form>
    </div>
  );
};

export default ImageInput;