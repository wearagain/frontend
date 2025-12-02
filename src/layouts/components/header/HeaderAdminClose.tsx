import HeaderContainer from "./HeaderContainer";
import { useNavigate } from "react-router-dom";
import { Close, Message } from "@/components/common/header";
import Settings from "@/components/common/header/Settings.tsx";

interface HeaderProps {
  label?: string;
  showLabel?: boolean;
  to?: string;
  onClose?: () => void;
}

export default function HeaderAdminClose({
  label = "가치입다",
  showLabel = true,
  onClose,
  to,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <div className='flex justify-between gap-2 items-center'>
        <Close onClose={() => (to ? navigate(to) : onClose?.())} />
        {showLabel && label && <h2 className='text-start'>{label}</h2>}
      </div>

      {/* Right Side */}
      <div className='flex gap-3'>
        <Message />
        <Settings onClick={() => console.log("clicked setings")} />
      </div>
    </HeaderContainer>
  );
}
