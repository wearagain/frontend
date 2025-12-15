import { useEffect, useState } from "react";
import HeaderContainer from "./HeaderContainer";
import { useLocation, useParams } from "react-router-dom";
import { useMe } from "@/hooks/auth/useMe";
import { useNavigate } from "react-router-dom";
import { useGetParty } from "@/hooks/party/useGetParty";
import { Back, Hamburger } from "@/components/common/header";

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
  const params = useParams();
  const { data } = useMe();

  const navigate = useNavigate();

  // 파티 상세 페이지인 경우 파티 정보 가져오기
  const isInspectionTicketPage =
    location.pathname.startsWith("/inspection-ticket/") && params.partyId;
  const { data: partyData } = useGetParty(isInspectionTicketPage ? params.partyId || "" : "");

  // 실제 표시할 라벨 결정 (파티 페이지면 파티명, 아니면 기본 라벨)
  const displayLabel = isInspectionTicketPage && partyData?.title ? partyData.title : label;

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const nickname = data?.nickname ?? null;
  // const isHost = data?.isHost ?? false;

  return (
    <HeaderContainer>
      <div className='flex justify-between gap-2 items-center'>
        {showBack && <Back onClick={() => (to ? navigate(to) : navigate(-1))} />}

        {showLabel && displayLabel && <h2 className='text-start'>{displayLabel}</h2>}
      </div>
      <Hamburger
        open={open}
        setOpen={setOpen}
        nickname={nickname}
        ticket={dummyTicket}
        impact={dummyCo2}
      />
    </HeaderContainer>
  );
}
