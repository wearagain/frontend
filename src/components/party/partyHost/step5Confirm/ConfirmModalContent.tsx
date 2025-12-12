import DetailRow from "@/components/community/exchange/modalContents/DetailRow.tsx";

interface ConfirmModalContentProps {
  partyDate: string;
  partyTime: string;
  partyAddress: string;
  maxAttendeeCnt: number;
  maxChangeCnt: number;
  description: string;
}

export default function ConfirmModalContent({
  partyDate,
  partyTime,
  partyAddress,
  maxAttendeeCnt,
  maxChangeCnt,
  description,
}: ConfirmModalContentProps) {
  return (
    <div className='flex flex-col gap-3'>
      <DetailRow label='날짜' detail={partyDate} />
      <DetailRow label='시간' detail={partyTime} />
      <DetailRow label='장소' detail={partyAddress} />
      <DetailRow label='참석자수' detail={`${maxAttendeeCnt}명`} />
      <DetailRow label='의류수' detail={`${maxChangeCnt}벌`} />
      <DetailRow label='소개' detail={description} />
    </div>
  );
}
