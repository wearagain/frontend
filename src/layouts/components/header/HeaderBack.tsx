import HeaderContainer from "./HeaderContainer";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderBackProps {
  label?: string;
}

export default function HeaderBack({ label }: HeaderBackProps) {
  const navigate = useNavigate();

  return (
    <HeaderContainer className='justify-start'>
      <button onClick={() => navigate(-1)}>
        <ChevronLeft className='w-6 h-6' />
      </button>
      {label && <h2 className='ml-2 text-lg font-semibold'>{label}</h2>}
    </HeaderContainer>
  );
}
