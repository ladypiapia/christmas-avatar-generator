import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';

interface ImagePreviewProps {
  imageUrl: string;
  selectedHat: string | null;
  selectedFrame: string | null;
  previewRef: React.RefObject<HTMLDivElement>;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  selectedHat,
  selectedFrame,
  previewRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hatPosition, setHatPosition] = useState({ x: 0, y: 0 });
  const [hatSize, setHatSize] = useState({ width: 96, height: 96 });
  const [hatRotation, setHatRotation] = useState(0);

  useEffect(() => {
    if (selectedHat && containerRef.current) {
      const container = containerRef.current;
      const centerX = (container.clientWidth - hatSize.width) / 2;
      const centerY = (container.clientHeight - hatSize.height) / 2;
      setHatPosition({ x: centerX, y: centerY });
      setHatRotation(0);
    }
  }, [selectedHat, hatSize.width, hatSize.height]);

  const handleResize = (e: React.MouseEvent | React.TouchEvent, corner: string) => {
    e.stopPropagation();
    const startPos = {
      x: e.type.includes('mouse') ? (e as React.MouseEvent).pageX : (e as React.TouchEvent).touches[0].pageX,
      y: e.type.includes('mouse') ? (e as React.MouseEvent).pageY : (e as React.TouchEvent).touches[0].pageY,
    };

    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
      const currentPos = {
        x: 'touches' in moveEvent ? moveEvent.touches[0].pageX : moveEvent.pageX,
        y: 'touches' in moveEvent ? moveEvent.touches[0].pageY : moveEvent.pageY,
      };

      const deltaX = currentPos.x - startPos.x;
      const deltaY = currentPos.y - startPos.y;
      const aspectRatio = hatSize.width / hatSize.height;

      let newWidth = hatSize.width;
      let newHeight = hatSize.height;

      if (corner.includes('right')) {
        newWidth = Math.max(50, hatSize.width + deltaX);
        newHeight = newWidth / aspectRatio;
      }
      if (corner.includes('bottom')) {
        newHeight = Math.max(50, hatSize.height + deltaY);
        newWidth = newHeight * aspectRatio;
      }

      setHatSize({ width: newWidth, height: newHeight });
    };

    const onEnd = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
  };

  const handleDrag = (_e: any, data: { x: number; y: number }) => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const x = Math.min(Math.max(data.x, 0), containerWidth - hatSize.width);
      setHatPosition({ 
        x: x,
        y: data.y
      });
    }
  };

  const handleRotate = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const hatElement = (e.currentTarget.parentNode as HTMLElement);
    const hatRect = hatElement.getBoundingClientRect();
    const hatCenterX = hatRect.left + hatRect.width / 2;
    const hatCenterY = hatRect.top + hatRect.height / 2;

    const startAngle = Math.atan2(
      e.type.includes('mouse') 
        ? (e as React.MouseEvent).clientY - hatCenterY 
        : (e as React.TouchEvent).touches[0].clientY - hatCenterY,
      e.type.includes('mouse') 
        ? (e as React.MouseEvent).clientX - hatCenterX 
        : (e as React.TouchEvent).touches[0].clientX - hatCenterX
    );

    const initialRotation = hatRotation;

    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
      const currentX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const currentY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
      
      const angle = Math.atan2(
        currentY - hatCenterY,
        currentX - hatCenterX
      );

      let newRotation = initialRotation + ((angle - startAngle) * 180) / Math.PI;
      setHatRotation(newRotation);
    };

    const onEnd = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
  };

  const removeHat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHatPosition({ x: 0, y: 0 });
    setHatSize({ width: 96, height: 96 });
    setHatRotation(0);
  };

  return (
    <div
      ref={previewRef}
      className="bg-white rounded-lg p-2 sm:p-4 shadow-md aspect-square relative"
    >
      {imageUrl ? (
        <div ref={containerRef} className="w-full h-full relative">
          <div className="w-full h-full relative overflow-hidden">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full h-full object-contain"
              style={{ zIndex: 1 }}
            />
            {selectedHat && (
              <Draggable
                position={hatPosition}
                onDrag={handleDrag}
                bounds={false}
              >
                <div 
                  className="absolute cursor-move" 
                  style={{ 
                    width: `${hatSize.width}px`, 
                    height: `${hatSize.height}px`,
                    transform: `rotate(${hatRotation}deg)`,
                    zIndex: 2,
                    left: 0,
                    top: 0,
                  }}
                >
                  <img
                    src={selectedHat}
                    alt="Christmas Hat"
                    className="w-full h-full cursor-move"
                    style={{ 
                      touchAction: 'none',
                      pointerEvents: 'auto',
                    }}
                    draggable={false}
                  />
                  <div
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center cursor-pointer text-white text-sm"
                    onClick={removeHat}
                    style={{ zIndex: 10 }}
                  >
                    ×
                  </div>
                  <div
                    className="absolute w-3 h-3 bg-white border border-gray-400 rounded-full right-0 bottom-0 cursor-se-resize"
                    onMouseDown={(e) => handleResize(e, 'right-bottom')}
                    onTouchStart={(e) => handleResize(e, 'right-bottom')}
                    style={{ zIndex: 10 }}
                  />
                  <div
                    className="absolute w-3 h-3 bg-white border border-gray-400 rounded-full left-0 bottom-0 cursor-pointer"
                    onMouseDown={handleRotate}
                    onTouchStart={handleRotate}
                    style={{ 
                      zIndex: 10,
                      cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'%23000\' d=\'M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H17C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7V5Z\'/%3E%3C/svg%3E") 12 12, auto'
                    }}
                  />
                </div>
              </Draggable>
            )}
            {selectedFrame && (
              <img
                src={selectedFrame}
                alt="Frame"
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 3 }}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          Upload an image to get started
        </div>
      )}
    </div>
  );
};

export default ImagePreview;