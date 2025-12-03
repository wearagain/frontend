import HeaderContainer from "./HeaderContainer";
import { Close } from "@/components/common/header";

interface HeaderCloseProps {
  onClose?: () => void;
  label?: string;
}

export default function HeaderClose({ onClose, label }: HeaderCloseProps) {
  return (
    <HeaderContainer>
      <div className='flex items-center h-7 w-full'>
        {label && <h2 className='ml-2 text-lg font-semibold'>{label}</h2>}
        <Close onClose={() => onClose} />
      </div>
    </HeaderContainer>
  );
}
