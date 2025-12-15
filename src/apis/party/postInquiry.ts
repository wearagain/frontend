import type {CreateInquiryRequest} from "@/types/help.ts";
import {axiosInstance} from "@/apis/axios-instance.ts";

// /api/party/applications/{applicationId}/inquiries
export const postInquiry = async (applicationId: string, payload: CreateInquiryRequest) => {
  const { data } = await  axiosInstance.post(`/api/party/applications/${applicationId}/inquiries`, payload, {
    headers: {
      "Content-Type": "application/json",
    }
  })
  return data;
}