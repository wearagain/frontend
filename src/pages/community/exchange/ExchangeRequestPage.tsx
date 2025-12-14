import ClothInfo from "@/components/community/exchange/requestApply/ClothInfo.tsx";
import TicketInfo from "@/components/community/exchange/requestApply/TicketInfo.tsx";
import PlaceInfo from "@/components/community/exchange/requestApply/PlaceInfo.tsx";
import DateInfo from "@/components/community/exchange/requestApply/DateInfo.tsx";
import RequestBottomBar from "@/components/community/exchange/requestApply/RequestBottomBar.tsx";
import Modal from "@/components/ui/modal.tsx";
import { useState } from "react";
import PlaceModalContent from "@/components/community/exchange/modalContents/PlaceModalContent.tsx";
import { FormProvider, useForm } from "react-hook-form";
import SuccessModal from "@/components/community/exchange/successModal/SuccessModal.tsx";
import { useNavigate, useLocation } from "react-router-dom";
import type { RepairClothsDetail } from "@/types/community.ts";
import { useGetAvailableVouchers } from "@/hooks/inspection/useGetAvailableVouchers";
import { useGetBaseAreas } from "@/hooks/exchange/useGetBaseAreas";
import { usePostExchangeRequest } from "@/hooks/exchange/usePostExchangeRequest";
import StatusHandler from "@/components/common/StatusHandler.tsx";

interface LocationState {
  clothingDetail: RepairClothsDetail;
}

interface FormData {
  place: string;
  placeId: string;
  date: Date;
}

const ExchangeRequestPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  // 상세 페이지에서 전달된 데이터 사용, 없으면 뒤로가기
  const clothingDetail = state?.clothingDetail;
  if (!clothingDetail) {
    navigate(-1);
    return null;
  }

  const {
    data: vouchers,
    isLoading: isLoadingVouchers,
    isError: isErrorVouchers,
    error: errorVouchers,
  } = useGetAvailableVouchers();
  const { isLoading: isLoadingAreas, isError: isErrorAreas, error: errorAreas } = useGetBaseAreas();
  const { mutate: postExchangeRequest, isPending } = usePostExchangeRequest();

  const isLoading = isLoadingVouchers || isLoadingAreas;
  const isError = isErrorVouchers || isErrorAreas;
  const error = errorVouchers || errorAreas;

  const methods = useForm<FormData>({
    defaultValues: {
      place: "",
      placeId: "",
      date: new Date(),
    },
    mode: "onChange",
  });

  const { isValid } = methods.formState;
  const onSubmit = (data: FormData) => {
    if (!data.placeId || !data.date) {
      alert("수령 장소와 날짜를 선택해주세요.");
      return;
    }

    // 날짜를 ISO string 형식으로 변환
    const receiveDate = data.date.toISOString();

    postExchangeRequest(
      {
        clothesId: clothingDetail.id,
        receiveLocationId: data.placeId,
        receiveDate,
      },
      {
        onSuccess: () => {
          setOpenModal(false);
          setOpenSuccessModal(true);
        },
        onError: (error) => {
          console.error("교환 신청 실패:", error);
          alert("신청 중 오류가 발생했습니다. 다시 시도해주세요.");
        },
      }
    );
  };

  return (
    <StatusHandler isLoading={isLoading} isError={isError} error={error}>
      <FormProvider {...methods}>
        <form className='bottombar-p' onSubmit={methods.handleSubmit(onSubmit)}>
          <ClothInfo code={clothingDetail.clothingNumber} name={clothingDetail.name} />
          <div className='divider' />
          <TicketInfo ticket={vouchers?.length ?? 0} />
          <div className='divider' />
          <PlaceInfo />
          <DateInfo />
          <RequestBottomBar onClick={() => setOpenModal(true)} />
          {openModal && (
            <Modal
              header='해당 정보로 신청하겠습니까?'
              confirmText='신청하기'
              theme='mint'
              onClose={() => setOpenModal(false)}
              confirmDisabled={!isValid || isPending}
              onConfirm={methods.handleSubmit(onSubmit)}
            >
              <div className='flex flex-col gap-5'>
                <ClothInfo
                  code={clothingDetail.clothingNumber}
                  name={clothingDetail.name}
                  compact={true}
                />
                <PlaceModalContent
                  date={methods.getValues("date")}
                  placeName={methods.getValues("place")}
                />
              </div>
            </Modal>
          )}
          {openSuccessModal && (
            <SuccessModal
              onClose={() => {
                navigate("/community/exchange");
              }}
              clothingName={clothingDetail.name}
              clothingCode={clothingDetail.clothingNumber}
              imageUrl={clothingDetail.images?.[0] ?? null}
              receiveDate={methods.getValues("date")}
              placeName={methods.getValues("place")}
              clothesId={clothingDetail.id}
              receiveLocationId={methods.getValues("placeId")}
            />
          )}
        </form>
      </FormProvider>
    </StatusHandler>
  );
};

export default ExchangeRequestPage;
