import { axiosInstance } from "@/apis/axios-instance";

export const postApplicationStatus = async (
  id: string,
  action: string,
  params?: Record<string, string>
) => {
  const { data } = await axiosInstance.post(
    `/api/party/applications/admin/${id}/${action}`,
    params
  );
  return data;
};
