import SignupProfileForm from "@/components/signup/SignupProfileForm";

const SignupProfilePage = () => {
  return (
    <div className='flex flex-col h-full px-6 py-8'>
      <h2 className='text-lg font-semibold mb-6'>
        프로필을 만들고
        <br />
        가치를 나누어 보세요
      </h2>

      <div className='flex-1'>
        <SignupProfileForm />
      </div>
    </div>
  );
};

export default SignupProfilePage;
