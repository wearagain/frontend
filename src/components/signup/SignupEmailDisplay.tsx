import { useSignupStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function SignupEmailDisplay() {
  const { email } = useSignupStore();
  const navigate = useNavigate();

  if (!email) {
    alert("이메일 정보가 없습니다.");
    navigate("/signup/email");

    return;
  }

  return (
    <div className='my-6'>
      <p className='text-sm text-gray-400'>이메일</p>
      <p className='text-base font-medium'>{email}</p>
    </div>
  );
}
