import { useState, useEffect, useRef, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { X, ChevronDownIcon } from "@/assets/icons";
import { ChevronUp } from "lucide-react";
import type { HostedParty } from "./HostedPartyCard";

interface QrScannerViewProps {
  party: HostedParty;
  parties: HostedParty[];
  onClose: () => void;
  onSelectParty: (party: HostedParty) => void;
  onScanSuccess?: (decodedText: string, partyId: string) => void;
}

export const QrScannerView = ({
  party,
  parties,
  onClose,
  onSelectParty,
  onScanSuccess,
}: QrScannerViewProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isMountedRef = useRef(true);
  const scannerContainerId = "qr-scanner-container";

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
    if (isMountedRef.current) {
      setIsScanning(false);
    }
  }, []);

  // 스캐너 시작
  const startScanner = useCallback(async () => {
    // 이미 스캐너가 실행 중이면 먼저 정지
    await stopScanner();

    try {
      if (!isMountedRef.current) return;
      
      setError(null);
      setScanResult(null);

      const html5QrCode = new Html5Qrcode(scannerContainerId);
      scannerRef.current = html5QrCode;

      const config = {
        fps: 10,
        qrbox: { width: 200, height: 200 },
        aspectRatio: 1,
      };

      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          if (!isMountedRef.current) return;
          
          // QR 코드 스캔 성공
          setScanResult(decodedText);
          setIsScanning(false);

          // 스캔 성공 콜백 호출
          if (onScanSuccess) {
            onScanSuccess(decodedText, party.id);
          }

          // 스캐너 정지
          html5QrCode.stop().catch(console.error);
        },
        () => {
          // QR 코드 인식 실패 (계속 스캔 중) - 무시
        }
      );

      if (isMountedRef.current) {
        setIsScanning(true);
      }
    } catch (err) {
      console.error("QR 스캐너 시작 실패:", err);
      if (isMountedRef.current) {
        setError("카메라를 시작할 수 없습니다. 카메라 권한을 확인해주세요.");
        setIsScanning(false);
      }
    }
  }, [onScanSuccess, party.id, stopScanner]);

  // 컴포넌트 마운트 시 스캐너 시작
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
  }, []);

  // 파티 변경 시 스캐너 재시작
  useEffect(() => {
    if (scanResult) {
      // 스캔 결과가 있으면 리셋하고 다시 시작
      setScanResult(null);
      startScanner();
    }
  }, [party.id]);

  const handlePartySelect = (selectedParty: HostedParty) => {
    onSelectParty(selectedParty);
    setIsDropdownOpen(false);
  };

  const handleClose = async () => {
    await stopScanner();
    onClose();
  };

  // 다시 스캔하기
  const handleRescan = () => {
    setScanResult(null);
    setError(null);
    startScanner();
  };

  return (
    <div className='fixed inset-0 z-50 bg-[#1a1a1a] flex flex-col'>
      {/* 헤더 */}
      <div className='flex items-center justify-between p-4'>
        {/* 파티 선택 드롭다운 */}
        <div className='relative'>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className='flex items-center gap-2 text-white font-medium'
          >
            {party.title}
            {isDropdownOpen ? (
              <ChevronUp size={20} className='text-white' />
            ) : (
              <ChevronDownIcon size={20} className='text-white' />
            )}
          </button>

          {/* 드롭다운 메뉴 */}
          {isDropdownOpen && (
            <div className='absolute top-full left-0 mt-2 bg-[#2d2d2d] rounded-xl overflow-hidden min-w-[250px] shadow-xl z-10'>
              {parties.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePartySelect(p)}
                  className='w-full flex items-center justify-between px-4 py-3 hover:bg-[#3d3d3d] transition-colors border-b border-gray-700 last:border-b-0'
                >
                  <div className='flex flex-col items-start'>
                    <span className='text-white font-medium text-sm'>{p.title}</span>
                    <span className='text-gray-400 text-xs'>
                      {p.date} · {p.location}
                    </span>
                  </div>
                  <ChevronRightIcon className='text-gray-400' />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className='p-2 hover:bg-white/10 rounded-full transition-colors'
        >
          <X size={24} className='text-white' />
        </button>
      </div>

      {/* 카메라 뷰파인더 영역 */}
      <div className='flex-1 flex flex-col items-center justify-center px-8'>
        <div className='w-full max-w-[280px] aspect-square bg-[#2d2d2d] rounded-2xl overflow-hidden relative'>
          {/* QR 스캐너 컨테이너 */}
          <div
            id={scannerContainerId}
            className='w-full h-full [&_video]:object-cover [&_video]:w-full [&_video]:h-full [&_#qr-shaded-region]:border-[40px] [&_#qr-shaded-region]:border-black/50'
            style={{
              position: "relative",
            }}
          />

          {/* 스캔 성공 오버레이 */}
          {scanResult && (
            <div className='absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4'>
              <div className='text-green-400 mb-2'>
                <CheckCircleIcon />
              </div>
              <p className='text-white text-center text-sm mb-4'>스캔 완료!</p>
              <button
                onClick={handleRescan}
                className='bg-white text-black px-4 py-2 rounded-lg text-sm font-medium'
              >
                다시 스캔
              </button>
            </div>
          )}

          {/* 에러 오버레이 */}
          {error && (
            <div className='absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4'>
              <p className='text-red-400 text-center text-sm mb-4'>{error}</p>
              <button
                onClick={handleRescan}
                className='bg-white text-black px-4 py-2 rounded-lg text-sm font-medium'
              >
                다시 시도
              </button>
            </div>
          )}
        </div>

        {/* 안내 텍스트 */}
        <p className='text-gray-400 mt-8 text-center'>
          {isScanning ? "QR 코드를 스캔해 주세요" : scanResult ? "스캔이 완료되었습니다" : "카메라 로딩 중..."}
        </p>
      </div>
    </div>
  );
};

// ChevronRight 아이콘
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='m9 18 6-6-6-6' />
  </svg>
);

// 체크 서클 아이콘
const CheckCircleIcon = () => (
  <svg
    width='48'
    height='48'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <circle cx='12' cy='12' r='10' />
    <path d='m9 12 2 2 4-4' />
  </svg>
);
