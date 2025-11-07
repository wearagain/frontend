import { useState, useMemo } from "react";
import { useApplyStore } from "@/store/useApplyStore";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import ConfirmModal from "@/components/apply/ConfirmModal";
import TermsItem from "../signup/TermsItem";
import AlertItem from "./AlertItem";
import AppliedItem from "./AppliedItem";

interface Props {
  onFinalSubmit: () => void;
}

const formatDateTime = (date: Date | null | undefined, time: string | null): string => {
  if (date && time && date instanceof Date && isFinite(date.getTime())) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const dayOfWeek = date.toLocaleDateString("ko-KR", { weekday: "short" });

    return `${year}년 ${month}월 ${day}일(${dayOfWeek}) ${time}`;
  }
  return "날짜 및 시간 정보 없음";
};

export default function ApplyInfoCheckForm({ onFinalSubmit }: Props) {
  const { selectedItems, selectedDate, selectedTime, itemsInfo } = useApplyStore();

  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [checked, setChecked] = useState({
    all: false,
    service: false,
    privacy: false,
    thirdParty: false,
  });

  const totalItemsCount = selectedItems.reduce((sum: number, item) => sum + item.count, 0);

  const handleToggle = (key: keyof typeof checked) => {
    if (key === "all") {
      const newState = !checked.all;
      setChecked({
        all: newState,
        service: newState,
        privacy: newState,
        thirdParty: newState,
      });
    } else {
      const updated = { ...checked, [key]: !checked[key] };
      const allChecked = updated.service && updated.privacy && updated.thirdParty;
      setChecked({ ...updated, all: allChecked });
    }
  };

  const allItems = useMemo(() => {
    return selectedItems.flatMap((item) =>
      Array.from({ length: item.count }, (_, index) => ({
        ...item,
        itemId: `${item.code}-${index}`,
        itemName: `${item.subCategory} ${index + 1}`,
      }))
    );
  }, [selectedItems]);

  const isRequiredChecked = checked.service && checked.privacy && checked.thirdParty;

  const handleFinalCheck = () => {
    if (isRequiredChecked) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmSubmit = () => {
    setShowConfirmModal(false);
    onFinalSubmit();
  };

  return (
    <div className='flex flex-col min-h-full mb-32'>
      <div className='bg-white flex-shrink-0 sticky top-0 z-100'>
        <h2 className='text-lg font-semibold px-5 pt-6 mb-5'>
          마지막으로 정보 확인 후
          <br />
          신청을 완료해 주세요
        </h2>
      </div>

      <div className='flex-1 overflow-y-auto'>
        {/* 신청 확인 정보 */}
        <div className='pb-5 px-5'>
          <h3 className='font-bold mt-5 mb-4'>신청 확인 정보</h3>
          <p className='text-gray-700 font-semibold mb-5'>
            {formatDateTime(selectedDate, selectedTime)}
          </p>
          <AlertItem message='시간 상관 없이 방문 가능합니다' />
        </div>
        <div className='divider'></div>

        {/* 품목 정보 */}
        <div className='pb-5 px-5'>
          <div
            className='flex items-center justify-between cursor-pointer'
            onClick={() => setIsDetailsOpen((prev) => !prev)}
          >
            <h3 className='font-bold'>신청 품목 정보 {totalItemsCount}</h3>
            {isDetailsOpen ? (
              <ChevronUp size={20} className='text-gray-500' />
            ) : (
              <ChevronDown size={20} className='text-gray-500' />
            )}
          </div>

          {isDetailsOpen && (
            <div className='mt-4 pl-3'>
              {allItems.map((item) => (
                <AppliedItem
                  key={item.itemId}
                  item={item}
                  itemInfo={itemsInfo.get(item.itemId) || { images: [], description: "" }}
                />
              ))}
            </div>
          )}
        </div>

        {/* 유의사항 */}
        <div className='pt-5 px-5 pb-38 bg-gray-100'>
          <h3 className='font-bold text-lg mb-3'>유의사항</h3>
          <ul className='text-sm text-gray-600 space-y-2 list-disc list-inside'>
            <li>
              가지고 나올 아이템은 친구에게 팔아도 괜찮을 만큼 관리 상태가 양호해야 합니다.
              <ul className='text-sm text-gray-600 space-y-2 list-disc list-inside pl-6'>
                <li>구멍이 난 곳이나 변색한 곳, 실밥이 뜯어진 곳은 없는지 확인하세요.</li>
                <li>깨끗하게 세탁해서 가져오세요.</li>
              </ul>
            </li>
            <li>적어도 1개 이상의 아이템을 갖고 나와 교환이 가능합니다.</li>
            <li>고른 아이템을 담아갈 수 있는 가방을 준비해 오세요.</li>
          </ul>
        </div>
      </div>

      {/* 약관 동의 */}
      <div className='fixed bottom-0 left-0 right-0 bg-white px-5 pt-5 pb-14 drop-shadow-lg'>
        <div className='mb-4'>
          <div className='flex flex-col gap-4'>
            <TermsItem
              label='아래 내용에 전체 동의합니다'
              checked={checked.all}
              onToggle={() => handleToggle("all")}
            />

            <div className='flex flex-col gap-3'>
              <TermsItem
                label='서비스 이용약관 동의'
                required
                checked={checked.service}
                onToggle={() => handleToggle("service")}
                showLink
              />
              <TermsItem
                label='개인정보 수집 및 이용 동의'
                required
                checked={checked.privacy}
                onToggle={() => handleToggle("privacy")}
                showLink
              />
              <TermsItem
                label='개인정보 제3자 제공 동의'
                required
                checked={checked.thirdParty}
                onToggle={() => handleToggle("thirdParty")}
                showLink
              />
            </div>
          </div>
        </div>

        {/* 신청 버튼 */}
        <Button
          onClick={handleFinalCheck}
          disabled={!isRequiredChecked}
          className='w-full h-12 text-base font-semibold'
        >
          신청하기
        </Button>
      </div>

      {/* 확인 모달 */}
      {showConfirmModal && (
        <ConfirmModal
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmSubmit}
          partyName='파티명'
          partyDate={formatDateTime(selectedDate, selectedTime)}
          totalCount={totalItemsCount}
        />
      )}
    </div>
  );
}
