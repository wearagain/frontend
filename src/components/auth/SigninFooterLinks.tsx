import { Link } from "react-router-dom";

const SigninFooterLinks = () => {
  return (
    <div className='flex justify-center items-center gap-3 text-sm text-gray-700'>
      <Link to='/signup/email'>회원가입</Link>
      <span className='text-gray-400'>|</span>
      <Link to='/auth/reset'>비밀번호 찾기</Link>
    </div>
  );
};

export default SigninFooterLinks;
