import { ProfileIcon, Ticket } from "@/assets/icons";
import { Leaf } from "lucide-react";

interface Props {
  isLoggedIn: boolean;
  userProfile: {
    nickname: string;
    ticket: number;
    impact: number;
  };
  toLogIn: () => void;
}

function ProfileSection({ isLoggedIn, userProfile, toLogIn }: Props) {
  if (!isLoggedIn) {
    return (
      <div className='p-5'>
        <div onClick={toLogIn} className='text-gray-500 cursor-pointer'>
          로그인을 해주세요
        </div>
      </div>
    );
  }
  return (
    <div className='p-5 flex space-x-3'>
      <ProfileIcon className='w-12 h-12' />
      <div className='flex flex-col w-full'>
        <h2 className='font-bold text-lg cursor-pointer'>{userProfile.nickname} 님</h2>
        <div className='flex justify-between'>
          <div className='flex items-center space-x-1 cursor-pointer'>
            <Ticket className='w-4 h-4' />
            <span className='text-gray-500 text-sm'>보유티켓</span>
            <span className='text-sm font-bold'>{userProfile.ticket}</span>
          </div>
          <div className='flex items-center space-x-1 cursor-pointer'>
            <Leaf className='w-4 h-4' />
            <span className='text-gray-500 text-sm'>CO2 절감량</span>
            <span className='text-sm font-bold'>{userProfile.impact}kg</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
