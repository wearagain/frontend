import { Card, CardHeader, CardContent } from "@/components/ui/card";
import defaultThumbnail from "@/assets/images/default_home.png";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface PartyCardProps {
  title: string;
  participants: number;
  date: string;
  status: string;
  thumbnailSrc: string;
  onClick?: () => void;
}

function PartyCard({ title, participants, date, status, thumbnailSrc, onClick }: PartyCardProps) {
  return (
    <Card className='p-0 shrink-0 h-fit snap-center border-[#E4E4E4] w-3/4 gap-4 cursor-pointer' onClick={onClick}>
      <CardHeader className='p-0 relative gap-0'>
        {/* img + badge 영역 */}
        <div className='w-full overflow-hidden'>
          <img
            src={thumbnailSrc || defaultThumbnail}
            alt={title}
            className='w-full object-cover rounded-t-xl'
          />
        </div>
        <Badge variant='mint' className='absolute top-4 right-4 text-sm'>
          {status}
        </Badge>
      </CardHeader>
      <CardContent className='px-4 pb-4 space-y-2'>
        <div className='font-bold line-clamp-1'>{title}</div>
        <div className='flex items-center text-sm space-x-2 font-medium'>
          <div className='flex items-center space-x-1 text-[#939390]'>
            <Users className='w-4 h-4' />
            <p className=''>{participants}명 참여</p>
          </div>
          <div className='w-0.5 h-0.5 rounded-full bg-[#D9D9D9]'/>
          <p className='text-[#555558]'>{date}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default PartyCard;
