import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

type CompleteType = "participate" | "host" | "help";

const ApplyCompletePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getType = (): CompleteType => {
    if (location.pathname.includes("/help")) return "help";
    if (location.pathname.includes("/host")) return "host";
    return "participate";
  };

  const type = getType();

  const config = {
    participate: {
      navigateTo: "/party/apply",
      iconColor: "fill-mint-light",
      message: "신청이 완료됐습니다",
      buttonText: "신청내역 확인하기",
    },
    host: {
      navigateTo: "/party/apply?tab=host&status=apply",
      iconColor: "fill-purple-light",
      message: "신청이 완료됐습니다",
      buttonText: "신청내역 확인하기",
    },
    help: {
      navigateTo: "/party/help/list",
      iconColor: "fill-purple-light",
      message: "문의가 완료됐습니다",
      buttonText: "문의내역 확인하기",
    },
  };

  const { navigateTo, iconColor, message, buttonText } = config[type];

  return (
    <div className='flex flex-col h-full px-5 pb-14'>
      <div className='flex flex-col items-center justify-center flex-1'>
        <CheckCircle2 className={`${iconColor} text-white`} size={100} />
        <div className='text-center mt-8'>
          <h2 className='text-xl font-semibold mb-2'>{message}</h2>
        </div>
      </div>

      <Button
        type='submit'
        theme={iconColor === "fill-mint-light" ? "mint" : "purple"}
        className='w-full h-12 text-base font-semibold'
        onClick={() => navigate(navigateTo)}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default ApplyCompletePage;
