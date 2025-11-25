import type {ThumbnailItem} from "@/types/community.ts";
import {Heart} from "@/assets/icons";


export default function ClothItem(item: ThumbnailItem) {
    return (
        <div className='flex flex-col gap-1'>
            <div className='relative'
                /* TODO: api fetch */
                 onClick={() => console.log("clicked thumbnail")}>
                <div className='w-[100px] h-[120px] rounded-lg bg-[#D9D9D9]'/>
                <div className='absolute bottom-3 right-3 w-5 h-5'
                    /* TODO: api fetch */
                     onClick={(e) => {
                         e.stopPropagation();
                         console.log("clicked heart!!");
                     }}>
                    {item.isLikedByUser ?
                        <Heart className='w-full h-full' fill="#F23F3F" stroke="#F23F3F"/> :
                        <Heart className='w-full h-full'/>
                    }
                </div>
            </div>

            <div className='flex flex-col gap-1'>
                <p className=''>{item.name}</p>
                <p className='text-[#939396] text-s'>찜 {item.likeCount}</p>
            </div>
            {/*<img src={item.thumbnailUrl} alt={item.id}/>*/}

        </div>
    );
}