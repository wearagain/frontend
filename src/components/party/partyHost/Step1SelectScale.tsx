import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Users, User } from "lucide-react";
import { usePartyHostStore } from "@/store/useHostStore";

interface Step1Props {
  onNext: () => void;
}

export default function Step1SelectScale({ onNext }: Step1Props) {
  const { setField, isGroup } = usePartyHostStore();
  const [selected, setSelected] = useState<"단체" | "개인" | null>(null);

  useEffect(() => {
    if (isGroup) setSelected("단체");
    else setSelected("개인");
  }, [isGroup]);

  const handleSelect = (type: "단체" | "개인") => {
    setSelected(type);
    setField("isGroup", type === "단체");
  };

  const handleNext = () => {
    if (selected) {
      setField("isGroup", selected === "단체");
      onNext();
    }
  };

  return (
    <div>
      <h2 className='mb-4'>주최 규모를 선택해 주세요</h2>

      <div className='grid grid-cols-2 gap-4 mb-6'>
        {/* 단체 선택 */}
        <div
          className={`flex flex-col items-center justify-center border rounded-2xl py-8 cursor-pointer transition-colors ${
            selected === "단체" ? "border-gray-700 bg-gray-50" : "border-gray-200"
          }`}
          onClick={() => handleSelect("단체")}
        >
          <Users
            className={`w-10 h-10 mb-2 ${selected === "단체" ? "text-gray-700" : "text-gray-400"}`}
          />
          <div className='font-medium'>단체</div>
          <p className='text-xs text-gray-500 mt-1'>기업 또는 지역 단체</p>
        </div>

        {/* 개인 선택 */}
        <div
          className={`flex flex-col items-center justify-center border rounded-2xl py-8 cursor-pointer transition-colors ${
            selected === "개인" ? "border-gray-700 bg-gray-50" : "border-gray-200"
          }`}
          onClick={() => handleSelect("개인")}
        >
          <User
            className={`w-10 h-10 mb-2 ${selected === "개인" ? "text-gray-700" : "text-gray-400"}`}
          />
          <div className='font-medium'>개인</div>
          <p className='text-xs text-gray-500 mt-1'>20인 이하 소규모</p>
        </div>
      </div>

      <section className='mb-6'>
        <p className='font-semibold mb-2'>툴킷 구성</p>
        <ul className='text-sm text-gray-600 list-disc ml-5 space-y-1'>
          <li>GoodBye&Hello 태그</li>
          <li>포스터</li>
          <li>업사이클링 가방</li>
          <li>파티 관련 자료 (pdf 제공)</li>
        </ul>
      </section>

      <div className='fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto w-full flex gap-2 bg-white border-t border-gray-100 px-4 py-3'>
        <Button disabled={!selected} onClick={handleNext} className='w-full'>
          주최 신청하기
        </Button>
      </div>
    </div>
  );
}
