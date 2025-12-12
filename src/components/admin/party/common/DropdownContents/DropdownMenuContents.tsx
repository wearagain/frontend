interface MenuProps {
  onClick?: () => void;
  className?: string;
}

export default function DropdownMenuContents({ onClick }: MenuProps) {
  return (
    <button className='dropdown-menu-item' onClick={onClick}>
      자세히보기
    </button>
  );
}
