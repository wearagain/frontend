import HeaderContainer from "./HeaderContainer";
import { useNavigate } from "react-router-dom";
import { Back, ServiceInfo } from "@/components/common/header";

export default function HeaderGuide() {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <div className='items-center flex justify-between w-full h-[28px]'>
        <Back onClick={() => navigate(-1)} />
        <ServiceInfo />
      </div>
    </HeaderContainer>
  );
}
