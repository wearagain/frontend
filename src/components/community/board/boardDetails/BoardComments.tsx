import type { CommentItem } from "@/types/boardDetail";
import { format } from "date-fns";

interface Props {
  comments: CommentItem[];
}

export const BoardComments = ({ comments }: Props) => {
  return (
    <div className='mt-6'>
      {comments.map((c) => (
        <div key={c.id} className='py-3 border-b'>
          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <div className='w-6 h-6 rounded-full bg-gray-200' />
            <span>{c.creatorNickname}</span>
            <span>{format(new Date(c.createdAt), "MM/dd HH:mm")}</span>
          </div>

          <p className='mt-2'>{c.content}</p>
        </div>
      ))}
    </div>
  );
};
