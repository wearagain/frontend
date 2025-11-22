import ScrollHeader from "@/components/community/SliderLayout/ScrollHeader.tsx";
import ClothItem from "@/components/community/SliderLayout/ClothItem.tsx";
import type {ThumbnailItem} from "@/types/community.ts";

interface BoardProps {
    label: String;
    items: ThumbnailItem[];
}

export default function ClothBoard({label, items}: BoardProps) {

    return (
        <div className='flex flex-col gap-4'>
            <ScrollHeader label={label}></ScrollHeader>
            <div className='flex gap-4 pr-4 overflow-x-auto custom-scroll'>
                {items.map((item) => (
                    <ClothItem {...item}></ClothItem>
                ))}
            </div>
        </div>
    )
}