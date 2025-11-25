import ClothBoard from "@/components/community/sliderLayout/ClothBoard.tsx";
import type {ExchangeThumbnailResponse} from "@/types/community.ts";
import {generateDummyThumbnails} from "@/utils/community/dummy.ts";
import RedirectBoard from "@/components/community/sliderLayout/RedirectBoard.tsx";

const ExchangePage = () => {

    // 더미 데이터
    const thumbnails: ExchangeThumbnailResponse = {
        publicThumbnails: generateDummyThumbnails(10),  // public 썸네일 10개
        privateThumbnails: generateDummyThumbnails(10), // private 썸네일 10개
    };

    const boardLabel = {
        'private': '후원자 전용 선공개',
        'public': '가지고 계신 티켓과 교환해 보세요'
    }

    return (
    <div className='flex flex-col gap-11'>
        <ClothBoard label={boardLabel.private} items={thumbnails.privateThumbnails}></ClothBoard>
        <ClothBoard label={boardLabel.public} items={thumbnails.publicThumbnails}></ClothBoard>

        <RedirectBoard />
    </div>
)
};

export default ExchangePage;
