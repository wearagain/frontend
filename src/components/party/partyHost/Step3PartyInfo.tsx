/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePartyHostStore } from "@/store/useHostStore";
import { useEffect, useState } from "react";
import { loadDaumPostcode } from "@/utils/loadDaumPostcode";
import { generatePartyTitle } from "@/utils/generatePartyTitle";

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
}

declare global {
  interface Window {
    daum: any;
    kakao: any;
  }
}

export default function Step3PartyInfo({ onNext, onBack }: Step3Props) {
  const store = usePartyHostStore();

  const [openAt, setOpenAt] = useState(store.openAt.split("T")[0]);
  const [closeAt, setCloseAt] = useState(store.closeAt.split("T")[0]);
  const [openTime, setOpenTime] = useState(store.openTime || "");
  const [closeTime, setCloseTime] = useState(store.closeTime || "");
  const [address, setAddress] = useState(store.address);
  const [addressDetail, setAddressDetail] = useState(store.addressDetail);
  const [maxAttendeeCnt, setMaxAttendeeCnt] = useState(
    store.maxAttendeeCnt ? String(store.maxAttendeeCnt) : ""
  );
  const [maxChangeCnt, setMaxChangeCnt] = useState(
    store.maxChangeCnt ? String(store.maxChangeCnt) : ""
  );
  const [, setPartyTitle] = useState(store.partyTitle);
  const [partyDescription, setPartyDescription] = useState(store.partyDescription);

  useEffect(() => {
    loadDaumPostcode().catch((err) => console.error(err));
  }, []);

  const handleAddressSelect = (selectedAddress: string) => {
    setAddress(selectedAddress);
    setAddressDetail("");

    if (window.kakao?.maps) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(selectedAddress, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const x = parseFloat(result[0].x);
          const y = parseFloat(result[0].y);
          store.setField("xmap", x);
          store.setField("ymap", y);
          console.log("좌표 저장 완료:", { x, y });
        } else {
          console.warn("주소 좌표 변환 실패:", status);
        }
      });
    }
  };

  const openPostcode = () => {
    if (!window.daum?.Postcode) {
      alert("주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data: any) => {
        handleAddressSelect(data.address);
      },
    }).open();
  };

  const handleNext = () => {
    const generatedTitle = generatePartyTitle(address, store.groupName);
    setPartyTitle(generatedTitle);

    store.setField("partyTitle", generatedTitle);
    store.setField("openAt", new Date(openAt).toISOString());
    store.setField("closeAt", new Date(closeAt).toISOString());
    store.setField("openTime", openTime);
    store.setField("closeTime", closeTime);
    store.setField("address", address);
    store.setField("addressDetail", addressDetail);
    store.setField("maxAttendeeCnt", Number(maxAttendeeCnt || 0));
    store.setField("maxChangeCnt", Number(maxChangeCnt || 0));
    store.setField("partyDescription", partyDescription);

    onNext();
  };

  return (
    <div>
      <h2 className='mb-4'>파티 주최를 위한 정보를 입력해 주세요</h2>

      <div className='space-y-6 mb-6'>
        <div className='p-4 bg-white'>
          <h3 className='font-semibold mb-3'>파티 정보</h3>

          <div className='flex flex-col gap-4'>
            {/* 날짜 */}
            <div className='flex flex-col gap-2'>
              <Label>날짜</Label>
              <div className='flex items-center gap-2'>
                <Input type='date' value={openAt} onChange={(e) => setOpenAt(e.target.value)} />
                <span>→</span>
                <Input type='date' value={closeAt} onChange={(e) => setCloseAt(e.target.value)} />
              </div>
            </div>

            {/* 시간 */}
            <div className='flex flex-col gap-2'>
              <Label>시간</Label>
              <div className='flex items-center gap-2'>
                <Input type='time' value={openTime} onChange={(e) => setOpenTime(e.target.value)} />
                <span>→</span>
                <Input
                  type='time'
                  value={closeTime}
                  onChange={(e) => setCloseTime(e.target.value)}
                />
              </div>
            </div>

            {/* 장소 */}
            <div className='flex flex-col gap-2'>
              <Label>장소</Label>
              <div className='flex gap-2'>
                <Input
                  placeholder='주소'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Button
                  type='button'
                  onClick={openPostcode}
                  className='bg-(--color-purple-light) hover:opacity-90 text-sm w-24 h-[42px] whitespace-nowrap'
                >
                  검색
                </Button>
              </div>
              <Input
                placeholder='상세 주소'
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
              />
            </div>

            {/* 인원/의류 수 */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label>최대 참석자 수</Label>
                <Input
                  placeholder='인원'
                  type='number'
                  min={0}
                  value={maxAttendeeCnt}
                  onChange={(e) => setMaxAttendeeCnt(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label>최대 교환 의류 수</Label>
                <Input
                  placeholder='수량'
                  type='number'
                  min={0}
                  value={maxChangeCnt}
                  onChange={(e) => setMaxChangeCnt(e.target.value)}
                />
              </div>
            </div>

            {/* 소개 */}
            <div className='flex flex-col gap-2'>
              <Label>소개</Label>
              <textarea
                className='w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none resize-none min-h-[100px]'
                placeholder='파티 소개'
                value={partyDescription}
                onChange={(e) => setPartyDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto w-full flex gap-2 bg-white border-t border-gray-100 px-4 py-3'>
        <Button onClick={onBack} className='w-1/2 bg-gray-300 text-gray-700'>
          이전
        </Button>
        <Button onClick={handleNext} className='w-1/2'>
          다음
        </Button>
      </div>
    </div>
  );
}
