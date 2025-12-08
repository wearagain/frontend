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
import { useNavigate } from "react-router-dom";
import type { RepairClothsDetail } from "@/types/community.ts";
import { generateDummyRepairClothDetails } from "@/utils/community/dummy.ts";

const ExchangeRequestPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const navigate = useNavigate();

  const dummyResult: RepairClothsDetail = generateDummyRepairClothDetails(1)[0];

  const methods = useForm({
    defaultValues: {
      place: "",
      date: new Date(),
    },
    mode: "onChange",
  });

  const { isValid } = methods.formState;
  const onSubmit = (data: any) => {
    console.log("폼 제출 데이터:", data);
    setOpenModal(false);
    // TODO: 실제 서버 전송 로직 등 추가
  };

  return (
    <FormProvider {...methods}>
      <form className='bottombar-p' onSubmit={methods.handleSubmit(onSubmit)}>
        <ClothInfo code={dummyResult.clothingNumber} />
        <div className='divider' />
        <TicketInfo ticket={10} />
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
            confirmDisabled={!isValid}
            onConfirm={methods.handleSubmit((data) => {
              onSubmit(data);
              setOpenModal(false);
              setOpenSuccessModal(true);
            })}
          >
            <div className='flex flex-col gap-5'>
              <ClothInfo code='J100293' compact={true} />
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
          />
        )}
      </form>
    </FormProvider>
  );
};

export default ExchangeRequestPage;
