import HeaderContainer from "./HeaderContainer";
import { X } from "lucide-react";

interface HeaderCloseProps {
  onClose?: () => void;
}

export default function HeaderClose({ onClose }: HeaderCloseProps) {
  return (
    <HeaderContainer className='justify-end'>
      <button onClick={onClose}>
        <X className='w-6 h-6' />
      </button>
    </HeaderContainer>
  );
}
