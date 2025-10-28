import SignupEmailForm from "@/components/signup/SignupEmailForm";

export default function SignupEmailPage() {
  return (
    <div className='flex flex-col h-full px-4 py-6'>
      <h2 className='text-lg font-semibold mb-6'>
        가치입다를 시작하기 위해
        <br />
        다음 정보를 입력해 주세요
      </h2>
      <div className='flex-1'>
        <SignupEmailForm />
      </div>
    </div>
  );
}
