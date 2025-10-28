import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().nonempty("이메일을 입력해주세요.").email("올바른 이메일 형식이 아닙니다."),
  password: z
    .string()
    .nonempty("비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 8자 이상이어야 합니다."),
});

export type SigninSchemaType = z.infer<typeof signinSchema>;
