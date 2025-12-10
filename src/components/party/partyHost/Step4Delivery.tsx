/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePartyHostStore } from "@/store/useHostStore";
import { loadDaumPostcode } from "@/utils/loadDaumPostcode";
import { validateStep4 } from "@/utils/validations/partyHostValidation.ts";
import type { Step4Errors } from "@/utils/validations/partyHostValidation.ts";

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
}

declare global {
  interface Window {
    daum: any;
  }
}

export default function Step4Delivery({ onNext, onBack }: Step4Props) {
  const store = usePartyHostStore();

  const [zoneCode, setZoneCode] = useState("");
  const [address, setAddress] = useState(store.deliverAddress);
  const [detail, setDetail] = useState(store.deliverAddressDetail);
  const [desiredDate, setDesiredDate] = useState(store.desiredDate.split("T")[0]);
  const [taxReceipt, setTaxReceipt] = useState(store.taxReceipt);
  const [taxId, setTaxId] = useState(store.taxId);
  const [taxEmail, setTaxEmail] = useState(store.taxEmail);

  // 터치 상태
  const [touched, setTouched] = useState({
    address: false,
    desiredDate: false,
    taxId: false,
    taxEmail: false,
  });

  // 실시간 유효성 검증
  const errors: Step4Errors = useMemo(() => {
    return validateStep4({ address, desiredDate, taxReceipt, taxId, taxEmail }, touched);
  }, [address, desiredDate, taxReceipt, taxId, taxEmail, touched]);

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  useEffect(() => {
    loadDaumPostcode().catch((err) => console.error(err));
  }, []);

  const openPostcode = () => {
    if (!window.daum?.Postcode) {
      alert("주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data: any) => {
        setZoneCode(data.zonecode);
        setAddress(data.address);
        setDetail("");
        setTouched((prev) => ({ ...prev, address: true }));
      },
    }).open();
  };

  const handleNext = () => {
    // 모든 필드 터치 처리
    setTouched({
      address: true,
      desiredDate: true,
      taxId: true,
      taxEmail: true,
    });

    const allErrors = validateStep4(
      { address, desiredDate, taxReceipt, taxId, taxEmail },
      { address: true, desiredDate: true, taxId: true, taxEmail: true }
    );

    if (Object.keys(allErrors).length > 0) {
      return;
    }

    store.setField("deliverAddress", address);
    store.setField("deliverAddressDetail", detail);
    store.setField("desiredDate", new Date(desiredDate).toISOString());
    store.setField("taxReceipt", taxReceipt);
    store.setField("taxId", taxReceipt ? taxId : "");
    store.setField("taxEmail", taxReceipt ? taxEmail : "");
    onNext();
  };

  return (
    <div className='flex flex-col h-screen'>
      <header className='bg-white flex-shrink-0 border-b-1 sticky top-0 border-[#E0E2E4] z-10'>
        <h2 className='text-lg font-semibold px-5 pt-6 mb-5'>
          배송 및 결제 정보를
          <br />
          입력해 주세요
        </h2>
      </header>

      <main className='flex-1 overflow-y-auto custom-scroll'>
        <div className='h-fit flex-shrink-0 px-5 pt-5 mb-14 space-y-4'>
          <h3 className='font-semibold mb-5'>배송 및 결제</h3>
          {/* 주소 */}
          <div className='flex flex-col gap-2'>
            <Label>주소</Label>
            <div className='flex gap-2'>
              <Input placeholder='우편번호' value={zoneCode} readOnly className='bg-gray-50' />
              <Button type='button' theme={"purple"} onClick={openPostcode} className='w-1/3'>
                검색
              </Button>
            </div>
            <Input
              placeholder='기본 주소'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onBlur={() => handleBlur("address")}
              className={`mt-2 ${errors.address ? "border-red-500" : ""}`}
            />
            {errors.address && <span className='text-red-500 text-xs'>{errors.address}</span>}
            <Input
              placeholder='상세 주소'
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className='mt-2'
            />
          </div>

          {/* 희망 배송일 */}
          <div className='flex flex-col gap-2 mt-4'>
            <Label>희망 배송 날짜</Label>
            <Input
              type='date'
              value={desiredDate}
              onChange={(e) => setDesiredDate(e.target.value)}
              onBlur={() => handleBlur("desiredDate")}
              className={errors.desiredDate ? "border-red-500" : ""}
            />
            {errors.desiredDate && (
              <span className='text-red-500 text-xs'>{errors.desiredDate}</span>
            )}
          </div>

          {/* 세금계산서 */}
          <div className='flex flex-col gap-2 mt-4 pb-4'>
            <Label>세금계산서 발행 여부</Label>
            <div className='flex gap-3'>
              <Button
                type='button'
                theme='purple'
                onClick={() => setTaxReceipt(true)}
                className={
                  taxReceipt
                    ? "bg-[#F2EAF7] text-(--color-purple-light) border border-(--color-purple-light) w-full"
                    : "bg-white text-[#939396] border border-[#E0E2E4] w-full mb-4"
                }
              >
                예
              </Button>
              <Button
                type='button'
                theme='purple'
                onClick={() => {
                  setTaxReceipt(false);
                  setTaxId("");
                  setTaxEmail("");
                }}
                className={
                  !taxReceipt
                    ? "bg-[#F2EAF7] text-(--color-purple-light) border border-(--color-purple-light) w-full mb-4"
                    : "bg-white text-[#939396] border border-[#E0E2E4] w-full"
                }
              >
                아니요
              </Button>
            </div>
          </div>

          {/* 세금계산서 정보 */}
          {taxReceipt && (
            <>
              <div className='flex flex-col gap-2'>
                <Label>사업자번호</Label>
                <Input
                  placeholder='사업자번호'
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  onBlur={() => handleBlur("taxId")}
                  className={errors.taxId ? "border-red-500" : ""}
                />
                {errors.taxId && <span className='text-red-500 text-xs'>{errors.taxId}</span>}
              </div>
              <div className='flex flex-col gap-2 pb-5'>
                <Label>세금계산서 발행 이메일</Label>
                <Input
                  placeholder='이메일'
                  value={taxEmail}
                  onChange={(e) => setTaxEmail(e.target.value)}
                  onBlur={() => handleBlur("taxEmail")}
                  className={errors.taxEmail ? "border-red-500" : ""}
                />
                {errors.taxEmail && <span className='text-red-500 text-xs'>{errors.taxEmail}</span>}
              </div>
            </>
          )}
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
