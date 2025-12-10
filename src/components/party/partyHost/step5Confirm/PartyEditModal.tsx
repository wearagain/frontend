import { CircleX } from "lucide-react";
import { useEffect } from "react";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { loadDaumPostcode } from "@/utils/loadDaumPostcode";

interface PartyEditData {
  openAt: string;
  closeAt: string;
  openTime: string;
  closeTime: string;
  address: string;
  addressDetail: string;
  maxAttendeeCnt: number;
  maxChangeCnt: number;
  partyDescription: string;
}

interface PartyEditModalProps {
  data: PartyEditData;
  onChange: (data: PartyEditData) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export default function PartyEditModal({
  data,
  onChange,
  onClose,
  onConfirm,
}: PartyEditModalProps) {
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
        onChange({ ...data, address: result.address, addressDetail: "" });
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
        {/* 날짜 */}
        <div className='flex flex-col gap-2'>
          <Label>시작일</Label>
          <Input
            type='date'
            value={data.openAt ? data.openAt.split("T")[0] : ""}
            onChange={(e) => onChange({ ...data, openAt: new Date(e.target.value).toISOString() })}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>종료일</Label>
          <Input
            type='date'
            value={data.closeAt ? data.closeAt.split("T")[0] : ""}
            onChange={(e) => onChange({ ...data, closeAt: new Date(e.target.value).toISOString() })}
          />
        </div>

        {/* 시간 */}
        <div className='flex flex-col gap-2'>
          <Label>시작 시간</Label>
          <Input
            type='time'
            value={data.openTime}
            onChange={(e) => onChange({ ...data, openTime: e.target.value })}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>종료 시간</Label>
          <Input
            type='time'
            value={data.closeTime}
            onChange={(e) => onChange({ ...data, closeTime: e.target.value })}
          />
        </div>

        {/* 장소 */}
        <div className='flex flex-col gap-2'>
          <Label>장소</Label>
          <div className='flex gap-2'>
            <Input
              placeholder='주소'
              value={data.address}
              onChange={(e) => onChange({ ...data, address: e.target.value })}
              className='flex-1'
            />
            <Button type='button' theme='purple' onClick={openPostcode} className='shrink-0'>
              검색
            </Button>
          </div>
          <Input
            placeholder='상세 주소'
            value={data.addressDetail}
            onChange={(e) => onChange({ ...data, addressDetail: e.target.value })}
          />
        </div>

        {/* 인원/의류 수 */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2'>
            <Label>최대 참석자 수</Label>
            <Input
              type='number'
              value={data.maxAttendeeCnt}
              onChange={(e) => onChange({ ...data, maxAttendeeCnt: Number(e.target.value) })}
              placeholder='인원'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label>최대 의류 수량</Label>
            <Input
              type='number'
              value={data.maxChangeCnt}
              onChange={(e) => onChange({ ...data, maxChangeCnt: Number(e.target.value) })}
              placeholder='수량'
            />
          </div>
        </div>

        {/* 소개 */}
        <div className='flex flex-col gap-2'>
          <Label>소개</Label>
          <div className='relative w-full'>
            <textarea
              className='w-full rounded-lg border border-[#E4E4E4] focus-visible:border-[#222222] bg-white px-4 py-4 pr-10 text-base font-medium outline-none resize-none h-24'
              placeholder='파티 소개'
              value={data.partyDescription}
              onChange={(e) => onChange({ ...data, partyDescription: e.target.value })}
            />
            {data.partyDescription && (
              <button
                type='button'
                aria-label='소개 입력값 삭제'
                onClick={() => onChange({ ...data, partyDescription: "" })}
                className='absolute right-3 top-3 text-white'
              >
                <CircleX size={18} fill='#939396' />
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
