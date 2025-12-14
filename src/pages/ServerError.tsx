import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CircleAlert } from "@/assets/icons";

const ServerError = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <div className="flex w-full max-w-[430px] flex-col items-center">
        <div className="mb-8">
          <CircleAlert 
            className="fill-[var(--color-purple-dark)] text-white" 
            size={100} 
          />
        </div>

        <h1 className="mb-3 text-center text-20 font-semibold text-gray-900">
          서버에 접속할 수 없습니다
        </h1>

        <p className="mb-10 whitespace-pre-line text-center text-14 leading-[22px] text-gray-600">
          {"지금 이 서비스와 연결할 수 없습니다.\n잠시 후 확인해 주세요."}
        </p>

        <div className="flex w-full gap-2">
          <Button
            theme="normalOutlined"
            variant="primary"
            className="flex-1"
            onClick={handleGoBack}
          >
            이전 페이지
          </Button>
          <Button
            theme="purple"
            variant="primary"
            className="flex-1"
            onClick={handleGoHome}
          >
            홈으로 가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServerError;