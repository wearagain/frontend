import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { getBoardList } from "@/apis/board/getBoardList";
import type { BoardListResponse, BoardQuery } from "@/types/board";

export const useGetBoardList = (params: BoardQuery) => {
  return useInfiniteQuery<
    BoardListResponse,
    Error,
    InfiniteData<BoardListResponse>,
    (string | BoardQuery)[],
    string | undefined
  >({
    queryKey: ["boardList", params],
    queryFn: ({ pageParam }) => getBoardList({ ...params, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
  });
};
