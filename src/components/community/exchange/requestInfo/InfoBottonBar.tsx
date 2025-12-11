import { Button } from "@/components/ui/button.tsx";

interface InfoBottomBarProps {
  onConfirm: () => void;
  onCancel: () => void;
  isCancelPending?: boolean;
}

export default function InfoBottomBar({
  onConfirm,
  onCancel,
  isCancelPending,
}: InfoBottomBarProps) {
  return (
    <div className='bottombar-wrapper'>
      <div className='bottombar'>
        <Button
          type='button'
          onClick={onCancel}
          theme='cancel'
          variant='primary'
          className='flex-1 h-full'
          disabled={isCancelPending}
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
