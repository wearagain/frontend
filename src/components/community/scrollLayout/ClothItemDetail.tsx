import type {RepairClothsResponse} from "@/types/community.ts";
import {Heart} from "@/assets/icons";

export default function ClothItemDetail(item: RepairClothsResponse) {
    return (
        <div className='w-full flex flex-col gap-2'>
            <div className='relative'
                /* TODO: api fetch */
                 onClick={() => console.log("clicked thumbnail")}>
                <div className='w-full aspect-[5/6] rounded-lg bg-[#D9D9D9]'/>
                <div className='absolute bottom-3 right-3 w-6 h-6'
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
                <p onClick={() => console.log("clicked repairer")}
                className='font-medium text-sm'>{item.repairerName}</p>
                {/* TODO: api fetch */}
                <p
                    className='text-base'
                    onClick={() => console.log("clicked name")}>{item.name}</p>
                <p className='text-[#939396] text-s'>찜 {item.likeCount}</p>
            </div>
            {/*<img src={item.thumbnailUrl} alt={item.id}/>*/}

        </div>
    );
}