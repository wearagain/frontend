import { UserRound } from "lucide-react";
import type { BoardDetail } from "@/types/boardDetail.ts";
import { format } from "date-fns";

interface Props {
  board: BoardDetail;
}

export const BoardDetailHeader = ({ board }: Props) => {
  const date = board.createdAt ? format(new Date(board.createdAt), "MM/dd HH:mm") : "";

  return (
    <div className='flex items-start gap-3 mb-4'>
      <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center'>
        <UserRound className='w-6 h-6 text-gray-500' />
      </div>

      <div className='flex flex-col'>
        <span className='font-semibold text-base'>{board.creatorNickname}</span>
        <span className='text-xs text-gray-500'>{date}</span>
      </div>
    </div>
  );
};
