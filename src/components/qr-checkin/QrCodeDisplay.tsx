import { QRCodeSVG } from "qrcode.react";

interface QrCodeDisplayProps {
  qrCode: string;
  partyTitle?: string;
  onPartySelect?: () => void;
}

export const QrCodeDisplay = ({
  qrCode,
  partyTitle,
  onPartySelect,
}: QrCodeDisplayProps) => {
  return (
    <div className="bg-[#2d2d2d] rounded-3xl p-6 w-full max-w-sm shadow-xl">
      {/* QR 코드 영역 */}
      <div className="bg-white rounded-2xl aspect-square flex items-center justify-center p-4">
        <QRCodeSVG
          value={qrCode}
          size={200}
          level="H"
          includeMargin={false}
        />
      </div>

      {/* 파티 정보 및 선택 버튼 */}
      {partyTitle && (
        <div className="text-white mt-6">
          <p className="text-sm text-gray-400 mb-1">체크인할 파티</p>
          <button
            onClick={onPartySelect}
            className="flex items-center gap-1 text-base font-medium hover:text-gray-300 transition-colors"
          >
            {partyTitle}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
