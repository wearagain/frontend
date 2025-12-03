import HeaderContainer from "./HeaderContainer";
import { useNavigate } from "react-router-dom";
import { Back } from "@/components/common/header";

interface HeaderBackProps {
  label?: string;
  to?: string;
}

export default function HeaderBack({ label, to }: HeaderBackProps) {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <div className='flex'>
        <Back onClick={() => (to ? navigate(to) : navigate(-1))} />
        {label && <h2 className='ml-2 text-lg font-semibold'>{label}</h2>}
      </div>
    </HeaderContainer>
  );
}
