interface ImageIndicatorProps {
  length: number;
  currentIndex: number;
}

export default function ImageIndicator({ length, currentIndex }: ImageIndicatorProps) {
  return (
    <div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2'>
      {Array.from({ length }).map((_, idx) => (
        <div
          key={idx}
          className={`w-2 h-2 rounded-full transition-colors ${
            idx === currentIndex ? "bg-black" : "bg-gray-400"
          }`}
        />
      ))}
    </div>
  );
}
