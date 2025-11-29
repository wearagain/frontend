import HeaderContainer from "./HeaderContainer";
import { ChevronLeft } from "@/assets/icons";
import { useNavigate } from "react-router-dom";

interface HeaderBackProps {
  label?: string;
  to?: string;
}

export default function HeaderBack({ label, to }: HeaderBackProps) {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <div className='flex'>
        <button onClick={() => (to ? navigate(to) : navigate(-1))}>
          <ChevronLeft className='w-6 h-6' />
        </button>
        {label && <h2 className='ml-2 text-lg font-semibold'>{label}</h2>}
      </div>
    </HeaderContainer>
  );
}
