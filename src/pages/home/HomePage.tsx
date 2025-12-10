import { useNavigate } from "react-router-dom";
import DonationCard from "@/components/home/DonatioinCard";
import MagazineCardList from "@/components/home/MagazineCardList";
import MenuTab from "@/components/home/MenuTab";
import NoticeList from "@/components/home/NoticeList";
import PartyCardList from "@/components/home/PartyCardList";
import ProfileSection from "@/components/home/ProfileSection";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const navigate = useNavigate();
  const handleLoginNavigation = () => {
    navigate("/auth/signin");
  };
  return (
    <div>
      <ProfileSection
        isLoggedIn={true}
        userProfile={{
          nickname: "사용자",
          ticket: 3,
          impact: 12.5,
        }}
        toLogIn={handleLoginNavigation}
      />
      <div className='divider' />
      <PartyCardList />
      <MenuTab userRole='USER' />
      <div className='divider' />
      <div className='p-5'>
        <Button onClick={() => {}} className='w-full'>다시입다연구소 알아보기</Button>
        <DonationCard />
      </div>
      <MagazineCardList />
      <NoticeList />
    </div>
  );
};

export default HomePage;
