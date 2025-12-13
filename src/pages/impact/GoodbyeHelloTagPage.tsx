import { useState } from "react";
import { Button } from "@/components/ui/button";
import GoodbyeHelloTag from "@/components/impact/GoodbyeHelloTag";
import { TicketCameraView } from "@/components/impact/TicketCameraView";

const GoodbyeHelloTagPage = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  // TODO: API 연동 후 실제 데이터로 교체
  const exchangeCount = 2;
  const carbonReduced = 7.628;

  const tags = [
    {
      id: 1,
      message:
        "잘가! 연보라 반집업 야. 우리는 제작년 가을에, 무신사에서 처음 만났지. 퍼컬이라는 이유로 널 구입했지만 4회 입고 목까지 카라가 올라오는게 거슬려서 널 보낸다. 부디 쿨톤주인을 만나서 귀엽게임어지렵",
      footer:
        "새 주인님 가져가시는 분 SNS 와 #다시입다연구소 #21프로파티를 태그해서 이 옷의 소식을 전해주세요 🧘‍♀️",
    },
    {
      id: 2,
      message:
        "잘가! 초록털모자야 내가 널 대학생때. 홍대에서 만나 색이 강렬하고 예뻐 사게 되었는데 1~10 회 입고 미니멀 하기 넘떠나보내 부디 좋은 주인을 다시 만나길바래 ♡♡",
    },
  ];

  const handleTakePhoto = () => {
    setIsCameraOpen(true);
  };

  const handleCapture = (imageData: string) => {
    console.log("촬영된 이미지:", imageData);
    // TODO: 이미지 데이터 처리 (서버 전송 등)
    setIsCameraOpen(false);
    // TODO: 촬영 완료 후 처리 (예: 성공 모달 표시)
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  return (
    <div className='flex flex-col h-full bottombar-p'>
      {/* 환경 영향 요약 */}
      <div className='main-inner flex flex-col items-center justify-center py-8 gap-2'>
        <h2 className='text-center text-2xl font-bold'>
          지금까지 의류 교환{" "}
          <span className='text-[var(--color-mint-dark)]'>{exchangeCount}번</span>으로
        </h2>
        <h2 className='text-center text-2xl font-bold'>
          <span className='text-[var(--color-mint-dark)]'>{carbonReduced}kg</span>을 줄였어요
        </h2>
      </div>

      {/* 태그 카드들 */}
      <div className='flex-1 overflow-y-auto px-4 pb-4'>
        <div className='flex gap-4 justify-center items-start max-w-full overflow-x-auto py-4'>
          {tags.map((tag, index) => (
            <GoodbyeHelloTag
              key={tag.id}
              message={tag.message}
              footer={tag.footer}
              className={index === 0 ? "z-10" : "-ml-8 z-0"}
            />
          ))}
        </div>
      </div>

      {/* 촬영하기 버튼 */}
      <div className='bottombar-wrapper px-5'>
        <Button
          type='button'
          onClick={handleTakePhoto}
          theme='mint'
          variant='primary'
          className='w-full h-[52px] max-w-[430px] mx-auto'
        >
          촬영하기
        </Button>
      </div>

      {/* 카메라 뷰 */}
      {isCameraOpen && <TicketCameraView onClose={handleCloseCamera} onCapture={handleCapture} />}
    </div>
  );
};

export default GoodbyeHelloTagPage;
