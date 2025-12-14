import DetailRow from "@/components/community/exchange/modalContents/DetailRow.tsx";
import type { TaxUpdateRequest } from "@/types/admin/party.ts";

export default function TaxModalContent({ taxId, name }: TaxUpdateRequest) {

  return (
    <div className='flex flex-col gap-3'>
      <DetailRow label='등록번호' detail={taxId ?? ''} />
      <DetailRow label='성명' detail={name ?? ''} />
    </div>
  );
}
