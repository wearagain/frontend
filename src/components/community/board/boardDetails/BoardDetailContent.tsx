import type { BoardDetail } from "@/types/boardDetail";

interface Props {
  board: BoardDetail;
}

export const BoardDetailContent = ({ board }: Props) => {
  return <p className='mt-4 text-gray-700 whitespace-pre-line'>{board.content}</p>;
};
