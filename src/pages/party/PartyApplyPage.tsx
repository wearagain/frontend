import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { useGetParty } from "@/hooks/party/useGetParty";
import { useApplyStore } from "@/store/useApplyStore";
import { useApplySubmit } from "@/hooks/party/useApply";

import ApplyClothingInfoForm from "@/components/apply/ApplyClothingInfoForm";
import ApplyClothingSelectorForm from "@/components/apply/ApplyClothingSelectorForm";
import ApplyDateTimeSelctorForm from "@/components/apply/ApplyDateTimeSelectForm";
import ApplyInfoCheckForm from "@/components/apply/ApplyInfoCheckForm";
import { Button } from "@/components/ui/button";

import { type SelectedItem } from "@/types/clothingCategory";

export default function PartyApplyPage() {
  // Step 관리
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { id: partyId } = useParams();
  const { data } = useGetParty(partyId!);

  const step = parseInt(searchParams.get("step") || "1");

  // 상태 관리
  const {
    selectedItems,
    itemsInfo,
    selectedDate,
    selectedTime,
    setPartyId,
    setSelectedItems,
    setDateTime,
    reset,
  } = useApplyStore();

  const { mutate: submitApply, isPending } = useApplySubmit(partyId!);

  useEffect(() => {
    if (partyId) {
      setPartyId(partyId);
    }
  }, [partyId, setPartyId]);

  // 유효성 상태 관리
  const [step2Valid, setStep2Valid] = useState(false);
  const [step3Valid, setStep3Valid] = useState(false);

  // 임시 날짜 및 시간 상태 관리
  const [tempDateTimeData, setTempDateTimeData] = useState({
    date: selectedDate,
    time: selectedTime,
  });

  const setStep = useCallback(
    (newStep: number) => {
      setSearchParams({ step: String(newStep) });
    },
    [setSearchParams]
  );

  // handlers
  // submit handlers
  const handleCategorySubmit = useCallback(
    (items: SelectedItem[]) => {
      setSelectedItems(items);
      setStep(2);
    },
    [setSelectedItems, setStep]
  );

  const handleFinalSubmit = useCallback(() => {
    submitApply(
      {
        selectedItems,
        itemsInfo,
        selectedDate,
        selectedTime,
      },
      {
        onSuccess: () => {
          reset();
          navigate("complete");
        },
      }
    );
  }, [selectedItems, itemsInfo, selectedDate, selectedTime, submitApply, reset, navigate]);

  // navigation handlers
  const handleGoBack = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step, setStep]);

  const handleGoToFirst = useCallback(() => {
    setStep(1);
  }, [setStep]);

  const handleGoNext = useCallback(() => {
    const nextStep = step + 1;
    switch (step) {
      case 2:
        if (!step2Valid) return;
        break;
      case 3:
        if (!step3Valid) return;
        setDateTime(tempDateTimeData.date, tempDateTimeData.time);
        break;
      default:
        return;
    }
    setStep(nextStep);
  }, [step, step2Valid, step3Valid, setDateTime, tempDateTimeData, setStep]);

  // update handler
  const handleDateTimeUpdate = useCallback((date: Date | null, time: string | null) => {
    setTempDateTimeData({ date, time });
  }, []);

  // 버튼 비활성화 여부
  const isDisabled = useMemo(() => {
    switch (step) {
      case 2:
        return !step2Valid;
      case 3:
        return !step3Valid;
    }
    return true;
  }, [step, step2Valid, step3Valid]);

  if (!data) {
    return <div></div>;
  }

  return (
    <div className='flex flex-col min-h-screen'>
      {/* 폼 */}
      {step === 1 && (
        <ApplyClothingSelectorForm maxItemLimit={data.maxChangeCnt} onNext={handleCategorySubmit} />
      )}
      {step === 2 && (
        <ApplyClothingInfoForm
          maxItemLimit={data.maxChangeCnt}
          onBack={handleGoBack}
          onSetIsValid={setStep2Valid}
        />
      )}
      {step === 3 && (
        <ApplyDateTimeSelctorForm
          onSetIsValid={setStep3Valid}
          onUpdateTempDateTime={handleDateTimeUpdate}
          openAt={data.openAt}
          closeAt={data.closeAt}
          initialDate={selectedDate}
          initialTime={selectedTime}
        />
      )}
      {step === 4 && (
        <ApplyInfoCheckForm
          onFinalSubmit={handleFinalSubmit}
          partyName={data.title}
          onBack={handleGoToFirst}
          isPending={isPending}
        />
      )}

      {/* 다음 버튼 */}
      {(step == 2 || step == 3) && (
        <div className='fixed bottom-0 left-0 right-0 bg-white px-5 pt-5 pb-14 z-100'>
          <Button
            type='submit'
            onClick={handleGoNext}
            disabled={isDisabled}
            className='w-full h-12 text-base font-semibold'
          >
            {"다음"}
          </Button>
        </div>
      )}
    </div>
  );
}
