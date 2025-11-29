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
    <div className='main-inner z-99 pr-5 pb-14 pt-5 flex gap-[10px] min-h-[52px] sticky bottom-0 w-full bg-white'>
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
  );
}
