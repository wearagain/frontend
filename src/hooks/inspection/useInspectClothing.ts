import { useMutation } from "@tanstack/react-query";
import { inspectClothingItem } from "@/apis/inspection/inspection";
import type { InspectClothingRequest, InspectClothingResponse } from "@/types/inspection";

export const useInspectClothing = () => {
  return useMutation<InspectClothingResponse, Error, InspectClothingRequest>({
    mutationFn: inspectClothingItem,
  });
};
