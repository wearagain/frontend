import { useNavigate } from "react-router-dom";
import MagazineList from "@/components/home/NewsLetterList.tsx";
import MenuTab from "@/components/home/MenuTab";
import NoticeList from "@/components/home/NoticeList";
import PartyCardList from "@/components/home/PartyCardList";
import ProfileSection from "@/components/home/ProfileSection";
import RedirectHome from "@/components/home/RedirectHome";
import { useUserStore } from "@/store/useUserStore.ts";

const HomePage = () => {
  const navigate = useNavigate();
  const handleLoginNavigation = () => {
    navigate("/auth/signin");
  };
  const { user, isLoggedIn, voucherCount, reduceCarbonAmount} = useUserStore();

  return (
    <div className='flex flex-col h-full overflow-y-auto custom-scroll'>
      <ProfileSection
        isLoggedIn={isLoggedIn}
        userProfile={{
          nickname: user?.nickname ?? "",
          ticket: voucherCount ?? 0,
          impact: reduceCarbonAmount ?? 0,
        }}
        toLogIn={handleLoginNavigation}
      />
      <div className='divider-compact' />
      <PartyCardList />
      <MenuTab />
      <MagazineList />
      <RedirectHome />
      <NoticeList />
    </div>
  );
};

export default HomePage;
