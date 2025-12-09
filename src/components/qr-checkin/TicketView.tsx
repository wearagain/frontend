import { useState, useRef, useEffect } from "react";
import { ChevronLeft, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { useGetAvailableVouchers } from "@/hooks/voucher/useGetVouchers";
import { useNavigate } from "react-router-dom";

interface TicketViewProps {
  onClose: () => void;
}

export const TicketView = ({ onClose }: TicketViewProps) => {
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

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToPartyList = () => {
    navigate("/party");
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white flex flex-col">
          <TicketHeader onBack={handleGoBack} onClose={onClose} />
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
      <div className="fixed inset-0 z-50 bg-black/50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white flex flex-col">
          <TicketHeader onBack={handleGoBack} onClose={onClose} />
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <p className="text-gray-400 mb-4">티켓을 불러오는데 실패했습니다.</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              다시 시도
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center">
      <div className="w-full max-w-[430px] bg-white flex flex-col">
        {/* 헤더 */}
        <TicketHeader onBack={handleGoBack} onClose={onClose} />

        {/* 컨텐츠 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {hasVouchers ? (
            <>
              {/* 티켓 캐러셀 */}
              <div className="flex-1 flex items-center py-8 overflow-hidden">
                <div
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto snap-x snap-mandatory w-full h-full items-center"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {vouchers.map((voucher, index) => (
                    <div
                      key={voucher.id}
                      className="ticket-card flex-shrink-0 snap-center h-full flex justify-center"
                      style={{
                        width: "100%",
                        paddingLeft: index === 0 ? "24px" : "8px",
                        paddingRight: index === vouchers.length - 1 ? "24px" : "8px",
                      }}
                    >
                      <div className="h-full" style={{ width: "calc(100% - 16px)", maxWidth: "350px" }}>
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
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <div className="text-center mb-8">
                <p className="text-gray-400">티켓이 없습니다.</p>
                <p className="text-gray-400">파티에 참여해 티켓을 받아보세요</p>
              </div>
              <Button
                onClick={handleGoToPartyList}
                className="w-full max-w-sm bg-[var(--color-mint-dark)] hover:bg-[var(--color-mint-light)] text-white py-4 rounded-xl"
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

// 헤더 컴포넌트
interface TicketHeaderProps {
  onBack: () => void;
  onClose: () => void;
}

const TicketHeader = ({ onBack, onClose }: TicketHeaderProps) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-100">
    <button
      onClick={onBack}
      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
    >
      <ChevronLeft size={24} className="text-gray-700" />
    </button>
    <h1 className="text-lg font-semibold">티켓</h1>
    <button
      onClick={onClose}
      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
    >
      <X size={24} className="text-gray-700" />
    </button>
  </div>
);

// 티켓 카드 컴포넌트
interface TicketCardProps {
  ticketNumber: string;
  qrCode: string;
}

const TicketCard = ({ ticketNumber, qrCode }: TicketCardProps) => (
  <div className="bg-[#2d2d2d] rounded-3xl p-6 h-full flex flex-col">
    {/* 티켓 번호 */}
    <div className="mb-6">
      <p className="text-gray-400 text-sm mb-1">티켓번호</p>
      <p className="text-white text-xl font-semibold">{ticketNumber}</p>
    </div>

    {/* QR 코드 영역 */}
    <div className="flex-1 flex items-center justify-center">
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

