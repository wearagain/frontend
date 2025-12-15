import { axiosInstance } from "../axios-instance";

export interface Role {
  authority: string;
  [key: string]: any;
}

export interface UserProfile {
  id: number;
  email: string;
  nickname: string;
  phoneNumber: string;
  pkId: string;
  phone: string;
  provider: "LOCAL" | "GOOGLE" | "KAKAO" | "NAVER" | any;
  role: Role[];
}

export const getMe = async (): Promise<UserProfile> => {
  const { data } = await axiosInstance.get("/api/me");
  return data;
};
