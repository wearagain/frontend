import { useQuery } from "@tanstack/react-query";
import { getExchangeThumbnails } from "@/apis/exchange/getThumbnails";

export const useGetExchangeThumbnails = () => {
  return useQuery({
    queryKey: ["exchangeThumbnails"],
    queryFn: getExchangeThumbnails,
  });
};
