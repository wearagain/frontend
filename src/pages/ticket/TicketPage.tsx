import { useState, useRef, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { useGetAvailableVouchers } from "@/hooks/voucher/useGetVouchers";
import { useNavigate } from "react-router-dom";

export default function TicketPage() {
  const navigate = useNavigate();
  const { data: vouchers, isLoading, isError } = useGetAvailableVouchers();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const hasVouchers = vouchers && vouchers.length > 0;

  // 스크롤 이벤트로 현재 인덱스 업데이트
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const newIndex = Math.round(scrollLeft / containerWidth);
      setCurrentIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [vouchers]);

  const handleGoToPartyList = () => {
    navigate("/party");
  };

  // 로딩 상태
  if (isLoading) {
    return (
        <div className='fixed inset-y-[64px] h-full right-0 left-0 bg-white flex flex-col max-w-[430px] top-[64px] mx-auto'>
          <div className="w-full max-w-[430px] bg-white flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-400">로딩 중...</p>
            </div>
          </div>
        </div>
    );
  }

  // 에러 상태
  if (isError) {
    return (
        <div className='fixed inset-y-[64px] h-full right-0 left-0 bg-white flex flex-col max-w-[430px] top-[64px] mx-auto'>
            <div className="flex-1 flex-col items-center justify-center p-5">
              <p className="text-gray-400 text-center mb-4">티켓을 불러오는데 실패했습니다.</p>
              <Button
                  theme = 'mint'
                  onClick={() => window.location.reload()}
                  className="w-full"
              >
                다시 시도
              </Button>
            </div>
        </div>
    );
  }

  return (
      <div className='fixed inset-y-[64px] h-full right-0 left-0 bg-white flex flex-col max-w-[430px] top-[64px] mx-auto'>
        <div className="w-full max-w-[430px] bg-white flex flex-col">
          {/* 컨텐츠 */}
          <div className="flex-1 flex-col overflow-hidden">
            {hasVouchers ? (
                <>
                  {/* 티켓 캐러셀 */}
                  <div className="flex-1 items-center py-8 overflow-hidden">
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto snap-x snap-mandatory w-full h-full items-center"
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                          WebkitOverflowScrolling: "touch",
                        }}
                    >
                      {vouchers.map((voucher) => (
                          <div
                              key={voucher.id}
                              className="shrink-0 snap-center h-full flex justify-center"
                              style={{
                                width: "100%",
                              }}
                          >
                            <div className="h-full">
                              <TicketCard
                                  ticketNumber={voucher.sourceClothingNumber}
                                  qrCode={voucher.qrCode}
                              />
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>

                  {/* 페이지네이션 도트 */}
                  {vouchers.length > 1 && (
                      <div className="flex justify-center gap-2 pb-8">
                        {vouchers.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                    index === currentIndex ? "bg-gray-800" : "bg-gray-300"
                                }`}
                            />
                        ))}
                      </div>
                  )}
                </>
            ) : (
                // 빈 상태
                <div className="flex-1 flex-col items-center justify-center px-4 my-8">
                  <div className="text-center mb-8">
                    <p className="text-gray-400">티켓이 없습니다.</p>
                    <p className="text-gray-400">파티에 참여해 티켓을 받아보세요</p>
                  </div>
                  <Button
                      theme = 'mint'
                      onClick={handleGoToPartyList}
                      className="w-full"
                  >
                    파티 참여하기
                  </Button>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

// 티켓 카드 컴포넌트
interface TicketCardProps {
  ticketNumber: string;
  qrCode: string;
}

const TicketCard = ({ ticketNumber, qrCode }: TicketCardProps) => (
    <div className="bg-[#2d2d2d] rounded-3xl p-5 h-full flex flex-col">
      {/* 티켓 번호 */}
      <div className="mb-6">
        <p className="text-gray-400 text-sm mb-1">티켓번호</p>
        <p className="text-white text-xl font-semibold">{ticketNumber}</p>
      </div>

      {/* QR 코드 영역 */}
      <div className="flex-1 items-center justify-center">
        <div className="bg-white rounded-2xl w-full aspect-square max-w-[280px] flex items-center justify-center p-4">
          <QRCodeSVG
              value={qrCode}
              size={220}
              level="H"
              includeMargin={false}
              className="w-full h-full"
          />
        </div>
      </div>
    </div>
);