import { useNavigate } from "react-router-dom";
import MagazineList from "@/components/home/NewsLetterList.tsx";
import MenuTab from "@/components/home/MenuTab";
import NoticeList from "@/components/home/NoticeList";
import PartyCardList from "@/components/home/PartyCardList";
import ProfileSection from "@/components/home/ProfileSection";
import RedirectHome from "@/components/home/RedirectHome";

const HomePage = () => {
  const navigate = useNavigate();
  const handleLoginNavigation = () => {
    navigate("/auth/signin");
  };
  return (
    <div className='flex flex-col h-full overflow-y-auto custom-scroll'>
      <ProfileSection
        isLoggedIn={true}
        userProfile={{
          nickname: "사용자",
          ticket: 3,
          impact: 12.5,
        }}
        toLogIn={handleLoginNavigation}
      />
      <div className='divider-compact' />
      <PartyCardList />
      <MenuTab userRole='USER' />
      <MagazineList />
      <RedirectHome />
      <NoticeList />
    </div>
  );
};

export default HomePage;
