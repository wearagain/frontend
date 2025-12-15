import { Link } from "react-router-dom";
import { MessageCircleMore, X } from "lucide-react";

interface ActionProps {
  onClose: () => void,
  isAdmin: boolean;
  isLoggedIn: boolean;
}

export default function HeaderActions({ onClose, isAdmin, isLoggedIn }: ActionProps) {
  return (
    <div className="absolute top-3 right-0 flex items-center pr-5 gap-2 z-30">
      {!isAdmin && isLoggedIn ?
        (<Link
            to="/chat"
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="채팅하기"><MessageCircleMore className="w-5 h-5 text-[#222222]"
          />
          </Link>
        ) : (<></>)}
      <button
        onClick={onClose}
        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="닫기"
      >
        <X className="w-5 h-5 text-[#222222]" />
      </button>
    </div>
  );
}