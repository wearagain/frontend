import { useNavigate } from "react-router-dom";

interface HeaderProps {
  label: String;
}

export default function BoardHeader({ label }: HeaderProps) {
  const navigate = useNavigate();

  const clickMore = () => {
    const currentPath = window.location.pathname;
    navigate(currentPath + "/list");
  };

  return (
    <div className='flex justify-between w-full items-center pr-5 py-3'>
      <h3>{label}</h3>
      <button onClick={clickMore} className='text-[#939396] text-base'>
        더보기
      </button>
    </div>
  );
}
