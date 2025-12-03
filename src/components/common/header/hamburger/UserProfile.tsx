import ProfileIcon from "@/assets/icons/ProfileIcon.tsx";

interface UserProfileProps {
  nickname: string | null;
  ticket: number;
  co2: number;
}

export default function UserProfile({nickname, ticket, co2}: UserProfileProps) {
  return (
      <div className='flex gap-3'>
        <ProfileIcon className='w-12 h-12'/>
        <div className='flex flex-col gap-1'>
          <h3 className='font-bold text-[#222222]'>{nickname} 님</h3>
          <div className='flex items-center gap-1 text-[#555558] text-sm font-normal'>
            <p>보유 티켓 <span className='font-bold'>{ticket}</span></p>
            <div className='w-0.5 h-0.5 rounded-full bg-[#D9D9D9]'/>
            <p>CO<sub>2</sub> 절감 <span className='font-bold'>{co2}kg</span></p>
          </div>
        </div>
      </div>
  );
}