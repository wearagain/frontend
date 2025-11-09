import { useLocation, useSearchParams } from "react-router-dom";
import Step1SelectScale from "@/components/party/partyHost/Step1SelectScale";
import Step2HostInfo from "@/components/party/partyHost/Step2HostInfo";
import Step3PartyInfo from "@/components/party/partyHost/Step3PartyInfo";
import Step4Delivery from "@/components/party/partyHost/Step4Delivery";
import Step5Confirm from "@/components/party/partyHost/Step5Confirm";
import Step6Complete from "@/components/party/partyHost/Step6Complete";
import { usePartyHostStore } from "@/store/useHostStore";
import { useEffect } from "react";

const PartyHostPage = () => {
  const [params, setParams] = useSearchParams();
  const step = Number(params.get("step")) || 1;
  const location = useLocation();
  const reset = usePartyHostStore((state) => state.reset);

  useEffect(() => {
    return () => {
      if (import.meta.env.MODE !== "development") {
        reset();
        localStorage.removeItem("party-host-storage");
      }
    };
  }, [location.pathname]);

  const goToNext = () => setParams({ step: String(step + 1) });
  const goToPrev = () => setParams({ step: String(step - 1) });

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
        return <Step5Confirm onNext={goToNext} onBack={goToPrev} />;
      case 6:
        return <Step6Complete />;
      default:
        return <Step1SelectScale onNext={goToNext} />;
    }
  };

  return <div className='max-w-[430px] mx-auto px-4 py-6'>{renderStep()}</div>;
};

export default PartyHostPage;
