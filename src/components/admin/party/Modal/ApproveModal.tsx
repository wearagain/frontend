import { useParams } from "react-router-dom";
import { Close } from "@/components/common/header";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useMutateApplicationStatus } from "@/hooks/admin/party/useMutateApplicationStatus.ts";

export default function ApproveModal() {
  const navigate = useNavigate();
  const { partyId } = useParams<{ partyId: string }>();

  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setThumbnail(url);
    }
  };

  const { mutate: mutateApplicationStatus } = useMutateApplicationStatus();

  return (
    <div className='fixed left-0 right-0 inset-0 z-[1001] flex min-h-max flex-col justify-between bg-white max-w-[430px] mx-auto top-0 h-full'>
      <div className='sticky top-0 flex items-end justify-between w-full h-[var(--header-height)] px-4 pb-3 bg-white'>
        <Close onClose={() => navigate(-1)} />
      </div>

      <div className='flex flex-col items-start flex-1 gap-4'>
        <div className='p-5 w-full border-b border-[#E0E2E4]'>
          <h2>파티 주최를 승인합니다</h2>
          <h2>썸네일을 등록해 주세요</h2>
        </div>
        <div className='px-5 flex flex-col gap-5'>
          <h3 className='text-gray-500'>썸네일 등록</h3>
          <button type='button' onClick={handleButtonClick}>
            {thumbnail ? (
              <img
                src={thumbnail}
                alt='thumbnail preview'
                className='object-cover w-full h-full rounded'
              />
            ) : (
              <img src='/images/camera.svg' alt='camera' />
            )}
          </button>
          <input
            ref={inputRef}
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className='bg-white sticky bottom-0 flex items-center justify-center pt-5 w-full'>
        <Button
          type='button'
          onClick={() =>
            mutateApplicationStatus({
              id: partyId!,
              action: "approve",
            })
          }
          theme='purple'
          variant='primary'
          className='h-[52px] mb-14 mx-5 w-full'
        >
          승인하기
        </Button>
      </div>
    </div>
  );
}
