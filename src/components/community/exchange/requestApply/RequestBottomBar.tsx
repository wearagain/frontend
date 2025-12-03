import { Button } from "@/components/ui/button.tsx";
import { useFormContext } from "react-hook-form";

interface RequestBottomBarProps {
  onClick: () => void;
}

export default function RequestBottomBar({ onClick }: RequestBottomBarProps) {
  const {
    formState: { isValid },
  } = useFormContext();
  return (
    <div className='z-10 bottombar-wrapper'>
      <div className='bottombar'>
        <Button
          disabled={!isValid}
          type='button'
          onClick={onClick}
          theme='mint'
          variant='primary'
          className='flex-1 h-full'
        >
          교환하기
        </Button>
      </div>
    </div>
  );
}
