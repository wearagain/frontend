import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import Step1SelectScale from "@/components/party/partyHost/Step1SelectScale";
import Step2HostInfo from "@/components/party/partyHost/Step2HostInfo";
import Step3PartyInfo from "@/components/party/partyHost/Step3PartyInfo";
import Step4Delivery from "@/components/party/partyHost/Step4Delivery";
import Step5Confirm from "@/components/party/partyHost/Step5Confirm";
import { usePartyHostStore } from "@/store/useHostStore";
import { useEffect } from "react";

type StepType = 1 | 2 | 3 | 4 | 5;
const TOTAL_STEPS = 5;

const PartyHostPage = () => {
  const [params, setParams] = useSearchParams();
  const step = (parseInt(params.get("step") || "1") as StepType) || 1;
  const location = useLocation();
  const navigate = useNavigate();
  const reset = usePartyHostStore((state) => state.reset);

  useEffect(() => {
    return () => {
      if (import.meta.env.MODE !== "development") {
        reset();
        localStorage.removeItem("party-host-storage");
      }
    };
  }, [location.pathname]);

  function ProgressBar({ currentStep }: { currentStep: StepType }) {
    const progress = (currentStep / TOTAL_STEPS) * 100;

    return (
      <div className='w-full h-1 sticky top-0 left-0 z-15'>
        <div
          className='h-full rounded-r-full bg-[var(--color-purple-light)] transition-all duration-300 ease-out'
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  }

  const goToNext = () => setParams({ step: String(step + 1) });
  const goToPrev = () => setParams({ step: String(step - 1) });
  const goToComplete = () => navigate("/host/complete");

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1SelectScale onNext={goToNext} />;
      case 2:
        return <Step2HostInfo onNext={goToNext} onBack={goToPrev} />;
      case 3:
        return <Step3PartyInfo onNext={goToNext} onBack={goToPrev} />;
      case 4:
        return <Step4Delivery onNext={goToNext} onBack={goToPrev} />;
      case 5:
        return <Step5Confirm onNext={goToComplete} />;
      default:
        return <Step1SelectScale onNext={goToNext} />;
    }
  };

  return (
    <>
      <ProgressBar currentStep={step} />
      <div className='fixed inset-y-[64px] h-full right-0 left-0 bg-white flex flex-col max-w-[430px] top-[64px] mx-auto'>
        {renderStep()}
      </div>
    </>
  );
};

export default PartyHostPage;
