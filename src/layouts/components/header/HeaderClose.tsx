import HeaderContainer from "./HeaderContainer";
import { Close } from "@/components/common/header";
import { useNavigate } from "react-router-dom"

interface HeaderCloseProps {
  onClose?: () => void;
  to?: string;
  label?: string;
}

export default function HeaderClose({ onClose, to, label }: HeaderCloseProps) {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <div className='flex items-center h-7 w-full'>
        {label && <h2 className='ml-2 text-lg font-semibold'>{label}</h2>}
        <Close onClose={onClose= () => (to ? navigate(to) : onClose?.())} />
      </div>
    </HeaderContainer>
  );
}
