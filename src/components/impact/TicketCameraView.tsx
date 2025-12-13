import { useState, useEffect, useRef } from "react";
import { X } from "@/assets/icons";

interface TicketCameraViewProps {
  onClose: () => void;
  onCapture: (imageData: string) => void;
}

export const TicketCameraView = ({ onClose, onCapture }: TicketCameraViewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 카메라 시작
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment", // 후면 카메라
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          setIsLoading(false);
        }
      } catch (err) {
        console.error("카메라 시작 실패:", err);
        setError("카메라를 시작할 수 없습니다. 카메라 권한을 확인해주세요.");
        setIsLoading(false);
      }
    };

    startCamera();

    // 정리 함수
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  // 사진 촬영
  const handleCapture = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 비디오 프레임을 캔버스에 그리기
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 이미지 데이터 추출
    const imageData = canvas.toDataURL("image/jpeg", 0.9);
    onCapture(imageData);

    // 카메라 정지
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  // 닫기
  const handleClose = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 bg-black flex flex-col'>
      {/* 상단 헤더 */}
      <div className='flex items-center justify-between p-4 pt-12'>
        <div className='flex-1' />
        <h2 className='text-white text-xl font-semibold text-center flex-1'>
          GoodBye&Hello 티켓을 촬영해 주세요
        </h2>
        <div className='flex-1 flex justify-end'>
          <button
            onClick={handleClose}
            className='p-2 hover:bg-white/10 rounded-full transition-colors'
          >
            <X size={24} className='text-white' />
          </button>
        </div>
      </div>

      {/* 카메라 뷰 */}
      <div className='flex-1 flex flex-col items-center justify-center relative overflow-hidden'>
        {isLoading && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/80 z-20'>
            <p className='text-white text-center'>카메라 로딩 중...</p>
          </div>
        )}

        {error && (
          <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 px-4'>
            <p className='text-red-400 text-center mb-4'>{error}</p>
            <button
              onClick={handleClose}
              className='bg-white text-black px-4 py-2 rounded-lg text-sm font-medium'
            >
              닫기
            </button>
          </div>
        )}

        {/* 비디오 배경 (전체 화면) */}
        <div className='absolute inset-0'>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className='w-full h-full object-cover'
            style={{ transform: "scaleX(-1)" }} // 미러 효과
          />
        </div>

        {/* 어두운 오버레이 */}
        <div className='absolute inset-0 bg-black/60 z-10' />

        {/* 촬영 가이드 프레임 (밝은 영역) */}
        <div className='relative z-10 w-[280px] h-[400px] border-2 border-white rounded-[10px] bg-transparent' />
      </div>

      {/* 촬영 버튼 */}
      <div className='pb-8 flex justify-center'>
        <button
          onClick={handleCapture}
          disabled={isLoading || !!error}
          className='w-16 h-16 rounded-full bg-white border-2 border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg'
        />
      </div>
    </div>
  );
};
