import DetailRow from "@/components/community/clothDetail/DetailRow.tsx";

interface ClothDetailInfoProps {
  clothingNumber: string;
  gender: string;
  size: string;
  material: string;
  issueDescription: string;
}

export default function ClothDetailInfo(item: ClothDetailInfoProps) {
  return (
    <div className='main-inner flex flex-col gap-4 pb-8'>
      <h3>상품 정보</h3>
      <DetailRow label='의류코드' detail={item.clothingNumber} />
      <DetailRow label='성별' detail={item.gender} />
      <DetailRow label='사이즈' detail={item.size} />
      <DetailRow label='소재' detail={item.material} />
      <p className='text-wrap'>{item.issueDescription}</p>
    </div>
  );
}
