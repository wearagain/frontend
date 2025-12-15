import { axiosInstance } from "../axios-instance";

export interface UserProfile {
  id: number;
  email: string;
  nickname: string;
  phoneNumber: string;
  provider: "LOCAL" | "GOOGLE" | "KAKAO" | "NAVER";
  role: "USER" | "ADMIN";
}

export const getMe = async (): Promise<UserProfile> => {
  const { data } = await axiosInstance.get("/api/me");
  return data;
};
