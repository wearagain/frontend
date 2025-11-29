import HeaderContainer from "./HeaderContainer";
import { X } from "@/assets/icons";

interface HeaderCloseProps {
  onClose?: () => void;
  label?: string;
}
//
export default function HeaderClose({ onClose, label }: HeaderCloseProps) {
  return (
    <HeaderContainer>
      <div className='flex items-center h-7 w-full'>
        {label && <h2 className='ml-2 text-lg font-semibold'>{label}</h2>}
        <button onClick={onClose} className='ml-auto'>
          <X className='w-6 h-6' />
        </button>
      </div>
    </HeaderContainer>
  );
}
