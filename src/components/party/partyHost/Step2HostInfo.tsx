import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePartyHostStore } from "@/store/useHostStore";
import { useState, useMemo } from "react";
import { validateStep2 } from "@/utils/validations/partyHostValidation.ts";
import type { Step2Errors } from "@/utils/validations/partyHostValidation.ts";

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

  // 터치 상태 (blur 시 true로 변경)
  const [touched, setTouched] = useState({
    name: false,
    groupName: false,
    phone: false,
    email: false,
  });

  const isGroup = store.isGroup;
  const groupNameLabel = isGroup ? "소속" : "파티명";

  // 실시간 유효성 검증
  const errors: Step2Errors = useMemo(() => {
    return validateStep2({ isGroup, name, groupName, phone, email }, touched);
  }, [isGroup, name, groupName, phone, email, touched]);

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleNext = () => {
    // 모든 필드 터치 처리
    setTouched({ name: true, groupName: true, phone: true, email: true });

    const allErrors = validateStep2(
      { isGroup, name, groupName, phone, email },
      { name: true, groupName: true, phone: true, email: true }
    );

    if (Object.keys(allErrors).length > 0) {
      return;
    }

    store.setField("name", name);
    store.setField("groupName", groupName);
    store.setField("phone", phone);
    store.setField("email", email);
    onNext();
  };

  return (
    <div className='flex flex-col'>
      <header className='bg-white flex-shrink-0 border-b-1 sticky top-0 border-[#E0E2E4] z-10'>
        <h2 className='text-lg font-semibold px-5 pt-6 mb-5'>
          파티 주최를 위한 정보를
          <br />
          입력해 주세요
        </h2>
      </header>
      <main className='flex-1 overflow-y-auto custom-scroll'>
        <div className='h-full flex-shrink-0 px-5 pt-5 mb-14 space-y-4'>
          <h3 className='font-semibold mb-5'>파티 정보</h3>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='name'>주최자</Label>
            <Input
              id='name'
              placeholder='이름'
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <span className='text-red-500 text-xs'>{errors.name}</span>}
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='org'>{groupNameLabel}</Label>
            <Input
              id='org'
              placeholder={groupNameLabel}
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              onBlur={() => handleBlur("groupName")}
              className={errors.groupName ? "border-red-500" : ""}
            />
            {errors.groupName && <span className='text-red-500 text-xs'>{errors.groupName}</span>}
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='phone'>전화번호</Label>
            <Input
              id='phone'
              placeholder='전화번호'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => handleBlur("phone")}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <span className='text-red-500 text-xs'>{errors.phone}</span>}
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='email'>이메일</Label>
            <Input
              id='email'
              placeholder='이메일'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <span className='text-red-500 text-xs'>{errors.email}</span>}
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
