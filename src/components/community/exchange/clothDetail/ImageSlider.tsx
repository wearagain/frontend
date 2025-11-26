import ImageIndicator from "@/components/community/exchange/clothDetail/ImageIndicator.tsx";
import { useEffect, useRef, useState } from "react";

interface ImageSliderProps {
  images: string[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll(".snap-item");
    if (!items) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setCurrentIndex(index);
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.5, // 절반 이상 보일 때
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className='relative no-pl'>
      <div
        ref={containerRef}
        className='flex relative overflow-x-auto custom-scroll snap-x snap-mandatory scroll-smooth space-x-4'
      >
        {images.map((_, idx) => (
          <div
            key={idx}
            data-index={idx}
            className='snap-item flex-shrink-0 w-full aspect-square bg-[#D9D9D9] snap-center relative'
          >
            <h2 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              상품 이미지
            </h2>
          </div>
        ))}
      </div>

      <ImageIndicator length={images.length} currentIndex={currentIndex} />
    </div>
  );
}
