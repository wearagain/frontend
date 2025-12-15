import ProfileIcon from "@/assets/icons/ProfileIcon.tsx";
import { useUserStore } from "@/store/useUserStore.ts";
import { useAdminStore } from "@/store/useAdminStore.ts";

export default function UserProfile() {
  const {
    user,
    isAdmin,
    voucherCount,
    reduceCarbonAmount,
  } = useUserStore();

  const { ongoingPartyCount, noticeCount } = useAdminStore();

  return (
    <div className="flex gap-3">
      <ProfileIcon className="w-12 h-12" />
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-[#222222]">{user?.nickname} 님</h3>
        <div className="flex items-center gap-1 text-[#555558] text-sm font-normal">
          {!isAdmin
            ? (
              <>
                <p>보유 티켓 <span className="font-bold">{voucherCount}</span></p>
                <div className="w-0.5 h-0.5 rounded-full bg-[#D9D9D9]" />
                <p>CO<sub>2</sub> 절감 <span className="font-bold">{reduceCarbonAmount}kg</span></p>
              </>
            ) : (
              <>
                <p>주최신청 <span className="font-bold">{ongoingPartyCount}</span></p>
                <div className="w-0.5 h-0.5 rounded-full bg-[#D9D9D9]" />
                <p>답변대기 문의 <span className="font-bold">{noticeCount}</span></p>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
}