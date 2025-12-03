import { X } from "@/assets/icons";

interface CloseProps {
  onClose?: () => void;
  className?: string;
  to?: string;
}

export default function Close({ onClose, className = "ml-auto" }: CloseProps) {
  return (
    <button onClick={onClose} className={className}>
      <X className='w-6 h-6' />
    </button>
  );
}
