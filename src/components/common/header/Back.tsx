import { ChevronLeft } from "@/assets/icons";

interface BackProps {
  onClick?: () => void;
}

export default function Back({ onClick }: BackProps) {
  return (
    <button onClick={onClick}>
      <ChevronLeft className='w-6 h-6' />
    </button>
  );
}
