import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { useGetParty } from "@/hooks/party/useGetParty";
import { useApplyStore } from "@/store/useApplyStore";
import { useApplySubmit } from "@/hooks/party/useApply";
import { type SelectedItem } from "@/types/clothingCategory";
import StatusHandler from "@/components/common/StatusHandler.tsx";

import Step1ClothingSelect from "@/components/party/partyParticipate/Step1ClothingSelect";
import Step2ClothingInfo from "@/components/party/partyParticipate/Step2ClothingInfo";
import Step3DateTimeSelect from "@/components/party/partyParticipate/Step3DateTimeSelect";
import Step4InfoCheck from "@/components/party/partyParticipate/Step4InfoCheck";
import { Button } from "@/components/ui/button";

// 스텝 타입 정의
type StepType = 1 | 2 | 3 | 4;
const TOTAL_STEPS = 4;

// 날짜/시간 임시 데이터 타입
interface TempDateTimeData {
  date: Date | null;
  time: string | null;
}

function ProgressBar({ currentStep }: { currentStep: StepType }) {
  const progress = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className='w-full h-1 sticky top-0 left-0 z-15'>
      <div
        className='h-full rounded-r-full bg-[var(--color-mint-light)] transition-all duration-300 ease-out'
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function NextButton({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <div className='flex-shrink-0 sticky bottom-0 bg-white px-5 pt-4 pb-8'>
      <Button onClick={onClick} disabled={disabled} className='w-full h-12 text-base font-semibold'>
        다음
      </Button>
    </div>
  );
}

export default function PartyParticipatePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { id: partyId } = useParams<{ id: string }>();
  const { data: partyData, isLoading, isError, error } = useGetParty(partyId!);

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

  // 현재 스텝
  const step = (parseInt(searchParams.get("step") || "1") as StepType) || 1;

  // 유효성 상태
  const [step2Valid, setStep2Valid] = useState(false);
  const [step3Valid, setStep3Valid] = useState(false);

  // 임시 날짜/시간 상태
  const [tempDateTimeData, setTempDateTimeData] = useState<TempDateTimeData>({
    date: selectedDate,
    time: selectedTime,
  });

  useEffect(() => {
    if (partyId) {
      setPartyId(partyId);
    }
  }, [partyId, setPartyId]);

  const setStep = useCallback(
    (newStep: StepType) => {
      setSearchParams({ step: String(newStep) });
    },
    [setSearchParams]
  );

  // Step 1: 카테고리 선택 완료
  const handleCategorySubmit = useCallback(
    (items: SelectedItem[]) => {
      setSelectedItems(items);
      setStep(2);
    },
    [setSelectedItems, setStep]
  );

  // Step 2, 3: 날짜/시간 임시 업데이트
  const handleDateTimeUpdate = useCallback((date: Date | null, time: string | null) => {
    setTempDateTimeData({ date, time });
  }, []);

  // Step 2, 3: 다음 버튼 클릭
  const handleGoNext = useCallback(() => {
    if (step === 2 && !step2Valid) return;
    if (step === 3) {
      if (!step3Valid) return;
      setDateTime(tempDateTimeData.date, tempDateTimeData.time);
    }
    setStep((step + 1) as StepType);
  }, [step, step2Valid, step3Valid, setDateTime, tempDateTimeData, setStep]);

  // 이전 단계로
  const handleGoBack = useCallback(() => {
    if (step > 1) {
      setStep((step - 1) as StepType);
    }
  }, [step, setStep]);

  // 처음으로
  const handleGoToFirst = useCallback(() => {
    setStep(1);
  }, [setStep]);

  // 제출
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

  // 다음 버튼 비활성화 여부
  const isNextDisabled = useMemo(() => {
    if (step === 2) return !step2Valid;
    if (step === 3) return !step3Valid;
    return true;
  }, [step, step2Valid, step3Valid]);

  // 다음 버튼 표시 여부
  const showNextButton = step === 2 || step === 3;

  return (
    <StatusHandler isLoading={isLoading || !partyData} isError={isError} error={error}>
      <ProgressBar currentStep={step} />
      <div className='fixed inset-y-[64px] h-full right-0 left-0 bg-white flex flex-col max-w-[430px] top-[64px] mx-auto'>
        {step === 1 && partyData && (
          <Step1ClothingSelect
            maxItemLimit={partyData.maxChangeCnt}
            onNext={handleCategorySubmit}
          />
        )}

        {step === 2 && partyData && (
          <Step2ClothingInfo
            maxItemLimit={partyData.maxChangeCnt}
            onBack={handleGoBack}
            onSetIsValid={setStep2Valid}
          />
        )}

        {step === 3 && partyData && (
          <Step3DateTimeSelect
            onSetIsValid={setStep3Valid}
            onUpdateTempDateTime={handleDateTimeUpdate}
            openAt={partyData.openAt}
            closeAt={partyData.closeAt}
            initialDate={selectedDate}
            initialTime={selectedTime}
          />
        )}

        {step === 4 && partyData && (
          <Step4InfoCheck
            onFinalSubmit={handleFinalSubmit}
            partyName={partyData.title}
            onBack={handleGoToFirst}
            isPending={isPending}
          />
        )}

        {showNextButton && <NextButton onClick={handleGoNext} disabled={isNextDisabled} />}
      </div>
    </StatusHandler>
  );
}
