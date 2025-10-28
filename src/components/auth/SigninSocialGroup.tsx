import { useSocialLogin } from "@/hooks/auth/useAuth";
import SigninSocialButton from "./SigninSocialButton";
import { KIcon, NIcon, GIcon } from "@/assets/icons";

const SigninSocialGroup = () => {
  const { kakao, naver, google } = useSocialLogin();

  return (
    <div className='flex justify-center items-center gap-5'>
      <SigninSocialButton icon={KIcon} bgColor='bg-[#FEE500]' onClick={kakao} />
      <SigninSocialButton icon={NIcon} bgColor='bg-[#03C75A]' onClick={naver} />
      <SigninSocialButton icon={GIcon} bgColor='bg-gray-100' onClick={google} />
    </div>
  );
};

export default SigninSocialGroup;
