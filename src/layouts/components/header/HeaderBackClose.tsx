import HeaderContainer from "./HeaderContainer";
import { X } from "@/assets/icons";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderCloseProps {
  onClose?: () => void;
  label?: string;
  to?: string;
}

export default function HeaderBackClose({ onClose, label, to }: HeaderCloseProps) {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <div className='flex items-center h-7 w-full'>
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className='w-6 h-6' />
        </button>
        {label && <h2 className='ml-2 text-lg font-semibold'>{label}</h2>}
        <button
          onClick={() => {
            if (to) navigate(to);
            else onClose?.();
          }}
          className='ml-auto'
        >
          <X className='w-6 h-6' />
        </button>
      </div>
    </HeaderContainer>
  );
}
