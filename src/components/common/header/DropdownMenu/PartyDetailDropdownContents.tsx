import { useLocation, useNavigate, useParams } from "react-router-dom";
import { usePatchPartyStatus } from "@/hooks/admin/party/manage/usePatchPartyStatus.ts";

export default function PartyDetailDropdownContents() {
  const location = useLocation();
  const { partyId } = useParams<{ partyId: string }>();
  const navigate = useNavigate();
  const { mutateAsync: mutatePartyStatus } = usePatchPartyStatus();


  const clickDelete = () => {
    mutatePartyStatus({
      id: partyId ?? "",
      status: "CANCELLED",
      count: 1,
    }, {
      onSuccess: () => {
        alert("취소 처리 완료됐습니다.");
        window.location.reload();
      },
      onError: (e) => alert(e?.message)
    })
  }
  return (
    <div className="flex flex-col gap-2 items-start">
      <button
        className="dropdown-menu-item"
        onClick={() => navigate(`${location.pathname}/participants`)}
      >
        참여자 보기
      </button>
      <div className="border-b border-gray-300 w-full" />
      <button
        className="text-red-500 dropdown-menu-item"
        onClick={clickDelete}
      >
        삭제하기
      </button>
    </div>
  );
}
