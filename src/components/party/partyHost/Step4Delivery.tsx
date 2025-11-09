/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePartyHostStore } from "@/store/useHostStore";
import { loadDaumPostcode } from "@/utils/loadDaumPostcode";

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
  const [taxEmail, setTaxEmail] = useState(store.taxEmail);

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
      },
    }).open();
  };

  const handleNext = () => {
    store.setField("deliverAddress", address);
    store.setField("deliverAddressDetail", detail);
    store.setField("desiredDate", new Date(desiredDate).toISOString());
    store.setField("taxReceipt", taxReceipt);
    store.setField("taxEmail", taxReceipt ? taxEmail : ""); // ✅ "아니오"일 땐 비움
    onNext();
  };

  return (
    <div>
      <h2 className='text-lg font-semibold mb-4'>배송 및 결제 정보를 입력해 주세요</h2>

      <div className='space-y-6 mb-6'>
        <div className='rounded-xl p-4 bg-white'>
          {/* 주소 */}
          <div className='flex flex-col gap-2'>
            <Label>주소</Label>
            <div className='flex gap-2'>
              <Input placeholder='우편번호' value={zoneCode} readOnly className='bg-gray-50' />
              <Button
                type='button'
                onClick={openPostcode}
                className='bg-(--color-purple-light) hover:opacity-90 text-sm w-24'
              >
                검색
              </Button>
            </div>
            <Input
              placeholder='기본 주소'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='mt-2'
            />
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
            />
          </div>

          {/* 세금계산서 */}
          <div className='flex flex-col gap-2 mt-4'>
            <Label>세금계산서 발행 여부</Label>
            <div className='flex gap-3'>
              <Button
                type='button'
                onClick={() => setTaxReceipt(true)}
                className={
                  taxReceipt
                    ? "bg-purple-100 text-gray-900 border border-(--color-purple-light) rounded-xl w-24"
                    : "bg-white text-gray-500 border border-gray-200 rounded-xl w-24"
                }
              >
                예
              </Button>
              <Button
                type='button'
                onClick={() => {
                  setTaxReceipt(false);
                  setTaxEmail(""); // ✅ 선택 시 이메일 즉시 초기화
                }}
                className={
                  !taxReceipt
                    ? "bg-purple-100 text-gray-900 border border-(--color-purple-light) rounded-xl w-24"
                    : "bg-white text-gray-500 border border-gray-200 rounded-xl w-24"
                }
              >
                아니오
              </Button>
            </div>
          </div>

          {/* 세금계산서 이메일 (예일 때만 표시) */}
          {taxReceipt && (
            <div className='flex flex-col gap-2 mt-4'>
              <Label>세금계산서 발행 이메일</Label>
              <Input
                placeholder='example@wearagain.com'
                value={taxEmail}
                onChange={(e) => setTaxEmail(e.target.value)}
              />
            </div>
          )}
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
