import DetailRow from "@/components/community/exchange/modalContents/DetailRow.tsx";

interface InfoModalContentProps {
  partyDate: string;
  partyName: string;
  totalCount: number;
}

export default function InfoModalContent({
  partyDate,
  partyName,
  totalCount,
}: InfoModalContentProps) {
  const clothes = totalCount+'개';

  return (
      <div className='flex flex-col gap-3'>
        <DetailRow label='참여 파티' detail={partyName} />
        <DetailRow label='참여 날짜' detail={partyDate} />
        <DetailRow label='의류 수량' detail={clothes} />
      </div>
  );
}
