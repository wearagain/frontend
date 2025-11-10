import { Badge } from "../ui/badge";

interface Props {
  title: string;
  category: string;
  date: string;
}

// TODO: onClick 추가

function NoticeItem({ category, date, title }: Props) {
  return (
    <div className='p-4 border-b border-gray-200 cursor-pointer'>
      <div className='flex space-x-3 mb-2'>
        <Badge className=''>{category}</Badge>
        <span className='text-sm text-gray-500'>{date}</span>
      </div>
      <h3 className='font-semibold overflow-hidden whitespace-nowrap text-ellipsis'>{title}</h3>
    </div>
  );
}

export default NoticeItem;
