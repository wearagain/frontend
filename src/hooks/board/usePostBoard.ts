import { useMutation } from "@tanstack/react-query";
import { postBoard } from "@/apis/board/postBoard";
import type { BoardPostRequest } from "@/types/board";

export const usePostBoard = () => {
  return useMutation({
    mutationKey: ["postBoard"],
    mutationFn: (payload: BoardPostRequest) => postBoard(payload),
  });
};
