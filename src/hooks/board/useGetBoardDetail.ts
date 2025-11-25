import { useQuery } from "@tanstack/react-query";
import { getBoardDetail } from "@/apis/board/getBoardDetail";

export const useGetBoardDetail = (boardId: string) => {
  return useQuery({
    queryKey: ["boardDetail", boardId],
    queryFn: () => getBoardDetail(boardId),
  });
};
