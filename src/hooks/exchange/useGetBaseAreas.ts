import { useQuery } from "@tanstack/react-query";
import { getBaseAreas, type BaseArea } from "@/apis/exchange/getBaseAreas";

export const useGetBaseAreas = () => {
  return useQuery<BaseArea[]>({
    queryKey: ["baseAreas"],
    queryFn: getBaseAreas,
  });
};
