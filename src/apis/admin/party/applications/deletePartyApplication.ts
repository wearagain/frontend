import { axiosInstance } from "@/apis/axios-instance.ts";

export const deletePartyApplication = async (
  applicationId: string
)=> {
  const { data } = await axiosInstance.delete(
    `/api/party/applications/${applicationId}`
  );
  return data;
};
