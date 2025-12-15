import type {HomeResponse} from "@/types/pages.ts";
import {axiosInstance} from "@/apis/axios-instance.ts";

export const getHome = async (): Promise<HomeResponse> => {
  const { data } = await axiosInstance.get<HomeResponse>("api/pages/home");
  return data;
}