import MainLogo from "@/components/auth/MainLogo";
import SigninForm from "@/components/auth/SigninForm";
import SigninFooterLinks from "@/components/auth/SigninFooterLinks";
import SigninSocialGroup from "@/components/auth/SigninSocialGroup";

export default function SigninMainPage() {
  return (
    <div className='flex flex-col gap-16 items-center mt-28 min-h-full px-6 '>
      <MainLogo />
      <div className='w-full max-w-md flex flex-col gap-6'>
        <SigninForm />
        <SigninFooterLinks />
        <SigninSocialGroup />
      </div>
    </div>
  );
}
