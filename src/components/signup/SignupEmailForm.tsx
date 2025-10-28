import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupSchemaType } from "@/utils/validations/signupValidation";
import { useSignupStore } from "@/store/useAuthStore";
import { useEmailResend, useEmailVerification, useEmailVerifyCode } from "@/hooks/auth/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SignupEmailForm() {
  const navigate = useNavigate();

  const {
    name,
    email,
    phoneNumber,
    password,
    verificationStep,
    setName,
    setEmail,
    setPhone,
    setPassword,
    setVerificationStep,
    setEmailVerified,
  } = useSignupStore();

  const { mutate: sendVerifyEmail, isPending: isVerifying } = useEmailVerification();
  const { mutate: resendEmail, isPending: isResending } = useEmailResend();
  const { mutate: verifyCode, isPending: isChecking } = useEmailVerifyCode();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: { name, email, phoneNumber, password, confirm: password },
  });

  const emailValue = watch("email");
  const code = watch("code");

  const handleSendEmail = () => {
    if (!emailValue) {
      alert("이메일을 입력해주세요.");
      return;
    }

    sendVerifyEmail(emailValue, {
      onSuccess: () => {
        setVerificationStep("check");
      },
    });
  };

  const handleCheckCode = () => {
    if (!code) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    verifyCode(code, {
      onSuccess: () => {
        setVerificationStep("done");
        setEmailVerified(true);
      },
    });
  };

  const handleResendEmail = () => {
    if (!emailValue) {
      alert("이메일을 입력해주세요.");
      return;
    }

    resendEmail(emailValue);
  };

  const onSubmit = (data: SignupSchemaType) => {
    setName(data.name);
    setEmail(data.email);
    setPhone(data.phoneNumber);
    setPassword(data.password);
    navigate("/signup/terms?type=normal");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col h-full justify-between'>
      <div className='flex flex-col gap-5'>
        {/* 이름 */}
        <div className='flex flex-col gap-2'>
          <Label htmlFor='name'>이름</Label>
          <Input id='name' placeholder='이름' {...register("name")} />
          {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
        </div>

        {/* 이메일 */}
        <div className='flex flex-col gap-2'>
          <Label htmlFor='email'>이메일</Label>
          <Input
            id='email'
            type='email'
            placeholder='이메일'
            disabled={verificationStep === "done"}
            {...register("email")}
          />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
        </div>

        {/* 인증번호 */}
        <div className='flex flex-col gap-2'>
          <Label htmlFor='code'>인증번호</Label>
          <div className='flex gap-2'>
            <Input
              id='code'
              placeholder='인증번호 입력'
              disabled={verificationStep === "done"}
              {...register("code")}
            />

            {verificationStep === "send" && (
              <Button
                type='button'
                onClick={handleSendEmail}
                disabled={!emailValue || isVerifying}
                className='whitespace-nowrap w-28'
              >
                {isVerifying ? "전송 중..." : "인증하기"}
              </Button>
            )}

            {verificationStep === "check" && (
              <Button
                type='button'
                onClick={handleCheckCode}
                disabled={isChecking}
                className={cn("w-28")}
              >
                {isChecking ? "확인 중..." : "확인"}
              </Button>
            )}

            {verificationStep === "done" && (
              <Button
                type='button'
                disabled
                className='w-28 whitespace-nowrap bg-gray-200 text-gray-600 cursor-default'
              >
                인증 완료
              </Button>
            )}
          </div>

          {/* 인증번호 재전송 */}
          {verificationStep === "check" && (
            <div className='flex gap-4 items-center'>
              <p className='text-sm text-gray-500'>인증 메일을 받지 못하셨나요? </p>
              <p
                className='text-sm text-[var(--color-mint-light)] underline cursor-pointer'
                onClick={handleResendEmail}
              >
                이메일 다시 보내기
                {isResending && " (전송 중...)"}
              </p>
            </div>
          )}

          {errors.code && <p className='text-red-500 text-sm'>{errors.code.message}</p>}
        </div>

        {/* 전화번호 */}
        <div className='flex flex-col gap-2'>
          <Label htmlFor='phoneNumber'>전화번호</Label>
          <Input
            id='phoneNumber'
            type='tel'
            placeholder='01012345678'
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p className='text-red-500 text-sm'>{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* 비밀번호 */}
        <div className='flex flex-col gap-2'>
          <Label htmlFor='password'>비밀번호</Label>
          <Input id='password' type='password' placeholder='8자 이상' {...register("password")} />
          {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
        </div>

        {/* 비밀번호 확인 */}
        <div className='flex flex-col gap-2'>
          <Label htmlFor='confirm'>비밀번호 확인</Label>
          <Input
            id='confirm'
            type='password'
            placeholder='비밀번호 재입력'
            {...register("confirm")}
          />
          {errors.confirm && <p className='text-red-500 text-sm'>{errors.confirm.message}</p>}
        </div>
      </div>

      <div className='mt-auto pt-6'>
        <Button
          type='submit'
          disabled={!isValid || verificationStep !== "done"}
          className='w-full h-12 text-base font-semibold'
        >
          다음
        </Button>
      </div>
    </form>
  );
}
