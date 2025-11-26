import { Heart } from "lucide-react";

interface DetailBottomBarProps {
  isLiked: boolean;
}

export default function DetailBottomBar({ isLiked }: DetailBottomBarProps) {
  return (
    <div className='main-inner pr-5 pb-14 pt-5 flex gap-[10px] min-h-[52px] sticky bottom-0 w-full bg-white'>
      <button
        // onClick={() =>
        //   setLiked((i) => {
        //     console.log("heart clicked!");
        //     return ++i;
        //   })
        // }
        className='w-[52px] h-full min-h-[52px] bg-white rounded-[10px] border border-[#424242] relative flex items-center justify-center'
      >
        <Heart className='w-6 h-6' fill={isLiked ? "#F23F3F" : "none"} stroke='#F23F3F' />
      </button>
      <button className='flex-1 h-full min-h-[52px] bg-[#3DC0C5] rounded-[10px] border border-[#3DC0C5]'>
        <h3 className='text-white'>교환하기</h3>
      </button>
    </div>
  );
}
