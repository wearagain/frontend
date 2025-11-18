import { axiosInstance } from "@/apis/axios-instance";
import type { BoardListResponse, BoardQuery } from "@/types/board";

export const getBoardList = async (params: BoardQuery): Promise<BoardListResponse> => {
  const { boardType, ...rest } = params;
  const queryParams = boardType ? { ...rest, boardType } : rest;

  const { data } = await axiosInstance.get<BoardListResponse>(
    `/api/board/boards/{boardType}${boardType ?? ""}`,
    { params: queryParams }
  );

  return data;
};
