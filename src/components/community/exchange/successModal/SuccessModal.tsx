import { Button } from "@/components/ui/button";
import { X } from "@/assets/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { CircleCheck } from "lucide-react";
import SectionTitle from "@/components/community/exchange/requestApply/SectionTitle.tsx";

interface SuccessModalProps {
  onClose: () => void;
  clothingName: string;
  clothingCode: string;
  imageUrl?: string | null;
  receiveDate: Date;
  placeName: string;
  clothesId: string;
  receiveLocationId: string;
}

const SuccessModal = ({
  onClose,
  clothingName,
  clothingCode,
  imageUrl,
  receiveDate,
  placeName,
  clothesId,
  receiveLocationId,
}: SuccessModalProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const formatDate = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  };

  const handleNavigateToInfo = () => {
    navigate(location.pathname + "/info", {
      state: {
        clothingName,
        clothingCode,
        imageUrl,
        receiveDate,
        placeName,
        clothesId,
        receiveLocationId,
      },
    });
  };

  return (
    <div className='fixed inset-y-0 left-0 right-0 z-[1001] flex flex-col justify-between bg-white max-w-[430px] mx-auto top-0'>
      <div className='sticky top-0 flex items-end justify-between w-full h-[var(--header-height)] px-4 pb-3 bg-white    '>
        <button onClick={onClose} className='ml-auto'>
          <X className='w-6 h-6' />
        </button>
      </div>
      <div className='flex flex-1 flex-col items-center justify-center gap-4 px-5'>
        <div className='flex gap-4'>
          <CircleCheck strokeWidth={2} className=' fill-mint-dark text-white' size={120} />
        </div>
        <h2 className='h-fit text-wrap'>신청이 완료됐습니다</h2>

        {/* 의류 정보 */}
        <div className='w-full flex gap-4 items-start mt-4'>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={clothingName}
              className='w-[60px] min-w-[60px] h-[60px] rounded-[10px] object-cover'
            />
          ) : (
            <div className='w-[60px] min-w-[60px] h-[60px] rounded-[10px] bg-gray-200' />
          )}
          <div className='flex min-w-max flex-col gap-[2px]'>
            <SectionTitle title={clothingName} />
            <span className='flex gap-[6px] w-fit items-center h-[60ox]'>
              <p className='font-medium'>의류코드</p>
              <p className='font-medium'>{clothingCode}</p>
            </span>
          </div>
        </div>

        {/* 수령 날짜 */}
        <div className='w-full flex flex-col gap-2 mt-4'>
          <SectionTitle title='수령날짜' />
          <p className='font-medium'>{formatDate(receiveDate)}</p>
        </div>
      </div>

      <Button
        type='button'
        onClick={handleNavigateToInfo}
        theme='mint'
        variant='primary'
        className='h-[52px] mb-14 mx-5'
      >
        신청내역 확인하기
      </Button>
    </div>
  );
};

export default SuccessModal;
