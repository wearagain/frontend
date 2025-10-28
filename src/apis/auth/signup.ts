import { axiosInstance } from "../axios-instance";

export interface SignupBody {
  email: string;
  password: string;
  nickname: string;
  phoneNumber: string;
  termsAgreed: boolean;
  marketingAgreed: boolean;
}

export const postSignup = async (body: SignupBody) => {
  const { data } = await axiosInstance.post("/auth/signup", body);
  return data;
};

export const postEmailVerification = async (email: string) => {
  const { data } = await axiosInstance.post("/auth/email", { email });
  return data;
};

export const postEmailResend = async (email: string) => {
  const { data } = await axiosInstance.post("/auth/resend", {
    params: { email },
  });
  return data;
};

export const postEmailVerifyCode = async (token: string) => {
  const { data } = await axiosInstance.get("/auth/verify", {
    params: { token },
  });
  return data;
};
