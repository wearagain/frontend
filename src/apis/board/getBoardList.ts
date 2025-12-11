import { axiosInstance } from "@/apis/axios-instance";
import type { BoardListResponse, BoardQuery } from "@/types/board";

export const getBoardList = async (params: BoardQuery): Promise<BoardListResponse> => {
  const { data } = await axiosInstance.get<BoardListResponse>("/api/board/boards", {
    params,
  });

  return data;
};
