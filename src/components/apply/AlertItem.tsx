import { TriangleAlert } from "lucide-react";

interface Props {
  message: string;
  className?: string;
}

export default function AlertItem({ message, className }: Props) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg bg-gray-100 py-2 px-3 w-full ${className || ""}`}
    >
      <TriangleAlert size={16} className='text-red-500' />
      <span className='text-xs font-medium text-gray-500'>{message}</span>
    </div>
  );
}
