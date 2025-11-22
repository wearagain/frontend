import { Button } from "@/components/ui/button";

export default function Step6Complete() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] text-center'>
      <div className='w-20 h-20 rounded-full bg-(--color-purple-light) flex items-center justify-center mb-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-10 h-10 bg-(--color-purple-light) text-white'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
        </svg>
      </div>
      <h2 className='mb-2'>신청이 완료됐습니다</h2>

      <Button className='mt-6 bg-(--color-purple-light) hover:opacity-90 w-full'>
        신청내역 확인하기
      </Button>
    </div>
  );
}
