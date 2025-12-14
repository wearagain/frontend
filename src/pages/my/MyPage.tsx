import MenuList from "@/components/my/MenuList.tsx";
import ProfileSection from "@/components/my/ProfileSection.tsx";
import EcoImpactSection from "@/components/my/EcoImpactSection.tsx";
import MenuTab from "@/components/home/MenuTab.tsx";
import { getDateTime } from "@/utils/common/convertDataUtils.ts";

const MyPage = () => {
  const now = new Date();
  now.setMinutes(0, 0, 0);

  const profile = {
    name: "이유민",
    userRole: "USER",
    ticket: 2,
    impact: 12.5,
    updatedAt: getDateTime(now, "yyyy.MM.dd HH:mm"),
  };

  return (
    <div className='flex flex-col h-screen'>
      {/* 프로필 */}
      <ProfileSection name={profile.name} ticket={profile.ticket} impact={profile.impact} />
      {/* 환경임팩트 - 의류교환 관련 */}
      <EcoImpactSection updatedAt={profile.updatedAt} />
      <div className='divider-compact' />
      {/* 퀵메뉴 */}
      <MenuTab userRole={profile.userRole}/>
      <div className='divider-compact' />
      {/* 목록 */}
      <MenuList />
    </div>
  );
};

export default MyPage;
