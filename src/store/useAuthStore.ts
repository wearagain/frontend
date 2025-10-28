import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SignupState {
  name?: string;
  email: string;
  phoneNumber?: string;
  password: string;
  nickname: string;
  gender?: "male" | "female" | "not_selected";
  birthdate?: string;

  verificationStep: "send" | "check" | "done";
  isEmailVerified: boolean;

  termsAgreed: boolean;
  marketingAgreed: boolean;

  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phoneNumber: string) => void;
  setPassword: (password: string) => void;
  setNickname: (nickname: string) => void;
  setVerificationStep: (step: "send" | "check" | "done") => void;
  setEmailVerified: (verified: boolean) => void;
  setTermsAgreed: (agreed: boolean) => void;
  setMarketingAgreed: (agreed: boolean) => void;

  reset: () => void;
}

export const useSignupStore = create<SignupState>()(
  persist(
    (set) => ({
      name: "",
      email: "",
      password: "",
      nickname: "",
      verificationStep: "send",
      isEmailVerified: false,
      termsAgreed: false,
      marketingAgreed: false,

      setName: (name) => set({ name }),
      setEmail: (email) => set({ email }),
      setPhone: (phoneNumber) => set({ phoneNumber }),
      setPassword: (password) => set({ password }),
      setNickname: (nickname) => set({ nickname }),
      setVerificationStep: (step) => set({ verificationStep: step }),
      setEmailVerified: (verified) => set({ isEmailVerified: verified }),
      setTermsAgreed: (agreed) => set({ termsAgreed: agreed }),
      setMarketingAgreed: (agreed) => set({ marketingAgreed: agreed }),

      reset: () =>
        set({
          name: "",
          email: "",
          password: "",
          nickname: "",
          verificationStep: "send",
          isEmailVerified: false,
          termsAgreed: false,
          marketingAgreed: false,
        }),
    }),
    {
      name: "signup-storage",
      partialize: (state) => ({
        name: state.name,
        email: state.email,
        phoneNumber: state.phoneNumber,
        password: state.password,
        nickname: state.nickname,
        gender: state.gender,
        birthdate: state.birthdate,
        termsAgreed: state.termsAgreed,
        marketingAgreed: state.marketingAgreed,
      }),
    }
  )
);
