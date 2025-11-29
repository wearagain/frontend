import { Button } from "../ui/button";
import type { ThemeKey } from "@/constants/themeColor.ts";

interface Props {
  header: string;
  confirmText: string;
  closeText?: string;
  onConfirm: () => void;
  onClose: () => void;
  confirmDisabled?: boolean;
  theme?: ThemeKey;
  children?: React.ReactNode;
}

export default function Modal({
  header,
  confirmText,
  closeText = "아니요",
  onConfirm,
  onClose,
  confirmDisabled = false,
  theme = "mint",
  children,
}: Props) {
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-100'>
      <div className=' min-w-max p-5 w-full max-w-[430px]'>
        <div className='p-5 bg-white rounded-[20px] shadow-2xl'>
          <h4 className='font-bold text-[20px]'>{header}</h4>
          <div className='py-5'>{children}</div>
          <div className='flex justify-between gap-4 font-semibold'>
            <Button onClick={onClose} theme={theme} variant='muted' className='h-12 w-1/3 '>
              {closeText}
            </Button>
            <Button
              onClick={onConfirm}
              theme={theme}
              variant='primary'
              className='h-12 w-2/3'
              disabled={confirmDisabled}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
