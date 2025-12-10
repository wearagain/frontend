import { axiosInstance } from "@/apis/axios-instance";

export const patchPartyStatus = async (
  id: string,
  params?: Record<string, string>
) => {
  const { data } = await axiosInstance.patch(
    `/api/parties/${id}/status`,
    params
  );
  return data;
};
