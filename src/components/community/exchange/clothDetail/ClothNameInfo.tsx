import type { ClothFilterCategory } from "@/types/community.ts";
import { Heart } from "lucide-react";

interface ClothNameInfo {
  name: string;
  category: ClothFilterCategory;
  isLiked: boolean;
  likeCount: number;
}

export default function ClothNameInfo({ name, category, isLiked, likeCount }: ClothNameInfo) {
  return (
    <div className='main-inner gap-1 pb-5 relative'>
      <p className='text-[#939396] text-sm'>{category}</p>
      <h4 className=' '>{name}</h4>
      <div className='absolute right-2 bottom-6'>
        <div className='flex gap-2 items-center h-5'>
          <div className='h-5 w-5'>
            {isLiked ? (
              <Heart className='w-full h-full' fill='#F23F3F' stroke='#F23F3F' />
            ) : (
              <Heart className='w-full h-full' />
            )}
          </div>

          <p className='font-medium text-lg'>{likeCount}</p>
        </div>
      </div>
    </div>
  );
}
