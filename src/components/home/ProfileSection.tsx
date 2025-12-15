import { useNavigate } from "react-router-dom";
import { ProfileIcon } from "@/assets/icons";
import { useUserStore } from "@/store/useUserStore.ts";
import { useAdminStore } from "@/store/useAdminStore.ts";

interface ProfileProps {
  toLogIn: () => void;
}

function ProfileSection({ toLogIn }: ProfileProps) {
  const navigate = useNavigate();
  const {
    user,
    isLoggedIn,
    isAdmin,
    voucherCount,
    reduceCarbonAmount,
  } = useUserStore();

  const { partyApplicationCount, inquiryCount } = useAdminStore();


  if (!isLoggedIn) {
    return (
      <div className="p-5">
        <div onClick={toLogIn} className="text-[#555558] cursor-pointer">
          로그인을 해주세요
        </div>
      </div>
    );
  }
  return (
    <div className="p-5 flex space-x-3">
      <ProfileIcon className="w-12 h-12" />
      <div className="flex flex-col justify-between w-full">
        <h3>{user?.nickname} 님</h3>
        <div className="flex items-center gap-1 text-[#555558] text-sm font-normal">
          {!isAdmin
            ? (
              <>
                <p className="cursor-pointer hover:underline" onClick={() => {
                  navigate("/ticket");
                }}>보유 티켓 <span className="font-bold">{voucherCount}</span></p>
                <div className="w-0.5 h-0.5 rounded-full bg-[#D9D9D9]" />
                <p className="cursor-pointer hover:underline" onClick={() => {
                  navigate("/impact/receipt");
                }}>CO<sub>2</sub> 절감 <span className="font-bold">{reduceCarbonAmount}kg</span></p>
              </>
            ) : (
              <>

                <p>주최신청 <span className="font-bold">{partyApplicationCount}</span></p>
                <div className="w-0.5 h-0.5 rounded-full bg-[#D9D9D9]" />
                <p>답변대기 문의 <span className="font-bold">{inquiryCount}</span></p>
              </>)}
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
