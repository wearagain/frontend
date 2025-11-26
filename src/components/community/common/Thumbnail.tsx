import { Heart } from "@/assets/icons";
import { useGoClothDetail } from "@/hooks/community/useGoClothDetail.ts";

interface ThumbnailProps {
  scrollDirection?: "x" | "y";
  isLiked: boolean;
  id: string;
}

export default function Thumbnail({ scrollDirection, isLiked, id }: ThumbnailProps) {
  const goClothDetail = useGoClothDetail();

  return (
    <div className='relative' onClick={() => goClothDetail(id)}>
      <div
        className={`${scrollDirection == "y" ? "w-full" : "w-[100px]"} aspect-[5/6] rounded-lg bg-[#D9D9D9]`}
      />
      <div
        className={`absolute bottom-3 right-3 ${scrollDirection == "y" ? "w-6 h-6" : "w-5 h-5"}`}
        /* TODO: api fetch */
        onClick={(e) => {
          e.stopPropagation();
          console.log("clicked heart!!");
        }}
      >
        {isLiked ? (
          <Heart className='w-full h-full' fill='#F23F3F' stroke='#F23F3F' />
        ) : (
          <Heart className='w-full h-full' />
        )}
      </div>
    </div>
  );
}
