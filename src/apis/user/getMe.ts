import { axiosInstance } from "../axios-instance";

export interface Role {
  authority: string;
  [key: string]: any;
}

export interface UserProfile {
  pkId: string;
  id: number;
  email: string;
  nickname: string;
  provider: "LOCAL" | "GOOGLE" | "KAKAO" | "NAVER" | any;
  role: Role[];
  phoneNumber: string;
  isLoggedIn: boolean;
}

export const getMe = async (): Promise<UserProfile> => {
  const { data } = await axiosInstance.get("/api/me");
  return data;
};
