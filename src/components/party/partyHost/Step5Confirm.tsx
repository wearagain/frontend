import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { usePostParty } from "@/hooks/party/usePostPartyHost";
import { usePartyHostStore } from "@/store/useHostStore";
import { formatDate } from "@/utils/formatDate";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Step5Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Step5Confirm({ onNext, onBack }: Step5Props) {
  const store = usePartyHostStore();
  const { mutate: postParty, isPending } = usePostParty();

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    notice: false,
  });
  const [isExpanded, setIsExpanded] = useState(true);

  const allAgreed = Object.values(agreements).every(Boolean);

  const toggleAgreement = (key: keyof typeof agreements) =>
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));

  const openDate = formatDate(store.openAt);
  const closeDate = formatDate(store.closeAt);
  const desiredDate = formatDate(store.desiredDate);

  const handleSubmit = () => {
    if (!allAgreed) {
      alert("모든 필수 약관에 동의해야 신청이 가능합니다.");
      return;
    }

    postParty(undefined, {
      onSuccess: () => {
        alert("파티 주최 신청이 완료되었습니다!");
        onNext();
      },
    });
  };

  return (
    <div className='pb-[220px]'>
      <h2 className='mb-4'>마지막으로 정보 확인 후 신청을 완료해 주세요</h2>

      <div className='space-y-6 mb-6'>
        {/* 주최자 정보 */}
        <div className='bg-white border-t border-gray-200 p-4'>
          <div className='flex justify-between items-center mb-3'>
            <h3 className='font-semibold text-gray-900'>주최자 정보</h3>
            <button className='text-sm text-gray-500 hover:text-gray-700'>수정</button>
          </div>

          <div className='flex text-sm'>
            <div className='flex flex-col text-gray-600 gap-1 w-[100px] shrink-0'>
              <span>주최자</span>
              <span>소속</span>
              <span>연락처</span>
              <span>이메일</span>
            </div>

            <div className='flex flex-col gap-1 text-gray-900'>
              <span>{store.name || "미입력"}</span>
              <span>{store.groupName || "미입력"}</span>
              <span>{store.phone || "미입력"}</span>
              <span>{store.email || "미입력"}</span>
            </div>
          </div>
        </div>

        {/* 파티 정보 */}
        <div className='bg-white border-t border-gray-200 p-4'>
          <div className='flex justify-between items-center mb-3'>
            <h3 className='font-semibold text-gray-900'>파티 정보</h3>
            <button className='text-sm text-gray-500 hover:text-gray-700'>수정</button>
          </div>

          <div className='flex text-sm'>
            <div className='flex flex-col text-gray-600 gap-1 w-[110px] shrink-0'>
              <span>날짜</span>
              <span>시간</span>
              <span>장소</span>
              <span>최대 참석자 수</span>
              <span>최대 의류 수량</span>
              <span>소개</span>
            </div>
            <div className='flex flex-col gap-1 text-gray-900'>
              <span>
                {openDate} ~ {closeDate}
              </span>
              <span>
                {store.openTime || "미입력"} ~ {store.closeTime || "미입력"}
              </span>
              <span className='whitespace-pre-line max-w-[230px]'>
                {store.address || "주소 미입력"}
                {store.addressDetail && ` ${store.addressDetail}`}
              </span>
              <span>{store.maxAttendeeCnt || 0}명</span>
              <span>{store.maxChangeCnt || 0}벌</span>
              <span className='whitespace-pre-line max-w-[230px]'>
                {store.partyDescription || "파티 소개가 없습니다."}
              </span>
            </div>
          </div>
        </div>

        {/* 배송 및 결제 */}
        <div className='bg-white border-t border-gray-200 p-4'>
          <div className='flex justify-between items-center mb-3'>
            <h3 className='font-semibold text-gray-900'>배송 및 결제</h3>
            <button className='text-sm text-gray-500 hover:text-gray-700'>수정</button>
          </div>

          <div className='flex text-sm'>
            <div className='flex flex-col text-gray-600 gap-1 w-[120px] shrink-0'>
              <span>주소</span>
              <span>희망 배송일</span>
              <span>세금계산서 발행</span>
              {store.taxReceipt && <span>발행 이메일</span>}
            </div>
            <div className='flex flex-col gap-1 text-gray-900'>
              <span className='whitespace-pre-line max-w-[230px]'>
                {store.deliverAddress || "미입력"}
                {store.deliverAddressDetail && ` ${store.deliverAddressDetail}`}
              </span>
              <span>{desiredDate || "미입력"}</span>
              <span>{store.taxReceipt ? "예" : "아니오"}</span>
              {store.taxReceipt && <span>{store.taxEmail || "미입력"}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 고정 영역 */}
      <div className='fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white px-4 pb-4 pt-3 border-t border-gray-200'>
        <div className='border-b border-gray-100 pb-3 mb-3'>
          <div
            className='flex justify-between items-center cursor-pointer select-none'
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <h4 className='text-sm font-medium'>약관 동의</h4>
            {isExpanded ? (
              <ChevronDown className='w-4 h-4 text-gray-500' />
            ) : (
              <ChevronUp className='w-4 h-4 text-gray-500' />
            )}
          </div>

          {isExpanded && (
            <div className='mt-2'>
              <div className='flex items-center gap-2 mb-3 pb-3 border-b border-gray-100'>
                <Checkbox
                  id='checkAll'
                  checked={allAgreed}
                  onCheckedChange={() => {
                    const newValue = !allAgreed;
                    setAgreements({
                      terms: newValue,
                      privacy: newValue,
                      notice: newValue,
                    });
                  }}
                />
                <label htmlFor='checkAll' className='text-sm font-medium'>
                  아래 내용에 전체 동의합니다.
                </label>
              </div>

              <div className='flex items-center gap-2 mb-1'>
                <Checkbox
                  id='check1'
                  checked={agreements.terms}
                  onCheckedChange={() => toggleAgreement("terms")}
                />
                <label htmlFor='check1' className='text-sm'>
                  [필수] 서비스 이용약관 동의
                </label>
              </div>

              <div className='flex items-center gap-2 mb-1'>
                <Checkbox
                  id='check2'
                  checked={agreements.privacy}
                  onCheckedChange={() => toggleAgreement("privacy")}
                />
                <label htmlFor='check2' className='text-sm'>
                  [필수] 개인정보 수집 및 이용 동의
                </label>
              </div>

              <div className='flex items-center gap-2 mb-1'>
                <Checkbox
                  id='check3'
                  checked={agreements.notice}
                  onCheckedChange={() => toggleAgreement("notice")}
                />
                <label htmlFor='check3' className='text-sm'>
                  [필수] 주최 주의사항 동의
                </label>
              </div>
            </div>
          )}
        </div>

        <div className='flex gap-2'>
          <Button onClick={onBack} className='w-1/2 bg-gray-300 text-gray-700'>
            이전
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!allAgreed || isPending}
            className={`w-1/2 ${
              allAgreed
                ? "bg-(--color-purple-light) hover:opacity-90"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isPending ? "신청 중..." : "신청하기"}
          </Button>
        </div>
      </div>
    </div>
  );
}
