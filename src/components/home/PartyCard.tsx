import { Card, CardHeader, CardContent } from "@/components/ui/card";
import defaultThumbnail from "@/assets/images/default_home.png";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface Props {
  title: string;
  participants: number;
  date: string;
  status: string;
  thumbnailSrc: string;
}

// TODO: onClick 추가

function PartyCard({ title, participants, date, status, thumbnailSrc }: Props) {
  return (
    <Card className='p-0 border-gray-200 w-3/4 gap-4 cursor-pointer'>
      <CardHeader className='p-0 relative gap-0'>
        {/* img + badge 영역 */}
        <div className='w-full overflow-hidden'>
          <img
            src={thumbnailSrc || defaultThumbnail}
            alt={`{title}`}
            className='w-full object-cover rounded-t-xl'
          />
        </div>
        <Badge variant='default' className='absolute top-4 right-4 text-sm'>
          {status}
        </Badge>
      </CardHeader>
      <CardContent className='px-4 pb-4 space-y-2'>
        <div className='overflow-hidden whitespace-nowrap font-bold text-ellipsis'>{title}</div>
        <div className='flex items-center text-sm space-x-2'>
          <div className='flex items-center space-x-1 text-gray-500'>
            <Users className='w-4 h-4' />
            <p className=''>{participants}명 참여</p>
          </div>
          <p className='middle-point' />
          <p className=''>{date}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default PartyCard;
