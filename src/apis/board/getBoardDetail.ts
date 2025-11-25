import { axiosInstance } from "@/apis/axios-instance";
import type { BoardDetailResponse } from "@/types/boardDetail";

export const getBoardDetail = async (boardId: string): Promise<BoardDetailResponse> => {
  const { data } = await axiosInstance.get<BoardDetailResponse>(`/api/board/{boardId}`, {
    params: { boardId },
  });
  return data;
};
