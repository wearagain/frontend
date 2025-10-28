import { useEffect, useState } from "react";
import TermsItem from "./TermsItem";
import { Button } from "@/components/ui/button";
import { useSignupStore } from "@/store/useAuthStore";
import { useSignup } from "@/hooks/auth/useAuth";

interface SignupTermsFormProps {
  onNext: () => void;
}

export default function SignupTermsForm({ onNext }: SignupTermsFormProps) {
  const {
    email,
    password,
    phoneNumber,
    nickname,
    termsAgreed,
    marketingAgreed,
    setTermsAgreed,
    setMarketingAgreed,
  } = useSignupStore();
  const { mutate: signup, isPending } = useSignup();

  const [checked, setChecked] = useState({
    all: false,
    age: false,
    service: false,
    privacy: false,
    marketing: false,
  });

  const handleToggle = (key: keyof typeof checked) => {
    if (key === "all") {
      const newState = !checked.all;
      setChecked({
        all: newState,
        age: newState,
        service: newState,
        privacy: newState,
        marketing: newState,
      });
    } else {
      const updated = { ...checked, [key]: !checked[key] };
      const allChecked = updated.age && updated.service && updated.privacy && updated.marketing;
      setChecked({ ...updated, all: allChecked });
    }
  };

  const isRequiredChecked = checked.age && checked.service && checked.privacy;

  useEffect(() => {
    setTermsAgreed(isRequiredChecked);
    setMarketingAgreed(checked.marketing);
  }, [isRequiredChecked, checked.marketing, setTermsAgreed, setMarketingAgreed]);

  const handleNextClick = () => {
    signup(
      {
        email,
        password,
        nickname,
        phoneNumber: phoneNumber ?? "",
        termsAgreed,
        marketingAgreed,
      },
      {
        onSuccess: () => {
          onNext();
          localStorage.removeItem("signup-storage");
        },
      }
    );
  };

  return (
    <>
      <div className='flex flex-col gap-4'>
        <h3 className='text-base font-semibold'>약관 동의</h3>

        <TermsItem label='전체 동의' checked={checked.all} onToggle={() => handleToggle("all")} />

        <div className='flex flex-col gap-3 pl-6'>
          <TermsItem
            label='만 14세 이상 가입 동의'
            required
            checked={checked.age}
            onToggle={() => handleToggle("age")}
          />
          <TermsItem
            label='서비스 이용 동의'
            required
            checked={checked.service}
            onToggle={() => handleToggle("service")}
            showLink
          />
          <TermsItem
            label='개인정보처리방침 동의'
            required
            checked={checked.privacy}
            onToggle={() => handleToggle("privacy")}
            showLink
          />
          <TermsItem
            label='마케팅 정보 수신 동의'
            checked={checked.marketing}
            onToggle={() => handleToggle("marketing")}
            showLink
          />
        </div>
      </div>

      <div className='mt-auto pt-8'>
        <Button
          type='button'
          disabled={!isRequiredChecked}
          onClick={handleNextClick}
          className='w-full h-12 text-base font-semibold'
        >
          {isPending ? "가입 중" : "다음"}
        </Button>
      </div>
    </>
  );
}
