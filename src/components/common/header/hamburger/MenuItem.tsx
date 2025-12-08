import { Link } from "react-router-dom";
import { mainMenu } from "@/config/navMenu.ts";

interface MenuItemProps {
  item: typeof mainMenu[number];
  onClose: () => void;
}
export default function MenuItem({ item, onClose }: MenuItemProps) {
  const content = (
      <>
        {item.icon && <item.icon className='w-5 h-5 mr-2' />}
        <span>{item.label}</span>
      </>
  );

  const className = 'flex items-center hover:text-primary transition-colors';

  if (item.external) {
    return (
        <a
            href={item.path}
            target='_blank'
            rel='noopener noreferrer'
            className={className}
            onClick={onClose}
        >
          {content}
        </a>
    );
  }

  return (
      <Link to={item.path || '#'} onClick={onClose} className={className}>
        {content}
      </Link>
  );
}