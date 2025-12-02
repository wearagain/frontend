import { MessageSquareText } from "@/assets/icons";

interface MessageProps {
  onClick?: () => {};
}

export default function Message({ onClick }: MessageProps) {
  return (
    <button onClick={onClick}>
      <MessageSquareText className='w-6 h-6' />
    </button>
  );
}
