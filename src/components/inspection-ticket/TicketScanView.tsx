import { useState, useEffect, useRef, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { X } from "lucide-react";

interface TicketScanViewProps {
  partyId: string;
  clothingNumber?: string; // 선택적: 의류 코드가 있으면 전달, 없으면 건너뛰기로 온 경우
  onClose: () => void;
  onScanSuccess: (qrCode: string) => void;
}

export const TicketScanView = ({ onClose, onScanSuccess }: TicketScanViewProps) => {
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isMountedRef = useRef(true);
  const scannerContainerId = "ticket-scanner-container";

  // 스캐너 정지
  const stopScanner = useCallback(async () => {
    if (scannerRef.current) {
      try {
        const isScanning = scannerRef.current.isScanning;
        if (isScanning) {
          await scannerRef.current.stop();
        }
      } catch (err) {
        console.error("스캐너 정지 실패:", err);
      } finally {
        scannerRef.current = null;
      }
    }
  }, []);

  // 스캐너 시작
  const startScanner = useCallback(async () => {
    // 이미 스캐너가 실행 중이면 먼저 정지
    await stopScanner();

    if (!isMountedRef.current) return;

    try {
      setError(null);

      const html5QrCode = new Html5Qrcode(scannerContainerId);
      scannerRef.current = html5QrCode;

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1,
      };

      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          if (!isMountedRef.current) return;
          onScanSuccess(decodedText);
          stopScanner();
        },
        () => {
          // 에러는 무시 (스캔 중이므로)
        }
      );

      if (isMountedRef.current) {
        setError(null);
      }
    } catch (err: any) {
      console.error("스캐너 시작 실패:", err);
      if (isMountedRef.current) {
        setError("카메라를 시작할 수 없습니다. 카메라 권한을 확인해주세요.");
      }
    }
  }, [onScanSuccess, stopScanner, scannerContainerId]);

  useEffect(() => {
    isMountedRef.current = true;

    // DOM이 준비된 후 스캐너 시작
    const timer = setTimeout(() => {
      startScanner();
    }, 300);

    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
      stopScanner();
    };
  }, [startScanner, stopScanner]);

  const handleClose = () => {
    stopScanner();
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 bg-gray-900 flex flex-col'>
      {/* 헤더 */}
      <div className='flex justify-end p-4'>
        <button
          onClick={handleClose}
          className='p-2 hover:bg-gray-800 rounded-full transition-colors'
        >
          <X size={24} className='text-white' />
        </button>
      </div>

      {/* 스캔 영역 */}
      <div className='flex-1 flex flex-col items-center justify-center px-4'>
        <div className='w-full max-w-sm'>
          {/* 스캔 가이드 박스 */}
          <div className='relative w-full aspect-square bg-gray-800 rounded-lg overflow-hidden mb-4'>
            <div id={scannerContainerId} className='w-full h-full' style={{ minHeight: "300px" }} />
            {/* 가이드 프레임 */}
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
              <div className='w-64 h-64 border-2 border-white rounded-lg' />
            </div>
          </div>

          {/* 안내 문구 */}
          <p className='text-white text-center text-lg font-medium'>티켓을 스캔해 주세요</p>

          {error && <p className='text-red-400 text-center text-sm mt-2'>{error}</p>}
        </div>
      </div>
    </div>
  );
};
