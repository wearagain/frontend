import { Card, CardHeader, CardContent } from "@/components/ui/card";
import defaultThumbnail from "@/assets/images/default_home.png";
import { Badge } from "@/components/ui/badge";

interface Props {
  title: string;
  date: string;
  category: string;
  thumbnailSrc: string;
}

// TODO: onClick 추가

function MagazineCard({ title, date, category, thumbnailSrc }: Props) {
  return (
    <Card className='p-0 border-gray-200 w-3/4 gap-5 cursor-pointer'>
      <CardHeader className='p-0'>
        {/* img + badge 영역 */}
        <div className='w-full overflow-hidden'>
          <img
            src={thumbnailSrc || defaultThumbnail}
            alt={`{title}`}
            className='w-full object-cover rounded-t-xl'
          />
        </div>
      </CardHeader>
      <CardContent className='pb-4 px-4 space-y-2'>
        <Badge variant='default' className='text-sm'>
          {category}
        </Badge>
        <div className='overflow-hidden whitespace-nowrap font-bold text-ellipsis'>{title}</div>
        <p className='text-sm text-gray-500'>{date}</p>
      </CardContent>
    </Card>
  );
}

export default MagazineCard;
