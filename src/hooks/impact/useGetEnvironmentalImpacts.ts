import { useQuery } from "@tanstack/react-query";
import { getEnvironmentalImpacts } from "@/apis/impact/getEnvironmentalImpacts";
import type { EnvironmentalImpactsQuery } from "@/types/impact";

export const useGetEnvironmentalImpacts = (params?: EnvironmentalImpactsQuery) => {
  return useQuery({
    queryKey: ["environmentalImpacts", params],
    queryFn: () => getEnvironmentalImpacts(params),
  });
};
