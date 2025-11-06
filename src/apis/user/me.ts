import { axiosInstance } from "../axios-instance";

export interface UserProfile {
  id: number;
  email: string;
  nickname: string;
  provider: "LOCAL" | "GOOGLE" | "KAKAO" | "NAVER";
}

export const getMe = async (): Promise<UserProfile> => {
  const { data } = await axiosInstance.get("/api/me");
  return data;
};
