import { Button } from "@/components/ui/button.tsx";

interface InfoBottomBarProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function InfoBottomBar({ onConfirm, onCancel }: InfoBottomBarProps) {
  return (
    <div className='fixed bottom-0 left-0 right-0 px-5 pt-5 pb-14 max-w-[430px] mx-auto bg-white'>
      <div className='flex gap-4 h-[52px] w-full'>
        <Button
          type='button'
          onClick={onCancel}
          theme='cancel'
          variant='primary'
          className='flex-1 h-full'
        >
          교환 취소
        </Button>
        <Button
          type='button'
          onClick={onConfirm}
          theme='mint'
          variant='primary'
          className='flex-1 h-full'
        >
          확인
        </Button>
      </div>
    </div>
  );
}
