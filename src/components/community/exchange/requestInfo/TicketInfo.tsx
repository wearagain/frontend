import SectionTitle from "@/components/community/exchange/requestInfo/SectionTitle.tsx";

interface TicketInfoProps {
  ticket: number;
}

export default function TicketInfo({ ticket }: TicketInfoProps) {
  return (
    <div className='main-inner pr-5 pb-5 flex flex-col gap-4'>
      <SectionTitle title='사용 가능 티켓' />
      <h2>{ticket}장</h2>
    </div>
  );
}
