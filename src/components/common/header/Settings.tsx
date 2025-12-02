import { EllipsisVertical } from "@/assets/icons";

interface SettingProps {
  onClick?: () => void;
  className?: string;
  to?: string;
}

export default function Settings({ onClick, className = "ml-auto" }: SettingProps) {
  return (
    <button onClick={onClick} className={className}>
      <EllipsisVertical className='w-6 h-6' />
    </button>
  );
}
