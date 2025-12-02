import HeaderContainer from "./HeaderContainer";
import { useNavigate } from "react-router-dom";
import { Back, Close } from "@/components/common/header";

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
        <Back onClick={() => navigate(-1)} />
        {label && <h2 className='ml-2 text-lg font-semibold'>{label}</h2>}
        <Close onClose={() => (to ? navigate(to) : onClose?.())} />
      </div>
    </HeaderContainer>
  );
}
