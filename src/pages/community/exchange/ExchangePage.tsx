import ClothRowBoard from "@/components/community/exchange/sliderBoard/ClothRowBoard.tsx";
import type { ExchangeThumbnailResponse } from "@/types/community.ts";
import { generateDummyThumbnails } from "@/utils/community/dummy.ts";
import RedirectBoard from "@/components/community/exchange/sliderBoard/RedirectBoard.tsx";

const ExchangePage = () => {
  // 더미 데이터
  const thumbnails: ExchangeThumbnailResponse = {
    publicThumbnails: generateDummyThumbnails(10), // public 썸네일 10개
    privateThumbnails: generateDummyThumbnails(10), // private 썸네일 10개
  };

  const boardLabel = {
    private: "후원자 전용 선공개",
    public: "가지고 계신 티켓과 교환해 보세요",
  };

  return (
    <div className='main-inner flex flex-col h-full overflow-y-auto custom-scroll gap-11'>
      <ClothRowBoard
        label={boardLabel.private}
        items={thumbnails.privateThumbnails}
      ></ClothRowBoard>
      <ClothRowBoard label={boardLabel.public} items={thumbnails.publicThumbnails}></ClothRowBoard>

      <RedirectBoard />
    </div>
  );
};

export default ExchangePage;
