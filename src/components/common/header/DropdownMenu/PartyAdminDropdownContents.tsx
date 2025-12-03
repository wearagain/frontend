import { useNavigate } from "react-router-dom";

export default function PartyAdminDropdownContents() {
  const id = window.document.URL.split("/").pop() ?? "";
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-2'>
      <button className='dropdown-menu-item' onClick={() => navigate(`party/${id}/approved`)}>
        승인하기
      </button>
      <div className='border-b border-gray-300' />
      <button
        className='text-red-500 dropdown-menu-item'
        onClick={() => navigate(`party/${id}/rejected`)}
      >
        반려하기
      </button>
    </div>
  );
}
