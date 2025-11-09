import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSignin, postSignout } from "@/apis/auth/signin";
import {
  postEmailResend,
  postEmailVerification,
  postEmailVerifyCode,
  postSignup,
  type SignupBody,
} from "@/apis/auth/signup";
import { startSocialLogin } from "@/apis/auth/social";
import { handleApiError } from "@/utils/handleApiError";
import { useNavigate } from "react-router-dom";

// 회원가입 관련
export const useEmailVerification = () => {
  return useMutation({
    mutationKey: ["emailVerification"],
    mutationFn: async (email: string) => {
      return await postEmailVerification(email);
    },
    onSuccess: (data) => {
      console.log("이메일 인증 메일 발송 성공:", data?.message);
      alert("이메일 인증 메일이 전송되었습니다.");
    },
    onError: (error: unknown) => {
      alert(handleApiError(error));
    },
  });
};

export const useEmailResend = () =>
  useMutation({
    mutationKey: ["emailResend"],
    mutationFn: (email: string) => postEmailResend(email),
    onSuccess: () => {
      alert("이메일이 다시 전송되었습니다.");
    },
    onError: (error: unknown) => {
      alert(handleApiError(error));
    },
  });

export const useEmailVerifyCode = () =>
  useMutation({
    mutationKey: ["emailVerifyCode"],
    mutationFn: (token: string) => postEmailVerifyCode(token),
    onSuccess: () => {
      alert("이메일 인증이 완료되었습니다!");
    },
    onError: (error: unknown) => {
      alert(handleApiError(error));
    },
  });

export const useSignup = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (body: SignupBody) => {
      const res = await postSignup(body);
      return res;
    },
    onSuccess: (data) => {
      console.log("회원가입 성공:", data?.message);
      alert("회원가입이 완료되었습니다.");
    },
    onError: (error: unknown) => {
      console.error("회원가입 실패:", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
};

// 로그인 관련
export const useSignin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["signin"],
    mutationFn: async (credentials: { email: string; password: string }) => {
      return await postSignin(credentials.email, credentials.password);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error: unknown) => {
      console.error("로그인 실패:", error);
    },
  });
};

export const useSocialLogin = () => {
  return {
    kakao: () => startSocialLogin("kakao"),
    google: () => startSocialLogin("google"),
    naver: () => startSocialLogin("naver"),
  };
};

// 로그아웃 관련

export const useSignout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["signout"],
    mutationFn: async () => await postSignout(),
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: ["me"], exact: true });
      document.cookie = "XSRF-TOKEN=; Max-Age=0; path=/;";
      navigate("/auth/signin");
    },
    onError: (error: unknown) => {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
};
