import RequestInfo from "@/components/community/exchange/requestInfo/RequestInfo.tsx";
import SectionTitle from "@/components/community/exchange/requestApply/SectionTitle.tsx";
import ClothInfo from "@/components/community/exchange/requestApply/ClothInfo.tsx";
import InfoBottomBar from "@/components/community/exchange/requestInfo/InfoBottonBar.tsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useCancelExchangeRequest } from "@/hooks/exchange/useCancelExchangeRequest";

interface LocationState {
  clothingName: string;
  clothingCode: string;
  imageUrl?: string | null;
  receiveDate: Date;
  placeName: string;
  clothesId: string;
  receiveLocationId: string;
}

const RequestInfoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  // 데이터가 없으면 뒤로가기
  if (!state) {
    navigate(-1);
    return null;
  }

  const {
    clothingName,
    clothingCode,
    imageUrl,
    receiveDate,
    placeName,
    clothesId,
    receiveLocationId,
  } = state;
  const applyDate = new Date(); // 신청일은 현재 시간으로 설정
  const { mutate: cancelExchangeRequest, isPending } = useCancelExchangeRequest();

  const clickConfirm = () => {
    navigate("/community/exchange");
  };
  const clickCancel = () => {
    // 날짜를 ISO string 형식으로 변환
    const receiveDateString = receiveDate.toISOString();

    cancelExchangeRequest(
      {
        clothesId,
        receiveLocationId,
        receiveDate: receiveDateString,
      },
      {
        onSuccess: () => {
          alert("교환이 취소되었습니다.");
          navigate("/community/exchange");
        },
        onError: (error) => {
          console.error("교환 취소 실패:", error);
          alert("취소 중 오류가 발생했습니다. 다시 시도해주세요.");
        },
      }
    );
  };
  return (
    <div className='py-5 flex flex-col bottombar-p'>
      <RequestInfo
        date={receiveDate}
        place={placeName}
        applyDate={applyDate}
        items={[
          {
            name: clothingName,
            code: clothingCode,
            image: imageUrl ?? undefined,
          },
        ]}
      />
      <div className='divider' />
      <div className='main-inner pr-5 flex flex-col gap-5'>
        <SectionTitle title='신청 품목 정보' />
        <ClothInfo code={clothingCode} name={clothingName} imageUrl={imageUrl} compact />
      </div>
      <InfoBottomBar onCancel={clickCancel} onConfirm={clickConfirm} isCancelPending={isPending} />
    </div>
  );
};

export default RequestInfoPage;
