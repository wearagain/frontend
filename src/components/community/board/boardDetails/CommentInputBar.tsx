import { Send } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";

interface Props {
  comment: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}

export const CommentInputBar = ({ comment, onChange, onSubmit }: Props) => {
  return (
    <div className='fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto w-full flex gap-2 bg-white border-t border-gray-100 px-4 py-3'>
      <Input
        value={comment}
        onChange={(e) => onChange(e.target.value)}
        placeholder='댓글을 입력하세요'
        className='rounded-full bg-gray-100 border-none focus-visible:ring-gray-300 px-4 py-2'
      />

      <button
        className='min-w-10 min-h-10 bg-gray-200 rounded-full flex items-center justify-center'
        onClick={onSubmit}
      >
        <Send size={18} />
      </button>
    </div>
  );
};
