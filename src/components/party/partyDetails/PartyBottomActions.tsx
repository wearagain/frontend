import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

export const PartyBottomActions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const goToApply = () => navigate("apply");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.4,
      }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className='h-[100px]' />

      <div
        className={clsx(
          "fixed bottom-0 left-0 w-full flex items-center justify-between gap-2 bg-white px-4 py-3 z-10 shadow-sm transition-all duration-700 ease-in-out",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
        )}
      >
        <Button className='w-12 h-12 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-950'>
          <MessageCircle size={20} />
        </Button>
        <Button
          className='flex-1 h-12 bg-[#63c5c8] text-white text-base font-medium rounded-lg'
          onClick={goToApply}
        >
          신청하기
        </Button>
      </div>
    </>
  );
};
