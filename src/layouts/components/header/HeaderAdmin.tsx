import { useEffect, useState } from "react";
import HeaderContainer from "./HeaderContainer";
import { useLocation } from "react-router-dom";
import { useMe } from "@/hooks/auth/useMe";
import { useNavigate } from "react-router-dom";
import { Message, Hamburger, Back } from "@/components/common/header";

interface HeaderProps {
  label?: string;
  showBack?: boolean;
  showLabel?: boolean;
  to?: string;
}

export default function HeaderAdmin({
  label = "가치입다",
  showBack = false,
  showLabel = true,
  to,
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { data } = useMe();

  const navigate = useNavigate();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const nickname = data?.nickname ?? null;

  return (
    <HeaderContainer>
      <div className='flex justify-between gap-2 items-center'>
        {showBack && <Back onClick={() => (to ? navigate(to) : navigate(-1))} />}

        {showLabel && label && <h2 className='text-start'>{label}</h2>}
      </div>

      {/* Right Side */}
      <div className='flex gap-3'>
        <Message />
        <Hamburger nickname={nickname} open={open} setOpen={setOpen} />
      </div>
    </HeaderContainer>
  );
}
