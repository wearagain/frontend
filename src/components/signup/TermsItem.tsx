import { Checkbox } from "@/components/ui/checkbox";

interface TermsItemProps {
  label: string;
  required?: boolean;
  checked: boolean;
  onToggle: () => void;
  showLink?: boolean;
}

export default function TermsItem({
  label,
  required = false,
  checked,
  onToggle,
  showLink = false,
}: TermsItemProps) {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-2 cursor-pointer' onClick={onToggle}>
        <Checkbox checked={checked} />
        <span className='text-sm'>
          {label} {required && <span className='text-gray-500'>(필수)</span>}
        </span>
      </div>

      {showLink && (
        <button
          type='button'
          className='text-xs text-gray-400 underline whitespace-nowrap'
          onClick={(e) => {
            e.stopPropagation();
            console.log(`${label} 약관 보기 클릭됨`);
          }}
        >
          약관 보기
        </button>
      )}
    </div>
  );
}
