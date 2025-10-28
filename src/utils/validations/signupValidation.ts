import { z } from "zod";

export const signupSchema = z
  .object({
    // 이름
    name: z.string().min(1, "이름을 입력해주세요."),

    // 이메일
    email: z.string().min(1, "이메일을 입력해주세요.").email("올바른 이메일 형식이 아닙니다."),

    // 인증번호
    code: z.string().min(6, "인증번호는 6자리여야 합니다."),

    // 전화번호
    phoneNumber: z.string().min(10, "전화번호를 입력해주세요."),

    // 비밀번호
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),

    // 비밀번호 확인
    confirm: z.string().min(1, "비밀번호 확인을 입력해주세요."),
  })
  .refine((data) => data.password === data.confirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirm"],
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;
