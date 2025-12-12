// import { useNavigate, useParams } from "react-router-dom";

export default function PartyDetailDropdownContents() {
  // const { partyId } = useParams<{ partyId: string }>();
  // const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 items-start">
      <button
        className="dropdown-menu-item"
        // onClick={() => navigate(`party/applications/${id}/approve`)}
      >
        참여자 보기
      </button>
      <div className="border-b border-gray-300 w-full" />
      <button
        className="text-red-500 dropdown-menu-item"
        // onClick={() => navigate(`party/applications/${id}/reject`)}
      >
        삭제하기
      </button>
    </div>
  );
}
