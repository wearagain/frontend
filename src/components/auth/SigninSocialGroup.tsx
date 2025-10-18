import SigninSocialButton from "./SigninSocialButton";
import { KIcon, NIcon, GIcon } from "@/assets/icons";

const SigninSocialGroup = () => {
  return (
    <div className='flex justify-center items-center gap-5'>
      <SigninSocialButton icon={KIcon} bgColor='bg-[#FEE500]' />
      <SigninSocialButton icon={NIcon} bgColor='bg-[#03C75A]' />
      <SigninSocialButton icon={GIcon} bgColor='bg-gray-100' />
    </div>
  );
};

export default SigninSocialGroup;
