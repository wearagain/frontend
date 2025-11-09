import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePartyHostStore } from "@/store/useHostStore";
import { useState } from "react";

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Step2HostInfo({ onNext, onBack }: Step2Props) {
  const store = usePartyHostStore();
  const [name, setName] = useState(store.name || "");
  const [groupName, setGroupName] = useState(store.groupName || "");
  const [phone, setPhone] = useState(store.phone || "");
  const [email, setEmail] = useState(store.email || "");

  const isGroup = store.isGroup;
  const groupNameLabel = isGroup ? "소속" : "파티명";

  const handleNext = () => {
    store.setField("name", name);
    store.setField("groupName", groupName);
    store.setField("phone", phone);
    store.setField("email", email);
    onNext();
  };

  return (
    <div>
      <h2 className='text-lg font-semibold mb-4'>파티 주최를 위한 정보를 입력해 주세요</h2>

      <div className='space-y-4 mb-6'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='name'>주최자</Label>
          <Input
            id='name'
            placeholder='이름'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='org'>{groupNameLabel}</Label>
          <Input
            id='org'
            placeholder={groupNameLabel}
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='phone'>전화번호</Label>
          <Input
            id='phone'
            placeholder='010-0000-0000'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='email'>이메일</Label>
          <Input
            id='email'
            placeholder='example@wearagain.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
