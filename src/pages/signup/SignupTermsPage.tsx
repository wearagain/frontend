import SignupEmailDisplay from "@/components/signup/SignupEmailDisplay";
import SignupTermsForm from "@/components/signup/SignupTermsForm";
import { useNavigate } from "react-router-dom";

export default function SignupTermsPage() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/signup/complete");
  };

  return (
    <div className='flex flex-col min-h-full px-4 py-6'>
      <h2 className='mb-2'>
        가치입다를 시작하기 위해
        <br />
        다음 정보를 입력해 주세요
      </h2>

      <SignupEmailDisplay />

      <SignupTermsForm onNext={handleNext} />
    </div>
  );
}
