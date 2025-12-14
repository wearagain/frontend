import { axiosInstance } from "@/apis/axios-instance";
import type { EnvironmentalImpactsResponse, EnvironmentalImpactsQuery } from "@/types/impact";

export const getEnvironmentalImpacts = async (
  params?: EnvironmentalImpactsQuery
): Promise<EnvironmentalImpactsResponse> => {
  const { data } = await axiosInstance.get<EnvironmentalImpactsResponse>(
    "/api/environmental-impacts/my-filtered",
    {
      params,
    }
  );
  return data;
};
