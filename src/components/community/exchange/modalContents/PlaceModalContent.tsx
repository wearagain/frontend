import DetailRow from "@/components/community/exchange/modalContents/DetailRow.tsx";

interface PlaceModalContentProps {
  placeName: string;
  date: Date;
}

export default function PlaceModalContent({ placeName, date }: PlaceModalContentProps) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return (
    <div className='flex flex-col gap-3'>
      <DetailRow label='수령장소' detail={placeName} />
      <DetailRow label='수령날짜' detail={`${yyyy}.${mm}.${dd}`} />
    </div>
  );
}
