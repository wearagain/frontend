import { axiosInstance } from "@/apis/axios-instance";
import type { BoardListResponse, BoardQuery } from "@/types/board";

export const getBoardList = async (params: BoardQuery): Promise<BoardListResponse> => {
  const { boardType, ...rest } = params;
  const queryParams = boardType ? { ...rest, boardType } : rest;

  const { data } = await axiosInstance.get<BoardListResponse>(
    // 백엔드 수정 예정
    `/api/board/boards/{boardType}${boardType ?? ""}`,
    { params: queryParams }
  );

  return data;
};
