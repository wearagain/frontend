import ClothRowBoard from "@/components/community/exchange/sliderBoard/ClothRowBoard.tsx";
import { useGetExchangeThumbnails } from "@/hooks/exchange/useGetExchangeThumbnails";
import StatusHandler from "@/components/common/StatusHandler.tsx";
import RedirectBoard from "@/components/community/exchange/sliderBoard/RedirectBoard.tsx";

const ExchangePage = () => {
  const { data, isLoading, isError, error } = useGetExchangeThumbnails();

  const boardLabel = {
    private: "후원자 전용 선공개",
    public: "가지고 계신 티켓과 교환해 보세요",
  };

  return (
    <StatusHandler isLoading={isLoading} isError={isError} error={error}>
      <div className='main-inner flex flex-col h-full overflow-y-auto custom-scroll gap-11'>
        <ClothRowBoard
          label={boardLabel.private}
          items={data?.privateThumbnails ?? []}
        ></ClothRowBoard>
        <ClothRowBoard
          label={boardLabel.public}
          items={data?.publicThumbnails ?? []}
        ></ClothRowBoard>

        <RedirectBoard />
      </div>
    </StatusHandler>
  );
};

export default ExchangePage;
