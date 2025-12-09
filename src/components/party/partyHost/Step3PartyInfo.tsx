/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePartyHostStore } from "@/store/useHostStore";
import { useEffect, useState, useMemo } from "react";
import { loadDaumPostcode } from "@/utils/loadDaumPostcode";
import { generatePartyTitle } from "@/utils/generatePartyTitle";
import { validateStep3 } from "@/utils/validations/partyHostValidation.ts";
import type { Step3Errors } from "@/utils/validations/partyHostValidation.ts";

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

  // 터치 상태
  const [touched, setTouched] = useState({
    openAt: false,
    closeAt: false,
    address: false,
    maxAttendeeCnt: false,
    maxChangeCnt: false,
  });

  // 실시간 유효성 검증
  const errors: Step3Errors = useMemo(() => {
    return validateStep3({ openAt, closeAt, address, maxAttendeeCnt, maxChangeCnt }, touched);
  }, [openAt, closeAt, address, maxAttendeeCnt, maxChangeCnt, touched]);

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  useEffect(() => {
    loadDaumPostcode().catch((err) => console.error(err));
  }, []);

  const handleAddressSelect = (selectedAddress: string) => {
    setAddress(selectedAddress);
    setAddressDetail("");
    setTouched((prev) => ({ ...prev, address: true }));

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
    // 모든 필드 터치 처리
    setTouched({
      openAt: true,
      closeAt: true,
      address: true,
      maxAttendeeCnt: true,
      maxChangeCnt: true,
    });

    const allErrors = validateStep3(
      { openAt, closeAt, address, maxAttendeeCnt, maxChangeCnt },
      { openAt: true, closeAt: true, address: true, maxAttendeeCnt: true, maxChangeCnt: true }
    );

    if (Object.keys(allErrors).length > 0) {
      return;
    }

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
    <div className='flex flex-col h-screen'>
      <header className='bg-white flex-shrink-0 border-b-1 sticky top-0 border-[#E0E2E4] z-10'>
        <h2 className='text-lg font-semibold px-5 pt-6 mb-5'>
          파티 주최를 위한 정보를
          <br />
          입력해 주세요
        </h2>
      </header>

      <main className='flex-1 overflow-y-auto custom-scroll'>
        <div className='h-fit flex-shrink-0 px-5 pt-5 mb-14 space-y-4'>
          <h3 className='font-semibold mb-5'>파티 정보</h3>

          <div className='flex flex-col gap-4'>
            {/* 날짜 */}
            <div className='flex flex-col gap-2'>
              <Label>날짜</Label>
              <div className='flex items-center gap-1'>
                <Input
                  type='date'
                  value={openAt}
                  onChange={(e) => setOpenAt(e.target.value)}
                  onBlur={() => handleBlur("openAt")}
                  className={errors.openAt ? "border-red-500" : ""}
                />
                <span>→</span>
                <Input
                  type='date'
                  value={closeAt}
                  onChange={(e) => setCloseAt(e.target.value)}
                  onBlur={() => handleBlur("closeAt")}
                  className={errors.closeAt ? "border-red-500" : ""}
                />
              </div>
              {(errors.openAt || errors.closeAt) && (
                <span className='text-red-500 text-xs'>{errors.openAt || errors.closeAt}</span>
              )}
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
                  onBlur={() => handleBlur("address")}
                  className={errors.address ? "border-red-500" : ""}
                />
                <Button type='button' theme={"purple"} onClick={openPostcode} className='w-1/3'>
                  검색
                </Button>
              </div>
              {errors.address && <span className='text-red-500 text-xs'>{errors.address}</span>}
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
                  min={1}
                  value={maxAttendeeCnt}
                  onChange={(e) => setMaxAttendeeCnt(e.target.value)}
                  onBlur={() => handleBlur("maxAttendeeCnt")}
                  className={errors.maxAttendeeCnt ? "border-red-500" : ""}
                />
                {errors.maxAttendeeCnt && (
                  <span className='text-red-500 text-xs'>{errors.maxAttendeeCnt}</span>
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <Label>최대 교환 의류 수</Label>
                <Input
                  placeholder='수량'
                  type='number'
                  min={1}
                  value={maxChangeCnt}
                  onChange={(e) => setMaxChangeCnt(e.target.value)}
                  onBlur={() => handleBlur("maxChangeCnt")}
                  className={errors.maxChangeCnt ? "border-red-500" : ""}
                />
                {errors.maxChangeCnt && (
                  <span className='text-red-500 text-xs'>{errors.maxChangeCnt}</span>
                )}
              </div>
            </div>

            {/* 소개 */}
            <div className='flex flex-col gap-2'>
              <Label>소개</Label>
              <textarea
                className='w-full rounded-lg border border-[#E4E4E4] bg-white px-4 py-4 text-base font-medium outline-none resize-none h-fit mb-5'
                placeholder='파티 소개'
                value={partyDescription}
                onChange={(e) => setPartyDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
      </main>

      <div className='flex flex-shrink-0 sticky bottom-0 bg-white px-5 pt-4 pb-8 gap-2'>
        <Button theme={"purple"} variant={"muted"} onClick={onBack} className='w-1/3'>
          이전
        </Button>
        <Button theme={"purple"} onClick={handleNext} className='w-2/3'>
          다음
        </Button>
      </div>
    </div>
  );
}
