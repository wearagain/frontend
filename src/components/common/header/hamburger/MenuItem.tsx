import { Link } from "react-router-dom";
import type { NavCategory } from "@/config/navMenu";

interface MenuItemProps {
  item: NavCategory;
  onClose: () => void;
}

export default function MenuItem({
  item,
  onClose,
}: MenuItemProps) {
  const baseClass = "flex items-center hover:text-primary transition-colors";

  const content = (
    <>
      <div className='flex items-center'>
        {item.icon && <item.icon className='w-5 h-5 mr-2' />}
        <span>{item.label}</span>
      </div>
    </>
  );

  if (item.external) {
    return (
      <a
        href={item.path}
        target='_blank'
        rel='noopener noreferrer'
        className={`${baseClass}`}
        onClick={onClose}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={item.path || "#"} onClick={onClose} className={`${baseClass}`}>
      {content}
    </Link>
  );
}
