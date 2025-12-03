import { useEffect, useState } from "react";
import HeaderContainer from "./HeaderContainer";
import { useLocation } from "react-router-dom";
import { useMe } from "@/hooks/auth/useMe";
import { ChevronLeft } from "@/assets/icons";
import { useNavigate } from "react-router-dom";
import Hamburger from "@/components/common/header/Hamburger.tsx";

interface HeaderProps {
  label?: string;
  showBack?: boolean;
  showLabel?: boolean;
  to?: string;
}

export default function HeaderBase({
  label = "가치입다",
  showBack = false,
  showLabel = true,
  to,
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const dummyTicket = 2;
  const dummyCo2 = 12.5;
  const location = useLocation();
  const { data } = useMe();

  const navigate = useNavigate();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const nickname = data?.nickname ?? null;
  // const isHost = data?.isHost ?? false;

  return (
    <HeaderContainer>
      <div className='flex justify-between gap-2 items-center'>
        {showBack && (
          <button onClick={() => (to ? navigate(to) : navigate(-1))}>
            <ChevronLeft className='w-6 h-6' />
          </button>
        )}

        {showLabel && label && <h2 className='text-start'>{label}</h2>}
      </div>
      <Hamburger open={open} setOpen={setOpen} nickname={nickname} ticket={dummyTicket} co2={dummyCo2} isHost={false} />
    </HeaderContainer>
  );
}
