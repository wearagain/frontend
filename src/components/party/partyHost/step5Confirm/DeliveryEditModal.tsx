import { useEffect } from "react";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { loadDaumPostcode } from "@/utils/loadDaumPostcode";

interface DeliveryEditData {
  deliverAddress: string;
  deliverAddressDetail: string;
  desiredDate: string;
  taxReceipt: boolean;
  taxId: string;
  taxEmail: string;
}

interface DeliveryEditModalProps {
  data: DeliveryEditData;
  onChange: (data: DeliveryEditData) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeliveryEditModal({
  data,
  onChange,
  onClose,
  onConfirm,
}: DeliveryEditModalProps) {
  useEffect(() => {
    loadDaumPostcode().catch((err) => console.error(err));
  }, []);

  const openPostcode = () => {
    if (!window.daum?.Postcode) {
      alert("주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: (result: { address: string }) => {
        onChange({
          ...data,
          deliverAddress: result.address,
          deliverAddressDetail: "",
        });
      },
    }).open();
  };

  return (
    <Modal
      header='해당 정보로 수정하겠습니까?'
      confirmText='수정하기'
      closeText='아니요'
      theme='purple'
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <div className='flex flex-col gap-4 max-h-[50vh] overflow-y-auto custom-scroll pr-1'>
        {/* 주소 */}
        <div className='flex flex-col gap-2'>
          <Label>배송 주소</Label>
          <div className='flex gap-2'>
            <Input
              placeholder='주소'
              value={data.deliverAddress}
              onChange={(e) => onChange({ ...data, deliverAddress: e.target.value })}
              className='flex-1'
            />
            <Button type='button' theme='purple' onClick={openPostcode} className='shrink-0'>
              검색
            </Button>
          </div>
          <Input
            placeholder='상세 주소'
            value={data.deliverAddressDetail}
            onChange={(e) => onChange({ ...data, deliverAddressDetail: e.target.value })}
          />
        </div>

        {/* 희망 배송일 */}
        <div className='flex flex-col gap-2'>
          <Label>희망 배송일</Label>
          <Input
            type='date'
            value={data.desiredDate ? data.desiredDate.split("T")[0] : ""}
            onChange={(e) =>
              onChange({ ...data, desiredDate: new Date(e.target.value).toISOString() })
            }
          />
        </div>

        {/* 세금계산서 발행 */}
        <div className='flex flex-col gap-2'>
          <Label>세금계산서 발행 여부</Label>
          <div className='flex gap-3'>
            <Button
              type='button'
              theme='purple'
              onClick={() => onChange({ ...data, taxReceipt: true })}
              className={
                data.taxReceipt
                  ? "bg-purple-lighter text-(--color-purple-light) border border-(--color-purple-light) w-full"
                  : "bg-white text-[#939396] border border-[#E0E2E4] w-full"
              }
            >
              예
            </Button>
            <Button
              type='button'
              theme='purple'
              onClick={() => onChange({ ...data, taxReceipt: false, taxId: "", taxEmail: "" })}
              className={
                !data.taxReceipt
                  ? "bg-purple-lighter text-(--color-purple-light) border border-(--color-purple-light) w-full"
                  : "bg-white text-[#939396] border border-[#E0E2E4] w-full"
              }
            >
              아니요
            </Button>
          </div>
        </div>

        {/* 세금계산서 정보 */}
        {data.taxReceipt && (
          <>
            <div className='flex flex-col gap-2'>
              <Label>사업자번호</Label>
              <Input
                value={data.taxId}
                onChange={(e) => onChange({ ...data, taxId: e.target.value })}
                placeholder='사업자번호'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label>세금계산서 발행 이메일</Label>
              <Input
                value={data.taxEmail}
                onChange={(e) => onChange({ ...data, taxEmail: e.target.value })}
                placeholder='이메일'
              />
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
