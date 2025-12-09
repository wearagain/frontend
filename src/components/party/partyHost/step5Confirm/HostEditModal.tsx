import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";

interface HostEditData {
  name: string;
  groupName: string;
  phone: string;
  email: string;
}

interface HostEditModalProps {
  data: HostEditData;
  onChange: (data: HostEditData) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export default function HostEditModal({ data, onChange, onClose, onConfirm }: HostEditModalProps) {
  return (
    <Modal
      header='해당 정보로 수정하겠습니까?'
      confirmText='수정하기'
      closeText='아니요'
      theme='purple'
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <div className='flex flex-col gap-4'>
        <div>
          <label className='text-sm text-[#939396] mb-2 block'>주최자</label>
          <Input
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            placeholder='이름'
          />
        </div>
        <div>
          <label className='text-sm text-[#939396] mb-2 block'>소속</label>
          <Input
            value={data.groupName}
            onChange={(e) => onChange({ ...data, groupName: e.target.value })}
            placeholder='소속'
          />
        </div>
        <div>
          <label className='text-sm text-[#939396] mb-2 block'>전화번호</label>
          <Input
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            placeholder='전화번호'
          />
        </div>
        <div>
          <label className='text-sm text-[#939396] mb-2 block'>이메일</label>
          <Input
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            placeholder='이메일'
          />
        </div>
      </div>
    </Modal>
  );
}
