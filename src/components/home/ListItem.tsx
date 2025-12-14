import { Badge } from "../ui/badge";

interface ListItemProps {
  title: string;
  category?: string;
  date: string;
  onClick?: () => void;
  isFirst?: boolean;
  isNotice?: boolean;
  className?: string;
}

function ListItem({ category, date, title, onClick, isFirst = false, isNotice = false, className }: ListItemProps) {
  return (
    <div
      className={`p-4 cursor-pointer hover:bg-gray-50 ${isFirst ? "" : "border-t border-gray-200"}`}
      onClick={onClick}
    >
      <div className='flex space-x-3 mb-2'>
        { isNotice && (<Badge variant='default' className={`${className}`}>
          {category}
        </Badge>)}
        <span className='text-sm text-[#939396]'>{date}</span>
      </div>
      <h3 className='line-clamp-1'>{title}</h3>
    </div>
  );
}

export default ListItem;
