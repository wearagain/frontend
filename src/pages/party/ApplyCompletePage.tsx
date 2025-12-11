import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

type CompleteType = "participate" | "host";

const ApplyCompletePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const type: CompleteType = location.pathname.includes("/host") ? "host" : "participate";

  const config = {
    participate: {
      navigateTo: "/party/apply",
      iconColor: "fill-mint-light",
    },
    host: {
      navigateTo: "/party/apply?tab=host&status=apply",
      iconColor: "fill-purple-light",
    },
  };

  const { navigateTo, iconColor } = config[type];

  return (
    <div className='flex flex-col h-full px-5 pb-14'>
      <div className='flex flex-col items-center justify-center flex-1'>
        <CheckCircle2 className={`${iconColor} text-white`} size={100} />
        <div className='text-center mt-8'>
          <h2 className='text-xl font-semibold mb-2'>신청이 완료됐습니다</h2>
        </div>
      </div>

      <Button
        type='submit'
        theme={iconColor === "fill-mint-light" ? "mint" : "purple"}
        className='w-full h-12 text-base font-semibold'
        onClick={() => navigate(navigateTo)}
      >
        신청내역 확인하기
      </Button>
    </div>
  );
};

export default ApplyCompletePage;
