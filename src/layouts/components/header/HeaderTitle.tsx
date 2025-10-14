import HeaderContainer from "./HeaderContainer";
import { ChevronLeft, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeaderGuide() {
  const navigate = useNavigate();

  return (
    <HeaderContainer className='justify-between'>
      <button onClick={() => navigate(-1)}>
        <ChevronLeft className='w-6 h-6' />
      </button>
      <button className='flex items-center gap-1 px-2 py-1 text-sm border rounded-full text-gray-600 border-gray-300'>
        <Info className='w-4 h-4' />
        서비스 안내
      </button>
    </HeaderContainer>
  );
}
