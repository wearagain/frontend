import ProfileIcon from "@/assets/icons/ProfileIcon.tsx";

interface ProfileProps {
  name: string;
  ticket: number;
  co2: number;
}

export default function ProfileSection({name, ticket, co2} :ProfileProps) {
  return (
      <div className='flex items-center justify-between p-5'>
        <div className='flex flex-col gap-1'>
          <h3>{name} 님</h3>
          <div className='flex items-center gap-1 text-sm text-[#555558]'>
              <span>
                보유 티켓 <span className='font-semibold text-[#222222]'>{ticket}</span>
              </span>
            <span className='w-0.5 h-0.5 rounded-full bg-[#D9D9D9]' />
            <span className='flex items-center gap-1'>
                <span>CO<sub>2</sub> 절감</span> <span className='font-semibold text-[#222222]'>{co2}kg</span>
              </span>
          </div>
        </div>
        <ProfileIcon className='h-14 w-14' />
      </div>
  );
}
