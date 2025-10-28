import { API_BASE_URL } from "../config";

export const startSocialLogin = (provider: "google" | "kakao" | "naver") => {
  window.location.href = `${API_BASE_URL}/oauth2/authorization/${provider}`;
};
