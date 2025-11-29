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
    <div className='fixed z-10 bottom-0 left-0 right-0 px-5 pt-5 pb-14 max-w-[430px] mx-auto bg-white'>
      <div className='flex gap-4 h-[52px] w-full'>
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
