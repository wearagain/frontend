import { useNavigate } from "react-router-dom";
import { ProfileIcon } from "@/assets/icons";

interface ProfileProps {
  isLoggedIn: boolean;
  userProfile: {
    nickname: string;
    ticket: number;
    impact: number;
  };
  toLogIn: () => void;
}

function ProfileSection({ isLoggedIn, userProfile, toLogIn }: ProfileProps) {
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className='p-5'>
        <div onClick={toLogIn} className='text-[#555558] cursor-pointer'>
          로그인을 해주세요
        </div>
      </div>
    );
  }
  return (
    <div className='p-5 flex space-x-3'>
      <ProfileIcon className='w-12 h-12' />
      <div className='flex flex-col justify-between w-full'>
        <h3>{userProfile.nickname} 님</h3>
        <div className='flex items-center gap-1 text-[#555558] text-sm font-normal'>
          <p className='cursor-pointer hover:underline' onClick={() => {navigate("/ticket")}}>보유 티켓 <span className='font-bold'>{userProfile.ticket}</span></p>
          <div className='w-0.5 h-0.5 rounded-full bg-[#D9D9D9]'/>
          <p className='cursor-pointer hover:underline' onClick={() => {navigate("/impact/receipt")}}>CO<sub>2</sub> 절감 <span className='font-bold'>{userProfile.impact}kg</span></p>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
