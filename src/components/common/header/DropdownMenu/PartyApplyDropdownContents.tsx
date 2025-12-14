import { useNavigate, useParams } from "react-router-dom";

export default function PartyApplyDropdownContents() {
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 items-start">
      <button
        className="dropdown-menu-item"
        onClick={() => navigate(`party/applications/${applicationId}/approve`)}
      >
        승인하기
      </button>
      <div className="border-b border-gray-300 w-full" />
      <button
        className="text-red-500 dropdown-menu-item"
        onClick={() => navigate(`party/applications/${applicationId}/reject`)}
      >
        반려하기
      </button>
    </div>
  );
}
