import { Button } from "../ui/button";

function DonationCard() {
  return (
    <div className='p-5 bg-(--color-purple-light) rounded-lg mt-5'>
      <div className='mb-4'>
        <p className='text-sm pb-1 text-gray-50'>후원하기</p>
        <h3 className='font-bold pb-2 text-white'>다시입다연구소</h3>
        <p className='text-gray-100'>
          다시입어, 패스트패션 사회를 끝내고 미래가 있는 오늘을 만듭니다.
        </p>
      </div>
      <Button className='h-12 w-full bg-white text-(--color-purple-light) font-bold'>
        후원하기
      </Button>
    </div>
  );
}

export default DonationCard;
