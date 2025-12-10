import { axiosInstance } from "@/apis/axios-instance";
import type { BoardPostRequest } from "@/types/board";

export const postBoard = async (payload: BoardPostRequest) => {
  return axiosInstance.post("/api/board/create", payload);
};
