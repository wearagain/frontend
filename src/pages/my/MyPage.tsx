import MenuList from "@/components/my/MenuList.tsx";
import ProfileSection from "@/components/my/ProfileSection.tsx";
import EcoImpactSection from "@/components/my/EcoImpactSection.tsx";
import MenuTab from "@/components/home/MenuTab.tsx";
import { getDateTime } from "@/utils/common/convertDataUtils.ts";
import { useUserStore } from "@/store/useUserStore.ts";

const MyPage = () => {
  const now = new Date();
  now.setMinutes(0, 0, 0);

  const { user, voucherCount, reduceCarbonAmount } = useUserStore();

  return (
    <div className="flex flex-col h-screen">
      {/* 프로필 */}
      <ProfileSection name={user?.nickname} ticket={reduceCarbonAmount} impact={voucherCount} />
      {/* 환경임팩트 - 의류교환 관련 */}
      <EcoImpactSection updatedAt={`${getDateTime(now, "yyyy.MM.dd HH")}:00`} />
      <div className="divider-compact" />
      {/* 퀵메뉴 */}
      <MenuTab />
      <div className="divider-compact" />
      {/* 목록 */}
      <MenuList />
    </div>
  );
};

export default MyPage;
