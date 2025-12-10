import RequestInfo from "@/components/community/exchange/requestInfo/RequestInfo.tsx";
import SectionTitle from "@/components/community/exchange/requestApply/SectionTitle.tsx";
import ClothInfo from "@/components/community/exchange/requestApply/ClothInfo.tsx";
import InfoBottomBar from "@/components/community/exchange/requestInfo/InfoBottonBar.tsx";
import { useNavigate } from "react-router-dom";

const RequestInfoPage = () => {
  const navigate = useNavigate();
  const clickConfirm = () => {
    navigate("/community/exchange");
  };
  const clickCancel = () => {
    console.log("cancel!");
  };
  return (
    <div className='py-5 flex flex-col bottombar-p'>
      <RequestInfo />
      <div className='divider' />
      <div className='main-inner pr-5 flex flex-col gap-5'>
        <SectionTitle title='신청 품목 정보' />
        <ClothInfo code='c' compact />
      </div>
      <InfoBottomBar onCancel={clickCancel} onConfirm={clickConfirm} />
    </div>
  );
};

export default RequestInfoPage;
