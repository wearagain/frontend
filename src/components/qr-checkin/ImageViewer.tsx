import { useRef } from "react";

interface ImageViewerProps {
  images: string[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}

const ImageViewer = ({
                       images,
                       index,
                       onClose,
                       onChange,
                     }: ImageViewerProps) => {
  const startX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;

    const diff = startX.current - e.changedTouches[0].clientX;

    if (diff > 50 && index < images.length - 1) {
      onChange(index + 1);
    } else if (diff < -50 && index > 0) {
      onChange(index - 1);
    }

    startX.current = null;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* 닫기 */}
      <button
        className="absolute top-4 right-4 text-white text-xl"
        onClick={onClose}
      >
        ✕
      </button>

      {/* 좌 */}
      {index > 0 && (
        <button
          className="absolute left-4 text-white text-3xl"
          onClick={() => onChange(index - 1)}
        >
          ‹
        </button>
      )}

      {/* 이미지 */}
      <img
        src={images[index]}
        alt={`image-${index}`}
        className="max-w-full max-h-full object-contain"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />

      {/* 우 */}
      {index < images.length - 1 && (
        <button
          className="absolute right-4 text-white text-3xl"
          onClick={() => onChange(index + 1)}
        >
          ›
        </button>
      )}
    </div>
  );
};

export default ImageViewer;