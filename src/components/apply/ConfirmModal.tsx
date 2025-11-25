import { Button } from "../ui/button";

interface Props {
  onClose: () => void;
  onConfirm: () => void;
  partyDate: string;
  partyName: string;
  totalCount: number;
}

export default function ConfirmModal({
  onClose,
  onConfirm,
  partyDate,
  partyName,
  totalCount,
}: Props) {
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-100'>
      <div className='bg-white rounded-xl p-5 w-[85%] max-w-sm shadow-2xl'>
        <h3 className='font-bold text-lg mb-5'>해당 내용 신청하시겠습니까?</h3>

        <div className='text-sm space-y-3 mb-5'>
          <div className='flex text-sm font-medium'>
            <span className='text-gray-500 mr-4'>파티</span>
            <span>{partyName}</span>
          </div>
          <div className='flex text-sm font-medium items-center'>
            <span className='text-gray-500 mr-4'>신청 정보</span>
            <span>{partyDate}</span>
            <span className='w-0.5 h-0.5 rounded-full mx-1 bg-gray-400'></span>
            <span>{totalCount}개</span>
          </div>
        </div>

        <div className='flex justify-between gap-4 font-semibold'>
          <Button
            onClick={onClose}
            className='text-[var(--color-mint-light)] h-12 bg-[var(--color-mint-light)/20] hover:bg-gray-50'
          >
            아니요
          </Button>
          <Button onClick={onConfirm} className='w-2/3 h-12'>
            신청하기
          </Button>
        </div>
      </div>
    </div>
  );
}
