import { axiosInstance } from "@/apis/axios-instance";

export interface BaseArea {
  id: string;
  name: string;
  address: string;
}

export const getBaseAreas = async (): Promise<BaseArea[]> => {
  const { data } = await axiosInstance.get<BaseArea[]>("/api/exchange/base-areas");
  return data;
};
